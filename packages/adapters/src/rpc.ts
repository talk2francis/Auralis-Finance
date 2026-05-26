import { createPublicClient, fallback, http, type Abi, type Address, type Hex } from "viem";
import { mantle } from "viem/chains";
import { cached } from "./cache";

const rpcUrl = process.env.MANTLE_RPC_URL || process.env.NEXT_PUBLIC_MANTLE_RPC_URL || "https://rpc.mantle.xyz";
const backupRpcUrl = process.env.MANTLE_BACKUP_RPC_URL;

export const mantleClient = createPublicClient({
  chain: mantle,
  transport: backupRpcUrl ? fallback([http(rpcUrl), http(backupRpcUrl)]) : http(rpcUrl),
});

const ttl = 60_000;

export function getCode(address: Address) {
  return cached(`rpc:getCode:${address}`, ttl, () => mantleClient.getCode({ address }));
}

export function getBalance(address: Address) {
  return cached(`rpc:getBalance:${address}`, ttl, () => mantleClient.getBalance({ address }));
}

export function readContract<TAbi extends Abi, TFunctionName extends string>(args: {
  address: Address;
  abi: TAbi;
  functionName: TFunctionName;
  args?: readonly unknown[];
}) {
  return cached(`rpc:read:${args.address}:${args.functionName}:${JSON.stringify(args.args ?? [])}`, ttl, () =>
    mantleClient.readContract(args as never),
  );
}

export function getLogs(args: { address?: Address; event?: never; fromBlock?: bigint; toBlock?: bigint }) {
  return cached(`rpc:logs:${JSON.stringify(args)}`, ttl, () => mantleClient.getLogs(args));
}

export function estimateGas(args: { account: Address; to: Address; data?: Hex; value?: bigint }) {
  return cached(`rpc:gas:${JSON.stringify(args)}`, ttl, () => mantleClient.estimateGas(args));
}
