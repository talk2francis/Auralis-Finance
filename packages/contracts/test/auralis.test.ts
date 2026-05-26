import { expect } from "chai";
import { ethers, network } from "hardhat";

const id = (s: string) => ethers.keccak256(ethers.toUtf8Bytes(s));
const ZERO = ethers.ZeroHash;
const DAY = 24 * 60 * 60;

async function deployRating() {
  const [owner, publisher, user] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("AuralisRatingRegistry");
  return { owner, publisher, user, reg: await Factory.deploy(owner.address) };
}

async function deployAttestor() {
  const [owner, subject, attester, stranger, receiver] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("AuralisComplianceAttestor");
  return { owner, subject, attester, stranger, receiver, att: await Factory.deploy(owner.address) };
}

async function deployAgent() {
  const [owner, minter, operator, stranger] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("AuralisAgentRegistry");
  return { owner, minter, operator, stranger, agent: await Factory.deploy(owner.address) };
}

async function deployGuard() {
  const [owner, user, other] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("AuralisPolicyGuard");
  return { owner, user, other, guard: await Factory.deploy(owner.address) };
}

function goodParams(overrides: Record<string, unknown> = {}) {
  return {
    portfolioHash: id("portfolio:1"),
    topAssetBps: 2200,
    topProtocolBps: 2800,
    slippageBps: 30,
    aiConfidence: 82,
    liquidityScore: 78,
    notionalValue: ethers.parseEther("100"),
    humanApproved: false,
    metadataURI: "ipfs://proposal",
    ...overrides,
  };
}

describe("AuralisRatingRegistry", () => {
  it("regression: permissionless ratings cannot overwrite latest official rating", async () => {
    const { owner, publisher, user, reg } = await deployRating();
    const asset = id("USDY:official-lock");
    const officialHash = id("official:locked");
    const permissionlessHash = id("permissionless:attempted-overwrite");

    await reg.connect(owner).setPublisher(publisher.address, true);
    await reg.connect(publisher).anchorRating(asset, officialHash, 3, 28, 100, "ipfs://official");
    await reg.connect(user).anchorRating(asset, permissionlessHash, 7, 90, 100, "ipfs://permissionless");

    expect((await reg.latestRating(asset)).ratingHash).to.equal(officialHash);
    expect((await reg.latestOfficialRating(asset)).ratingHash).to.equal(officialHash);
    expect(await reg.verifyRating(asset, permissionlessHash)).to.equal(false);
    expect(await reg.verifyRating(asset, officialHash)).to.equal(true);
  });

  it("anchors unofficial and official ratings without letting unofficial overwrite latest official", async () => {
    const { owner, publisher, user, reg } = await deployRating();
    const asset = id("USDY");
    const officialHash = id("rating:official");
    const unofficialHash = id("rating:unofficial");

    await reg.connect(owner).setPublisher(publisher.address, true);
    await expect(reg.connect(publisher).anchorRating(asset, officialHash, 3, 28, 100, "ipfs://official"))
      .to.emit(reg, "RatingAnchored")
      .withArgs(asset, officialHash, 3, 28, publisher.address, true, "ipfs://official");
    await reg.connect(user).anchorRating(asset, unofficialHash, 4, 40, 100, "ipfs://user");

    expect((await reg.latestRating(asset)).ratingHash).to.equal(officialHash);
    expect((await reg.latestOfficialRating(asset)).ratingHash).to.equal(officialHash);
    expect(await reg.ratingHistoryLength(asset)).to.equal(2);
    expect((await reg.ratingAt(asset, 0)).official).to.equal(true);
    expect(await reg.verifyRating(asset, unofficialHash)).to.equal(false);
    expect(await reg.verifyRating(asset, officialHash)).to.equal(true);
  });

  it("rejects invalid ratings, duplicate ratings, bad decisions, and respects pause/access control", async () => {
    const { owner, user, reg } = await deployRating();
    await expect(reg.connect(user).setPublisher(user.address, true)).to.be.revertedWithCustomError(reg, "OwnableUnauthorizedAccount");
    await expect(reg.anchorRating(ZERO, id("h1"), 1, 1, 100, "ipfs://x")).to.be.revertedWith("AURALIS: empty asset");
    await expect(reg.anchorRating(id("asset"), ZERO, 1, 1, 100, "ipfs://x")).to.be.revertedWith("AURALIS: empty hash");
    await expect(reg.anchorRating(id("asset"), id("h2"), 0, 1, 100, "ipfs://x")).to.be.revertedWith("AURALIS: bad grade");
    await expect(reg.anchorRating(id("asset"), id("h3"), 1, 101, 100, "ipfs://x")).to.be.revertedWith("AURALIS: bad score");
    await reg.anchorRating(id("asset"), id("h4"), 1, 10, 100, "ipfs://x");
    await expect(reg.anchorRating(id("asset"), id("h4"), 1, 10, 100, "ipfs://x")).to.be.revertedWith("AURALIS: duplicate rating");

    await expect(reg.logDecision(ZERO, id("rebalance"), 1, "ipfs://d")).to.be.revertedWith("AURALIS: empty hash");
    await expect(reg.logDecision(id("d1"), id("rebalance"), 101, "ipfs://d")).to.be.revertedWith("AURALIS: bad score");
    await expect(reg.connect(user).logDecision(id("d2"), id("rebalance"), 41, "ipfs://d"))
      .to.emit(reg, "DecisionLogged")
      .withArgs(1, id("d2"), user.address, id("rebalance"), 41);
    expect((await reg.decisions(1)).agent).to.equal(user.address);
    await expect(reg.logDecision(id("d2"), id("rebalance"), 41, "ipfs://d")).to.be.revertedWith("AURALIS: duplicate decision");

    await reg.pause();
    await expect(reg.anchorRating(id("paused"), id("pausedh"), 1, 1, 100, "ipfs://x")).to.be.revertedWithCustomError(reg, "EnforcedPause");
    await expect(reg.logDecision(id("pausedd"), id("rebalance"), 1, "ipfs://d")).to.be.revertedWithCustomError(reg, "EnforcedPause");
    await reg.unpause();
  });
});

