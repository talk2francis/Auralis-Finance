import { network, run } from "hardhat";
import { readFileSync } from "fs";

type DeploymentFile = {
  owner: string;
  contracts: Record<
    | "AuralisAgentRegistry"
    | "AuralisRatingRegistry"
    | "AuralisComplianceAttestor"
    | "AuralisPolicyGuard",
    string
  >;
};

const contractPaths: Record<keyof DeploymentFile["contracts"], string> = {
  AuralisAgentRegistry: "contracts/AuralisAgentRegistry.sol:AuralisAgentRegistry",
  AuralisRatingRegistry: "contracts/AuralisRatingRegistry.sol:AuralisRatingRegistry",
  AuralisComplianceAttestor:
    "contracts/AuralisComplianceAttestor.sol:AuralisComplianceAttestor",
  AuralisPolicyGuard: "contracts/AuralisPolicyGuard.sol:AuralisPolicyGuard",
};

async function verify(name: keyof DeploymentFile["contracts"], address: string, owner: string) {
  console.log(`Verifying ${name} at ${address}`);
  try {
    await run("verify:verify", {
      address,
      constructorArguments: [owner],
      contract: contractPaths[name],
    });
    console.log(`Verified ${name}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("already verified")) {
      console.log(`${name} already verified`);
      return;
    }

    console.warn(`Explorer verification failed for ${name}; trying Sourcify fallback.`);
    console.warn(message);
    await run("verify:sourcify", {
      address,
      contract: contractPaths[name],
    });
    console.log(`Verified ${name} on Sourcify`);
  }
}

async function main() {
  const path = `deployments/${network.name}.json`;
  const deployment = JSON.parse(readFileSync(path, "utf8")) as DeploymentFile;
  const { owner, contracts } = deployment;
  if (!owner) throw new Error(`Missing owner in ${path}`);

  await verify("AuralisAgentRegistry", contracts.AuralisAgentRegistry, owner);
  await verify("AuralisRatingRegistry", contracts.AuralisRatingRegistry, owner);
  await verify("AuralisComplianceAttestor", contracts.AuralisComplianceAttestor, owner);
  await verify("AuralisPolicyGuard", contracts.AuralisPolicyGuard, owner);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
