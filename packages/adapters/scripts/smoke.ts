import { getAllAssets } from "../src";

async function main() {
  const assets = await getAllAssets();
  console.log(JSON.stringify(assets.map((a) => ({ assetId: a.assetId, symbol: a.symbol, assetClass: a.assetClass, price: a.price, mock: a.mock })), null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
