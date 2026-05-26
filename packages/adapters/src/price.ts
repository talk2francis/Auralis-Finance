import { cached, getLastGood, setLastGood } from "./cache";
import type { PriceQuote } from "./types";

const ids: Record<string, string> = { ETH: "ethereum", MNT: "mantle", USDC: "usd-coin", USDe: "ethena-usde" };

export async function getPrice(symbol: string): Promise<PriceQuote> {
  return cached(`price:${symbol}`, 60_000, async () => {
    const key = symbol.toUpperCase();
    try {
      const quote = await fromDefiLlama(key);
      setLastGood(`price:${symbol}`, quote);
      return quote;
    } catch {
      try {
        const quote = await fromCoinGecko(key);
        setLastGood(`price:${symbol}`, quote);
        return quote;
      } catch {
        const last = getLastGood<PriceQuote>(`price:${symbol}`);
        if (last) return { ...last, stale: true, source: "last-good", updatedAt: new Date().toISOString() };
        // TODO(real-data): no live price available in local/offline mode.
        return { symbol, priceUsd: key.includes("ETH") ? 3840 : 1, stale: true, source: "mock", updatedAt: new Date().toISOString() };
      }
    }
  });
}

async function fromDefiLlama(symbol: string): Promise<PriceQuote> {
  const coin = symbol === "MNT" ? "coingecko:mantle" : symbol.includes("ETH") ? "coingecko:ethereum" : "coingecko:usd-coin";
  const res = await fetch(`https://coins.llama.fi/prices/current/${coin}`);
  if (!res.ok) throw new Error("DefiLlama price failed");
  const json = (await res.json()) as { coins?: Record<string, { price: number; timestamp: number }> };
  const item = json.coins?.[coin];
  if (!item) throw new Error("DefiLlama missing price");
  return { symbol, priceUsd: item.price, stale: false, source: "defillama", updatedAt: new Date(item.timestamp * 1000).toISOString() };
}

async function fromCoinGecko(symbol: string): Promise<PriceQuote> {
  const id = ids[symbol] ?? "usd-coin";
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
  if (!res.ok) throw new Error("CoinGecko price failed");
  const json = (await res.json()) as Record<string, { usd?: number }>;
  const price = json[id]?.usd;
  if (!price) throw new Error("CoinGecko missing price");
  return { symbol, priceUsd: price, stale: false, source: "coingecko", updatedAt: new Date().toISOString() };
}
