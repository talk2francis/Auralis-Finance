// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/// @title AuralisRatingRegistry
/// @author Auralis Finance
/// @notice Public, permissionless-read registry of Auralis Ratings for tokenized
///         real-world assets on Mantle, plus an on-chain log of AI-produced decisions.
/// @dev    Stores ONLY content-addressed hashes + public metadata URIs. Full rating
///         reports and decision payloads live off-chain (IPFS) and are reproducible
///         from the published Auralis methodology, so any rating can be independently
///         verified. This contract never custodies funds.
contract AuralisRatingRegistry is Ownable, Pausable {
    // ----------------------------------------------------------------------
    // Types
    // ----------------------------------------------------------------------

    /// @notice Auralis letter grade. NR = Not Rated (invalid for anchoring).
    enum Grade {
        NR,
        AAA,
        AA,
        A,
        BBB,
        BB,
        B,
        C
    }

    struct Rating {
        bytes32 assetId; // keccak256 of the canonical asset identifier
        bytes32 ratingHash; // keccak256 of the canonical off-chain rating JSON
        Grade grade;
        uint8 riskScore; // 0..100 (lower is safer)
        uint16 methodologyVersion; // e.g. 100 == methodology v1.00
        string metadataURI; // ipfs:// URI of the full rating report
        address submitter;
        bool official; // true when submitter is an approved publisher
        uint64 timestamp;
    }

    struct Decision {
        bytes32 decisionHash; // keccak256 of the canonical off-chain decision JSON
        address agent; // wallet that owns/triggered the decision
        bytes32 actionType; // e.g. keccak256("rebalance")
        uint8 riskScore; // AI risk score attached to the decision
        string metadataURI; // ipfs:// URI of the full decision record
        uint64 timestamp;
    }

    // ----------------------------------------------------------------------
    // Storage
    // ----------------------------------------------------------------------

    uint256 public nextDecisionId = 1;

    mapping(bytes32 => Rating) public latestRating; // assetId => latest rating
    mapping(bytes32 => Rating) public latestOfficialRating; // assetId => latest official rating
    mapping(bytes32 => Rating[]) private _ratingHistory; // assetId => history
    mapping(uint256 => Decision) public decisions; // decisionId => decision
    mapping(bytes32 => bool) public ratingHashUsed; // dedupe
    mapping(bytes32 => bool) public decisionHashUsed; // dedupe
    mapping(address => bool) public approvedPublishers; // flagged as "official"

    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event RatingAnchored(
        bytes32 indexed assetId,
        bytes32 indexed ratingHash,
        Grade grade,
        uint8 riskScore,
        address indexed submitter,
        bool official,
        string metadataURI
    );
    event DecisionLogged(
        uint256 indexed decisionId,
        bytes32 indexed decisionHash,
        address indexed agent,
        bytes32 actionType,
        uint8 riskScore
    );
    event PublisherUpdated(address indexed publisher, bool approved);

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    constructor(address initialOwner) Ownable(initialOwner) {}

    // ----------------------------------------------------------------------
    // Admin
    // ----------------------------------------------------------------------

    function setPublisher(address publisher, bool approved) external onlyOwner {
        approvedPublishers[publisher] = approved;
        emit PublisherUpdated(publisher, approved);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // ----------------------------------------------------------------------
    // Core: ratings
    // ----------------------------------------------------------------------

    /// @notice Anchor a content-addressed Auralis Rating on Mantle.
    /// @dev    Permissionless: anyone may anchor a public rating. Ratings anchored
    ///         by an approved publisher are flagged `official`. The rating data is
    ///         public and reproducible, so trust derives from the methodology + hash,
    ///         not from the submitter.
    function anchorRating(
        bytes32 assetId,
        bytes32 ratingHash,
        Grade grade,
        uint8 riskScore,
        uint16 methodologyVersion,
        string calldata metadataURI
    ) external whenNotPaused returns (bool official) {
        require(assetId != bytes32(0), "AURALIS: empty asset");
        require(ratingHash != bytes32(0), "AURALIS: empty hash");
        require(!ratingHashUsed[ratingHash], "AURALIS: duplicate rating");
        require(riskScore <= 100, "AURALIS: bad score");
        require(grade != Grade.NR, "AURALIS: bad grade");

        official = approvedPublishers[msg.sender];

        Rating memory r = Rating({
            assetId: assetId,
            ratingHash: ratingHash,
            grade: grade,
            riskScore: riskScore,
            methodologyVersion: methodologyVersion,
            metadataURI: metadataURI,
            submitter: msg.sender,
            official: official,
            timestamp: uint64(block.timestamp)
        });

        ratingHashUsed[ratingHash] = true;
        if (official) {
            latestRating[assetId] = r;
            latestOfficialRating[assetId] = r;
        } else if (latestOfficialRating[assetId].ratingHash == bytes32(0)) {
            latestRating[assetId] = r;
        }
        _ratingHistory[assetId].push(r);

        emit RatingAnchored(
            assetId,
            ratingHash,
            grade,
            riskScore,
            msg.sender,
            official,
            metadataURI
        );
    }

    // ----------------------------------------------------------------------
    // Core: decisions (AI-produced result written on-chain)
    // ----------------------------------------------------------------------

    /// @notice Log an AI-produced decision on-chain. User-signed.
    /// @dev    This is the "AI-powered function callable on-chain" required by the
    ///         Mantle deployment award: the AI's decision + risk score are committed
    ///         to Mantle as permanent, verifiable proof.
    function logDecision(
        bytes32 decisionHash,
        bytes32 actionType,
        uint8 riskScore,
        string calldata metadataURI
    ) external whenNotPaused returns (uint256 decisionId) {
        require(decisionHash != bytes32(0), "AURALIS: empty hash");
        require(!decisionHashUsed[decisionHash], "AURALIS: duplicate decision");
        require(riskScore <= 100, "AURALIS: bad score");

        decisionId = nextDecisionId++;
        decisionHashUsed[decisionHash] = true;
        decisions[decisionId] = Decision({
            decisionHash: decisionHash,
            agent: msg.sender,
            actionType: actionType,
            riskScore: riskScore,
            metadataURI: metadataURI,
            timestamp: uint64(block.timestamp)
        });

        emit DecisionLogged(
            decisionId,
            decisionHash,
            msg.sender,
            actionType,
            riskScore
        );
    }

    // ----------------------------------------------------------------------
    // Views
    // ----------------------------------------------------------------------

    function ratingHistoryLength(
        bytes32 assetId
    ) external view returns (uint256) {
        return _ratingHistory[assetId].length;
    }

    function ratingAt(
        bytes32 assetId,
        uint256 index
    ) external view returns (Rating memory) {
        return _ratingHistory[assetId][index];
    }

    /// @notice Verify that a given hash matches the latest on-chain rating for an asset.
    function verifyRating(
        bytes32 assetId,
        bytes32 ratingHash
    ) external view returns (bool) {
        return latestRating[assetId].ratingHash == ratingHash;
    }
}
