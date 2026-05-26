// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Auralis Finance — Hardhat config.
 *
 * Networks:
 *  - mantle        Mantle Mainnet  (chainId 5000) — production target
 *  - mantleSepolia Mantle Sepolia testnet (chainId 5003) — CI / dry-run target
 *
 * SAFETY: DEPLOYER_PRIVATE_KEY is read from a LOCAL .env only. It must never be
 * committed, never placed in Vercel, and must be removed after deployment.
 * CI never runs deployments — see .github/workflows.
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      evmVersion: "cancun",
    },
  },
  networks: {
    mantle: {
      url: process.env.MANTLE_RPC_URL || "https://rpc.mantle.xyz",
      chainId: 5000,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
    },
    mantleSepolia: {
      url:
        process.env.MANTLE_SEPOLIA_RPC_URL ||
        "https://rpc.sepolia.mantle.xyz",
      chainId: 5003,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
    },
  },
  // Verification: Mantle Explorer is Blockscout-based; Sourcify is the fallback.
  sourcify: { enabled: true },
  etherscan: {
    apiKey: {
      mantle: process.env.MANTLE_EXPLORER_API_KEY || "blockscout",
      mantleSepolia: process.env.MANTLE_EXPLORER_API_KEY || "blockscout",
    },
    customChains: [
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL: "https://explorer.mantle.xyz/api",
          browserURL: "https://explorer.mantle.xyz",
        },
      },
      {
        network: "mantleSepolia",
        chainId: 5003,
        urls: {
          apiURL: "https://explorer.sepolia.mantle.xyz/api",
          browserURL: "https://explorer.sepolia.mantle.xyz",
        },
      },
    ],
  },
};

export default config;