describe("AuralisComplianceAttestor", () => {
  it("regression: duplicate compliance check hashes are rejected", async () => {
    const { subject, att } = await deployAttestor();
    const assetClass = id("US_TREASURY_RWA:duplicate-check");
    const checkHash = id("compliance:duplicate-check");

    await att.connect(subject).mintAttestation(subject.address, assetClass, 1, checkHash, id("NG"), "ipfs://check", DAY);
    await expect(
      att.connect(subject).mintAttestation(subject.address, assetClass, 1, checkHash, id("NG"), "ipfs://check-duplicate", DAY)
    ).to.be.revertedWith("AURALIS: duplicate check");
  });

  it("mints self and approved attestations, enforces fees, duplicate checks, expiry, revoke, and withdraw", async () => {
    const { owner, subject, attester, receiver, att } = await deployAttestor();
    const assetClass = id("US_TREASURY_RWA");

    await att.setMintFee(10n);
    await expect(att.connect(subject).mintAttestation(subject.address, assetClass, 1, id("check:fee"), id("NG"), "ipfs://c", DAY, { value: 9n })).to.be.revertedWith("AURALIS: fee too low");
    await expect(att.connect(subject).mintAttestation(subject.address, assetClass, 1, id("check:1"), id("NG"), "ipfs://c", DAY, { value: 10n }))
      .to.emit(att, "AttestationMinted");
    expect(await att.isEligible(subject.address, assetClass)).to.equal(true);
    expect((await att.getVerdict(subject.address, assetClass))[0]).to.equal(1);
    await expect(att.connect(subject).mintAttestation(subject.address, assetClass, 1, id("check:1"), id("NG"), "ipfs://c", DAY, { value: 10n })).to.be.revertedWith("AURALIS: duplicate check");

    await att.setAttester(attester.address, true);
    await att.connect(attester).mintAttestation(subject.address, id("LST"), 2, id("check:2"), id("NG"), "ipfs://r", DAY, { value: 10n });
    expect((await att.getVerdict(subject.address, id("LST")))[0]).to.equal(2);
    expect(await att.isEligible(subject.address, id("LST"))).to.equal(false);

    await expect(att.connect(subject).revoke(1)).to.emit(att, "AttestationRevoked");
    expect(await att.isEligible(subject.address, assetClass)).to.equal(false);
    await expect(att.connect(subject).revoke(1)).to.be.revertedWith("AURALIS: already revoked");
    await expect(att.withdraw(ethers.ZeroAddress)).to.be.revertedWith("AURALIS: zero to");
    await expect(att.withdraw(receiver.address)).to.changeEtherBalance(receiver, 20n);
  });

  it("rejects invalid/unauthorized attestations, pause, missing records, and expired records", async () => {
    const { owner, subject, stranger, att } = await deployAttestor();
    const assetClass = id("US_TREASURY_RWA");
    await expect(att.connect(stranger).setAttester(stranger.address, true)).to.be.revertedWithCustomError(att, "OwnableUnauthorizedAccount");
    await expect(att.connect(stranger).mintAttestation(subject.address, assetClass, 1, id("check:x"), id("NG"), "ipfs://c", DAY)).to.be.revertedWith("AURALIS: not authorized");
    await expect(att.mintAttestation(ethers.ZeroAddress, assetClass, 1, id("c0"), id("NG"), "ipfs://c", DAY)).to.be.revertedWith("AURALIS: zero subject");
    await expect(att.mintAttestation(owner.address, ZERO, 1, id("c1"), id("NG"), "ipfs://c", DAY)).to.be.revertedWith("AURALIS: empty class");
    await expect(att.mintAttestation(owner.address, assetClass, 0, id("c2"), id("NG"), "ipfs://c", DAY)).to.be.revertedWith("AURALIS: bad verdict");
    await expect(att.mintAttestation(owner.address, assetClass, 1, ZERO, id("NG"), "ipfs://c", DAY)).to.be.revertedWith("AURALIS: empty check");
    await expect(att.mintAttestation(owner.address, assetClass, 1, id("c3"), id("NG"), "ipfs://c", 3599)).to.be.revertedWith("AURALIS: bad validity");
    await expect(att.mintAttestation(owner.address, assetClass, 1, id("c4"), id("NG"), "ipfs://c", 366 * DAY)).to.be.revertedWith("AURALIS: bad validity");
    await att.pause();
    await expect(att.mintAttestation(owner.address, assetClass, 1, id("c5"), id("NG"), "ipfs://c", DAY)).to.be.revertedWithCustomError(att, "EnforcedPause");
    await att.unpause();

    await att.connect(subject).mintAttestation(subject.address, assetClass, 1, id("expires"), id("NG"), "ipfs://c", 3600);
    await network.provider.send("evm_increaseTime", [3601]);
    await network.provider.send("evm_mine");
    expect(await att.isEligible(subject.address, assetClass)).to.equal(false);
    expect(await att.getVerdict(stranger.address, assetClass)).to.deep.equal([0n, false]);
    await expect(att.connect(stranger).revoke(1)).to.be.revertedWith("AURALIS: not authorized");
    await expect(att.revoke(999)).to.be.revertedWith("AURALIS: not found");
  });
});

