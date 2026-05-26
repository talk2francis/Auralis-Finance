// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title AuralisPolicyGuard
/// @author Auralis Finance
/// @notice Per-user, on-chain portfolio guardrails for AI-proposed RWA rebalances.
/// @dev    SAFETY MODEL: the AI only ever *proposes* a rebalance. This contract
///         deterministically *enforces* the user's guardrails and REVERTS on any
///         breach. There is NO autonomous execution path — `executeRebalance` is
///         reachable only via a user-signed transaction from the policy owner.
///         The contract holds no funds and no keys. This is the structural answer
///         to "the agent must never be able to run away with capital."
contract AuralisPolicyGuard is Ownable {
    // ----------------------------------------------------------------------
    // Types
    // ----------------------------------------------------------------------

    struct Policy {
        uint16 maxPerAssetBps; // e.g. 2500 == 25%
        uint16 maxPerProtocolBps; // e.g. 3000 == 30%
        uint16 maxSlippageBps; // e.g. 50 == 0.50%
        uint8 minConfidence; // 0..100 minimum AI confidence
        uint16 minLiquidityScore; // 0..100 minimum liquidity score
        uint32 cooldownSeconds; // minimum time between rebalances
        uint256 humanApprovalThreshold; // notional above which off-chain sign-off is expected
        bool exists;
        bool paused;
    }

    struct RebalanceParams {
        bytes32 portfolioHash; // hash of the proposed target allocation
        uint16 topAssetBps; // largest single-asset weight in the proposal
        uint16 topProtocolBps; // largest single-protocol weight in the proposal
        uint16 slippageBps; // estimated slippage of the proposed route
        uint8 aiConfidence; // AI confidence in the proposal (0..100)
        uint16 liquidityScore; // blended liquidity score of the proposal (0..100)
        uint256 notionalValue; // total value affected by the rebalance
        bool humanApproved; // true when the user has reviewed threshold-gated proposal details
        string metadataURI; // ipfs:// URI of the full proposal
    }

    // ----------------------------------------------------------------------
    // Storage
    // ----------------------------------------------------------------------

    mapping(address => Policy) public policyOf;
    mapping(address => uint64) public lastRebalanceAt;
    uint256 public nextRebalanceId = 1;

    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event PolicyUpdated(address indexed user);
    event PolicyPausedSet(address indexed user, bool paused);
    event RebalanceExecuted(
        uint256 indexed id,
        address indexed user,
        bytes32 portfolioHash,
        uint256 notionalValue,
        string metadataURI
    );
    event RebalanceBlocked(address indexed user, string reason);

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    constructor(address initialOwner) Ownable(initialOwner) {}

    // ----------------------------------------------------------------------
    // Policy management — each user owns and signs for their own policy
    // ----------------------------------------------------------------------

    function setPolicy(
        uint16 maxPerAssetBps,
        uint16 maxPerProtocolBps,
        uint16 maxSlippageBps,
        uint8 minConfidence,
        uint16 minLiquidityScore,
        uint32 cooldownSeconds,
        uint256 humanApprovalThreshold
    ) external {
        require(
            maxPerAssetBps <= 10000 && maxPerProtocolBps <= 10000,
            "AURALIS: bad bps"
        );
        require(maxSlippageBps <= 1000, "AURALIS: slippage too high");
        require(
            minConfidence <= 100 && minLiquidityScore <= 100,
            "AURALIS: bad range"
        );

        policyOf[msg.sender] = Policy({
            maxPerAssetBps: maxPerAssetBps,
            maxPerProtocolBps: maxPerProtocolBps,
            maxSlippageBps: maxSlippageBps,
            minConfidence: minConfidence,
            minLiquidityScore: minLiquidityScore,
            cooldownSeconds: cooldownSeconds,
            humanApprovalThreshold: humanApprovalThreshold,
            exists: true,
            paused: false
        });
        emit PolicyUpdated(msg.sender);
    }

    /// @notice Emergency pause — blocks all rebalances under the caller's policy.
    function setPaused(bool paused) external {
        require(policyOf[msg.sender].exists, "AURALIS: no policy");
        policyOf[msg.sender].paused = paused;
        emit PolicyPausedSet(msg.sender, paused);
    }

    // ----------------------------------------------------------------------
    // Checks & execution
    // ----------------------------------------------------------------------

    /// @notice Pure view check — powers the live policy-preview UI before signing.
    /// @return ok true if the proposal passes every guardrail
    /// @return reason human-readable failure reason ("ok" when passing)
    function checkRebalance(
        address user,
        RebalanceParams calldata p
    ) public view returns (bool ok, string memory reason) {
        Policy memory pol = policyOf[user];
        if (!pol.exists) return (false, "no policy set");
        if (pol.paused) return (false, "policy paused");
        if (p.portfolioHash == bytes32(0)) return (false, "empty portfolio hash");
        if (p.topAssetBps > 10000 || p.topProtocolBps > 10000)
            return (false, "bad proposal bps");
        if (p.aiConfidence > 100 || p.liquidityScore > 100)
            return (false, "bad proposal range");
        if (p.topAssetBps > pol.maxPerAssetBps)
            return (false, "max per-asset exceeded");
        if (p.topProtocolBps > pol.maxPerProtocolBps)
            return (false, "max per-protocol exceeded");
        if (p.slippageBps > pol.maxSlippageBps)
            return (false, "slippage limit exceeded");
        if (p.aiConfidence < pol.minConfidence)
            return (false, "AI confidence too low");
        if (p.liquidityScore < pol.minLiquidityScore)
            return (false, "liquidity too low");
        if (
            pol.humanApprovalThreshold > 0 &&
            p.notionalValue > pol.humanApprovalThreshold &&
            !p.humanApproved
        ) return (false, "human approval required");
        if (block.timestamp < lastRebalanceAt[user] + pol.cooldownSeconds)
            return (false, "rebalance cooldown active");
        return (true, "ok");
    }

    /// @notice Execute a guardrail-checked rebalance. USER-SIGNED ONLY.
    /// @dev    Reverts if any guardrail is breached. Use `tryExecuteRebalance`
    ///         for a non-reverting path that persists a RebalanceBlocked event.
    ///         On success, records the rebalance on-chain as proof.
    ///         Fund routing to whitelisted Mantle venues (Aave, Merchant Moe) is a
    ///         deliberate post-hackathon, audited extension — the hackathon build
    ///         proves the *decision and its guardrail compliance* on-chain.
    function executeRebalance(
        RebalanceParams calldata p
    ) external returns (uint256 rebalanceId) {
        (bool ok, string memory reason) = checkRebalance(msg.sender, p);
        if (!ok) {
            revert(string.concat("AURALIS: ", reason));
        }

        rebalanceId = _recordRebalance(msg.sender, p);
    }

    /// @notice Non-reverting execution path for UIs/indexers that need persisted
    ///         block events when a proposal fails deterministic guardrails.
    function tryExecuteRebalance(
        RebalanceParams calldata p
    ) external returns (bool ok, uint256 rebalanceId, string memory reason) {
        (ok, reason) = checkRebalance(msg.sender, p);
        if (!ok) {
            emit RebalanceBlocked(msg.sender, reason);
            return (false, 0, reason);
        }

        rebalanceId = _recordRebalance(msg.sender, p);
        return (true, rebalanceId, "ok");
    }

    function _recordRebalance(
        address user,
        RebalanceParams calldata p
    ) internal returns (uint256 rebalanceId) {
        lastRebalanceAt[user] = uint64(block.timestamp);
        rebalanceId = nextRebalanceId++;

        emit RebalanceExecuted(
            rebalanceId,
            user,
            p.portfolioHash,
            p.notionalValue,
            p.metadataURI
        );
    }
}
