"use client";

import { useState } from "react";
import { Button } from "@auralis/ui";

export function WalletButton() {
  const [address, setAddress] = useState<string>();
  async function connect() {
    const eth = (globalThis as unknown as { ethereum?: { request(args: { method: string }): Promise<string[]> } }).ethereum;
    const accounts = eth ? await eth.request({ method: "eth_requestAccounts" }) : [];
    setAddress(accounts[0]);
  }
  if (address) return <Button variant="secondary" onClick={() => setAddress(undefined)}>{address.slice(0, 6)}…{address.slice(-4)}</Button>;
  return <Button onClick={connect}>Connect wallet</Button>;
}