describe("AuralisAgentRegistry", () => {
  it("registers soulbound agents, updates metadata/status, and enforces minters/owners", async () => {
    const { owner, minter, operator, stranger, agent } = await deployAgent();
    await expect(agent.connect(stranger).registerAgent(operator.address, "Agent", "ipfs://a", 0)).to.be.revertedWith("AURALIS: not minter");
    await expect(agent.registerAgent(ethers.ZeroAddress, "Agent", "ipfs://a", 0)).to.be.revertedWith("AURALIS: zero operator");
    await expect(agent.registerAgent(operator.address, "", "ipfs://a", 0)).to.be.revertedWith("AURALIS: empty name");
    await agent.setMinter(minter.address, true);
    await expect(agent.connect(minter).registerAgent(operator.address, "Agent", "ipfs://a", 42))
      .to.emit(agent, "AgentRegistered")
      .withArgs(1, operator.address, "Agent", 42);
    expect(await agent.ownerOf(1)).to.equal(operator.address);
    expect(await agent.tokenURI(1)).to.equal("ipfs://a");
    await expect(agent.connect(stranger).updateMetadata(1, "ipfs://bad")).to.be.revertedWith("AURALIS: not authorized");
    await agent.connect(operator).updateMetadata(1, "ipfs://b");
    await agent.setActive(1, false);
    expect((await agent.agents(1)).active).to.equal(false);
    await expect(agent.connect(operator).transferFrom(operator.address, stranger.address, 1)).to.be.revertedWith("AURALIS: soulbound");
    await expect(agent.connect(stranger).setMinter(stranger.address, true)).to.be.revertedWithCustomError(agent, "OwnableUnauthorizedAccount");
  });
});

