// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/// @title AuralisComplianceAttestor
/// @author Auralis Finance
/// @notice Issues privacy-preserving, reusable compliance / eligibility attestations
///         for tokenized real-world assets on Mantle.
/// @dev    Only the verdict + content-addressed check hash are written on-chain.
///         The compliance check INPUTS (jurisdiction declaration, screening data)
///         stay private off-chain. The attestation is consumable by any Mantle app
///         via `isEligible()` — e.g. an RWA issuer can gate a purchase on it.
///
///         This is compliance TOOLING, not legal advice. Verdicts are informational.
contract AuralisComplianceAttestor is Ownable, Pausable {
    // ----------------------------------------------------------------------
    // Types
    // ----------------------------------------------------------------------

    enum Verdict {
        None,
        Eligible,
        Restricted,
        Denied
    }

    struct Attestation {
        address subject; // wallet the attestation is about
        address attester; // who minted it (subject self-attest, or approved attester)
        bytes32 assetClassId; // e.g. keccak256("US_TREASURY_RWA")
        Verdict verdict;
        bytes32 checkHash; // keccak256 of the canonical off-chain compliance check
        bytes32 jurisdictionTag; // e.g. keccak256("NG")
        string metadataURI; // ipfs:// URI of the full compliance report
        uint64 issuedAt;
        uint64 validUntil;
        bool revoked;
    }

    // ----------------------------------------------------------------------
    // Storage
    // ----------------------------------------------------------------------

    uint256 public nextAttestationId = 1;
    uint256 public mintFee; // optional, in wei (MNT)

    mapping(uint256 => Attestation) public attestations;
    mapping(address => mapping(bytes32 => uint256)) public latestAttestationOf; // subject => assetClass => id
    mapping(address => bool) public approvedAttesters;
    mapping(bytes32 => bool) public checkHashUsed;

    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event AttestationMinted(
        uint256 indexed id,
        address indexed subject,
        bytes32 indexed assetClassId,
        Verdict verdict,
        address attester,
        uint64 validUntil,
        string metadataURI
    );
    event AttestationRevoked(uint256 indexed id, address indexed by);
    event AttesterUpdated(address indexed attester, bool approved);
    event MintFeeUpdated(uint256 fee);

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    constructor(address initialOwner) Ownable(initialOwner) {}

    // ----------------------------------------------------------------------
    // Admin
    // ----------------------------------------------------------------------

    function setAttester(address attester, bool approved) external onlyOwner {
        approvedAttesters[attester] = approved;
        emit AttesterUpdated(attester, approved);
    }

    function setMintFee(uint256 fee) external onlyOwner {
        mintFee = fee;
        emit MintFeeUpdated(fee);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdraw(address to) external onlyOwner {
        require(to != address(0), "AURALIS: zero to");
        (bool ok, ) = to.call{value: address(this).balance}("");
        require(ok, "AURALIS: withdraw failed");
    }

    // ----------------------------------------------------------------------
    // Core
    // ----------------------------------------------------------------------

    /// @notice Mint a compliance attestation. The subject may self-attest, or an
    ///         approved attester (the Auralis issuer service) may attest for them.
    /// @dev    Validity is bounded to [1 hour, 365 days]. Optional mint fee is the
    ///         only value this contract ever handles.
    function mintAttestation(
        address subject,
        bytes32 assetClassId,
        Verdict verdict,
        bytes32 checkHash,
        bytes32 jurisdictionTag,
        string calldata metadataURI,
        uint64 validitySeconds
    ) external payable whenNotPaused returns (uint256 id) {
        require(subject != address(0), "AURALIS: zero subject");
        require(assetClassId != bytes32(0), "AURALIS: empty class");
        require(verdict != Verdict.None, "AURALIS: bad verdict");
        require(checkHash != bytes32(0), "AURALIS: empty check");
        require(
            msg.sender == subject || approvedAttesters[msg.sender],
            "AURALIS: not authorized"
        );
        require(msg.value >= mintFee, "AURALIS: fee too low");
        require(
            validitySeconds >= 1 hours && validitySeconds <= 365 days,
            "AURALIS: bad validity"
        );

        id = nextAttestationId++;
        uint64 validUntil = uint64(block.timestamp) + validitySeconds;

        attestations[id] = Attestation({
            subject: subject,
            attester: msg.sender,
            assetClassId: assetClassId,
            verdict: verdict,
            checkHash: checkHash,
            jurisdictionTag: jurisdictionTag,
            metadataURI: metadataURI,
            issuedAt: uint64(block.timestamp),
            validUntil: validUntil,
            revoked: false
        });
        latestAttestationOf[subject][assetClassId] = id;
        checkHashUsed[checkHash] = true;

        emit AttestationMinted(
            id,
            subject,
            assetClassId,
            verdict,
            msg.sender,
            validUntil,
            metadataURI
        );
    }

    /// @notice Revoke an attestation. Callable by subject, attester, or owner.
    function revoke(uint256 id) external {
        Attestation storage a = attestations[id];
        require(a.subject != address(0), "AURALIS: not found");
        require(
            msg.sender == a.subject ||
                msg.sender == a.attester ||
                msg.sender == owner(),
            "AURALIS: not authorized"
        );
        require(!a.revoked, "AURALIS: already revoked");
        a.revoked = true;
        emit AttestationRevoked(id, msg.sender);
    }

    // ----------------------------------------------------------------------
    // Views — consumable by any Mantle app
    // ----------------------------------------------------------------------

    /// @notice Cheap boolean eligibility read for integrators.
    function isEligible(
        address wallet,
        bytes32 assetClassId
    ) external view returns (bool) {
        uint256 id = latestAttestationOf[wallet][assetClassId];
        if (id == 0) return false;
        Attestation memory a = attestations[id];
        return
            a.verdict == Verdict.Eligible &&
            !a.revoked &&
            a.validUntil > block.timestamp;
    }

    /// @notice Full verdict read with an active flag.
    function getVerdict(
        address wallet,
        bytes32 assetClassId
    ) external view returns (Verdict verdict, bool active) {
        uint256 id = latestAttestationOf[wallet][assetClassId];
        if (id == 0) return (Verdict.None, false);
        Attestation memory a = attestations[id];
        active = !a.revoked && a.validUntil > block.timestamp;
        verdict = a.verdict;
    }
}
