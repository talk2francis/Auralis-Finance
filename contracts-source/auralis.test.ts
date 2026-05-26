// test/auralis.test.ts
//
// Representative test suite for the Auralis contracts. The production repo
// expands these to full branch coverage (see docs/TESTING.md). Run:
//   npx hardhat test

import { expect } from "chai";
import { ethers } from "hardhat";

const id = (s: string) => ethers.keccak256(ethers.toUtf8Bytes(s));

describe("AuralisRatingRegistry", () => {
  it("anchors a rating and exposes it via latestRating + verifyRating", async () => {
    const [owner, anon] = await ethers.getSigners();
    const Reg = await ethers.getContractFactory("AuralisRatingRegistry");
    const reg = await Reg.deploy(owner.address);

    const assetId = id("USDY");
    const ratingHash = id("rating:USDY:v1");
    // Grade enum: 0 NR, 1 AAA, 2 AA, 3 A, 4 BBB, 5 BB, 6 B, 7 C
    await reg.connect(anon).anchorRating(assetId, ratingHash, 3, 28, 100, "ipfs://x");

    const r = await reg.latestRating(assetId);
    expect(r.grade).to.equal(3);
    expect(r.riskScore).to.equal(28);
    expect(r.official).to.equal(false); // anon is not an approved publisher
    expect(await reg.verifyRating(assetId, ratingHash)).to.equal(true);
  });

  it("flags ratings from an approved publisher as official and rejects dupes", async () => {
    const [owner] = await ethers.getSigners();
    const Reg = await ethers.getContractFactory("AuralisRatingRegistry");
    const reg = await Reg.deploy(owner.address);

    await reg.setPublisher(owner.address, true);
    const h = id("rating:mETH:v1");
    await reg.anchorRating(id("mETH"), h, 2, 35, 100, "ipfs://m");
    const r = await reg.latestRating(id("mETH"));
    expect(r.official).to.equal(true);

    await expect(
      reg.anchorRating(id("mETH"), h, 2, 35, 100, "ipfs://m")
    ).to.be.revertedWith("AURALIS: duplicate rating");
  });

  it("logs an AI decision on-chain", async () => {
    const [owner, user] = await ethers.getSigners();
    const Reg = await ethers.getContractFactory("AuralisRatingRegistry");
    const reg = await Reg.deploy(owner.address);

    await expect(
      reg.connect(user).logDecision(id("dec1"), id("rebalance"), 41, "ipfs://d")
    ).to.emit(reg, "DecisionLogged");
    const d = await reg.decisions(1);
    expect(d.agent).to.equal(user.address);
    expect(d.riskScore).to.equal(41);
  });
});

describe("AuralisComplianceAttestor", () => {
  it("mints a self-attestation and exposes isEligible", async () => {
    const [owner, user] = await ethers.getSigners();
    const Att = await ethers.getContractFactory("AuralisComplianceAttestor");
    const att = await Att.deploy(owner.address);

    const assetClass = id("US_TREASURY_RWA");
    // Verdict enum: 0 None, 1 Eligible, 2 Restricted, 3 Denied
    await att
      .connect(user)
      .mintAttestation(
        user.address,
        assetClass,
        1,
        id("check:1"),
        id("NG"),
        "ipfs://c",
        7 * 24 * 60 * 60
      );

    expect(await att.isEligible(user.address, assetClass)).to.equal(true);
    const [verdict, active] = await att.getVerdict(user.address, assetClass);
    expect(verdict).to.equal(1);
    expect(active).to.equal(true);
  });

  it("blocks unauthorized attesters", async () => {
    const [owner, user, stranger] = await ethers.getSigners();
    const Att = await ethers.getContractFactory("AuralisComplianceAttestor");
    const att = await Att.deploy(owner.address);

    await expect(
      att
        .connect(stranger)
        .mintAttestation(
          user.address,
          id("US_TREASURY_RWA"),
          1,
          id("check:2"),
          id("NG"),
          "ipfs://c",
          7 * 24 * 60 * 60
        )
    ).to.be.revertedWith("AURALIS: not authorized");
  });
});

describe("AuralisPolicyGuard", () => {
  const params = {
    portfolioHash: id("pf1"),
    topAssetBps: 2200,
    topProtocolBps: 2800,
    slippageBps: 30,
    aiConfidence: 82,
    liquidityScore: 78,
    notionalValue: ethers.parseEther("100"),
    metadataURI: "ipfs://p",
  };

  it("executes a rebalance that passes all guardrails", async () => {
    const [owner, user] = await ethers.getSigners();
    const Guard = await ethers.getContractFactory("AuralisPolicyGuard");
    const guard = await Guard.deploy(owner.address);

    await guard
      .connect(user)
      .setPolicy(2500, 3000, 50, 70, 60, 0, ethers.parseEther("250000"));
    await expect(guard.connect(user).executeRebalance(params)).to.emit(
      guard,
      "RebalanceExecuted"
    );
  });

  it("reverts a rebalance that breaches the per-asset cap", async () => {
    const [owner, user] = await ethers.getSigners();
    const Guard = await ethers.getContractFactory("AuralisPolicyGuard");
    const guard = await Guard.deploy(owner.address);

    await guard
      .connect(user)
      .setPolicy(2000, 3000, 50, 70, 60, 0, ethers.parseEther("250000"));
    await expect(
      guard.connect(user).executeRebalance(params) // topAssetBps 2200 > 2000
    ).to.be.revertedWith("AURALIS: max per-asset exceeded");
  });
});
