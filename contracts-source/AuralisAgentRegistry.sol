// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title AuralisAgentRegistry
/// @author Auralis Finance
/// @notice Soulbound (non-transferable) identity for Auralis AI agents/operators.
/// @dev    Designed to interoperate with Mantle's ERC-8004 agent-identity standard:
///         `erc8004Ref` cross-references the Mantle-issued agent id when available.
///         If ERC-8004 is unavailable at deploy time, this registry stands alone as
///         the canonical Auralis agent identity. Agent REPUTATION (ratings anchored,
///         attestations minted, decisions logged) is derived off-chain by indexing
///         AuralisRatingRegistry / AuralisComplianceAttestor events — keeping this
///         contract decoupled and free of fragile cross-contract calls.
contract AuralisAgentRegistry is ERC721, Ownable {
    // ----------------------------------------------------------------------
    // Types
    // ----------------------------------------------------------------------

    struct AgentProfile {
        string name;
        string metadataURI; // ipfs:// agent card (capabilities, skills, version)
        uint64 registeredAt;
        bool active;
        uint256 erc8004Ref; // Mantle ERC-8004 id cross-ref (0 if none)
    }

    // ----------------------------------------------------------------------
    // Storage
    // ----------------------------------------------------------------------

    uint256 public nextTokenId = 1;
    mapping(uint256 => AgentProfile) public agents;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => bool) public approvedMinters;

    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event AgentRegistered(
        uint256 indexed tokenId,
        address indexed operator,
        string name,
        uint256 erc8004Ref
    );
    event AgentMetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event AgentActiveSet(uint256 indexed tokenId, bool active);
    event MinterUpdated(address indexed minter, bool approved);

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    constructor(
        address initialOwner
    ) ERC721("Auralis Agent Identity", "AURA-AGENT") Ownable(initialOwner) {}

    // ----------------------------------------------------------------------
    // Modifiers
    // ----------------------------------------------------------------------

    modifier onlyMinter() {
        require(
            msg.sender == owner() || approvedMinters[msg.sender],
            "AURALIS: not minter"
        );
        _;
    }

    // ----------------------------------------------------------------------
    // Admin
    // ----------------------------------------------------------------------

    function setMinter(address minter, bool approved) external onlyOwner {
        approvedMinters[minter] = approved;
        emit MinterUpdated(minter, approved);
    }

    // ----------------------------------------------------------------------
    // Core
    // ----------------------------------------------------------------------

    /// @notice Register (mint) a soulbound agent identity to an operator wallet.
    function registerAgent(
        address operator,
        string calldata name,
        string calldata metadataURI,
        uint256 erc8004Ref
    ) external onlyMinter returns (uint256 tokenId) {
        require(operator != address(0), "AURALIS: zero operator");
        require(bytes(name).length != 0, "AURALIS: empty name");

        tokenId = nextTokenId++;
        _safeMint(operator, tokenId);
        _tokenURIs[tokenId] = metadataURI;
        agents[tokenId] = AgentProfile({
            name: name,
            metadataURI: metadataURI,
            registeredAt: uint64(block.timestamp),
            active: true,
            erc8004Ref: erc8004Ref
        });

        emit AgentRegistered(tokenId, operator, name, erc8004Ref);
    }

    function updateMetadata(
        uint256 tokenId,
        string calldata metadataURI
    ) external {
        require(
            ownerOf(tokenId) == msg.sender || msg.sender == owner(),
            "AURALIS: not authorized"
        );
        agents[tokenId].metadataURI = metadataURI;
        _tokenURIs[tokenId] = metadataURI;
        emit AgentMetadataUpdated(tokenId, metadataURI);
    }

    function setActive(uint256 tokenId, bool active) external {
        require(
            ownerOf(tokenId) == msg.sender || msg.sender == owner(),
            "AURALIS: not authorized"
        );
        agents[tokenId].active = active;
        emit AgentActiveSet(tokenId, active);
    }

    // ----------------------------------------------------------------------
    // Views
    // ----------------------------------------------------------------------

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _tokenURIs[tokenId];
    }

    // ----------------------------------------------------------------------
    // Soulbound enforcement
    // ----------------------------------------------------------------------

    /// @dev Allow mint (from == 0) and burn (to == 0); block all transfers.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address from) {
        from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("AURALIS: soulbound");
        }
        return super._update(to, tokenId, auth);
    }
}