describe("AuralisPolicyGuard", () => {
  async function withPolicy(overrides: Record<string, unknown> = {}) {
    const ctx = await deployGuard();
    await ctx.guard.connect(ctx.user).setPolicy(2500, 3000, 50, 70, 60, 3600, ethers.parseEther("1000"));
    return { ...ctx, params: goodParams(overrides) };
  }

  it("sets policies, executes passing rebalances, and has a non-reverting blocked path", async () => {
    const { user, guard, params } = await withPolicy();
    await expect(guard.connect(user).executeRebalance(params)).to.emit(guard, "RebalanceExecuted");
    expect(await guard.nextRebalanceId()).to.equal(2);
    const blocked = goodParams({ topAssetBps: 2600 });
    await expect(guard.connect(user).tryExecuteRebalance(blocked)).to.emit(guard, "RebalanceBlocked").withArgs(user.address, "max per-asset exceeded");
  });

  it("regression: blocked rebalances have a non-reverting event path", async () => {
    const { user, guard } = await withPolicy();
    const blocked = goodParams({ topAssetBps: 2600 });

    await expect(guard.connect(user).tryExecuteRebalance(blocked))
      .to.emit(guard, "RebalanceBlocked")
      .withArgs(user.address, "max per-asset exceeded");
    expect(await guard.nextRebalanceId()).to.equal(1);
  });

  it("regression: human approval threshold is enforced", async () => {
    const { user, guard } = await withPolicy();
    const thresholdGated = goodParams({ notionalValue: ethers.parseEther("1001"), humanApproved: false });

    await expect(guard.connect(user).executeRebalance(thresholdGated)).to.be.revertedWith("AURALIS: human approval required");
    expect(await guard.checkRebalance(user.address, thresholdGated)).to.deep.equal([false, "human approval required"]);

    await expect(guard.connect(user).executeRebalance({ ...thresholdGated, humanApproved: true })).to.emit(guard, "RebalanceExecuted");
  });

  it("covers every guardrail and invalid policy/proposal branch", async () => {
    const { user, other, guard } = await withPolicy();
    await expect(guard.connect(other).setPaused(true)).to.be.revertedWith("AURALIS: no policy");
    await expect(guard.connect(user).setPolicy(10001, 1, 1, 1, 1, 0, 0)).to.be.revertedWith("AURALIS: bad bps");
    await expect(guard.connect(user).setPolicy(1, 10001, 1, 1, 1, 0, 0)).to.be.revertedWith("AURALIS: bad bps");
    await expect(guard.connect(user).setPolicy(1, 1, 1001, 1, 1, 0, 0)).to.be.revertedWith("AURALIS: slippage too high");
    await expect(guard.connect(user).setPolicy(1, 1, 1, 101, 1, 0, 0)).to.be.revertedWith("AURALIS: bad range");
    await expect(guard.connect(user).setPolicy(1, 1, 1, 1, 101, 0, 0)).to.be.revertedWith("AURALIS: bad range");

    await expect(guard.connect(other).executeRebalance(goodParams())).to.be.revertedWith("AURALIS: no policy set");
    await guard.connect(user).setPaused(true);
    await expect(guard.connect(user).executeRebalance(goodParams())).to.be.revertedWith("AURALIS: policy paused");
    await guard.connect(user).setPaused(false);
    const cases = [
      [goodParams({ portfolioHash: ZERO }), "empty portfolio hash"],
      [goodParams({ topAssetBps: 10001 }), "bad proposal bps"],
      [goodParams({ topProtocolBps: 10001 }), "bad proposal bps"],
      [goodParams({ aiConfidence: 101 }), "bad proposal range"],
      [goodParams({ liquidityScore: 101 }), "bad proposal range"],
      [goodParams({ topAssetBps: 2600 }), "max per-asset exceeded"],
      [goodParams({ topProtocolBps: 3100 }), "max per-protocol exceeded"],
      [goodParams({ slippageBps: 51 }), "slippage limit exceeded"],
      [goodParams({ aiConfidence: 69 }), "AI confidence too low"],
      [goodParams({ liquidityScore: 59 }), "liquidity too low"],
      [goodParams({ notionalValue: ethers.parseEther("1001") }), "human approval required"],
    ] as const;
    for (const [params, reason] of cases) {
      await expect(guard.connect(user).executeRebalance(params)).to.be.revertedWith(`AURALIS: ${reason}`);
      expect(await guard.checkRebalance(user.address, params)).to.deep.equal([false, reason]);
    }
    await guard.connect(user).executeRebalance(goodParams({ humanApproved: true, notionalValue: ethers.parseEther("1001") }));
    await expect(guard.connect(user).executeRebalance(goodParams({ humanApproved: true }))).to.be.revertedWith("AURALIS: rebalance cooldown active");
    await network.provider.send("evm_increaseTime", [3601]);
    await network.provider.send("evm_mine");
    expect(await guard.checkRebalance(user.address, goodParams())).to.deep.equal([true, "ok"]);
  });
});
