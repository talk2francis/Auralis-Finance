// scripts/deploy.ts
//
// Auralis Finance — one-shot deployment to Mantle.
// Run: pnpm -F @auralis/contracts exec hardhat run scripts/deploy.ts --network mantle
//
// SAFETY: this is a MANUAL, human-run, local command. It is the ONLY moment a
// private key is used. CI never runs this. After deploy, remove the key.

import { ethers, network } from "hardhat";
import { mkdirSync, writeFileSync } from "fs";

async function main() {
  const owner = process.env.OWNER_ADDRESS;
  if (!owner) throw new Error("OWNER_ADDRESS env var is required");

  const [deployer] = await ethers.getSigners();
  console.log(`Network:  ${network.name}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Owner:    ${owner}\n`);

  const AgentRegistry = await ethers.getContractFactory("AuralisAgentRegistry");
  const agentRegistry = await AgentRegistry.deploy(owner);
  await agentRegistry.waitForDeployment();
  const agentRegistryAddr = await agentRegistry.getAddress();
  console.log(`AuralisAgentRegistry      → ${agentRegistryAddr}`);

  const RatingRegistry = await ethers.getContractFactory("AuralisRatingRegistry");
  const ratingRegistry = await RatingRegistry.deploy(owner);
  await ratingRegistry.waitForDeployment();
  const ratingRegistryAddr = await ratingRegistry.getAddress();
  console.log(`AuralisRatingRegistry     → ${ratingRegistryAddr}`);

  const ComplianceAttestor = await ethers.getContractFactory("AuralisComplianceAttestor");
  const complianceAttestor = await ComplianceAttestor.deploy(owner);
  await complianceAttestor.waitForDeployment();
  const complianceAttestorAddr = await complianceAttestor.getAddress();
  console.log(`AuralisComplianceAttestor → ${complianceAttestorAddr}`);

  const PolicyGuard = await ethers.getContractFactory("AuralisPolicyGuard");
  const policyGuard = await PolicyGuard.deploy(owner);
  await policyGuard.waitForDeployment();
  const policyGuardAddr = await policyGuard.getAddress();
  console.log(`AuralisPolicyGuard        → ${policyGuardAddr}\n`);

  const out = {
    network: network.name,
    chainId: network.name === "mantle" ? 5000 : 5003,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    owner,
    contracts: {
      AuralisAgentRegistry: agentRegistryAddr,
      AuralisRatingRegistry: ratingRegistryAddr,
      AuralisComplianceAttestor: complianceAttestorAddr,
      AuralisPolicyGuard: policyGuardAddr,
    },
  };

  mkdirSync("deployments", { recursive: true });
  writeFileSync(`deployments/${network.name}.json`, JSON.stringify(out, null, 2));
  console.log(`Saved → deployments/${network.name}.json`);
  console.log("\nNext: verify on Mantle Explorer, then update apps/web env vars.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
