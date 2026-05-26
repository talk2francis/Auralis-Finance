"use client";
import { WalletButton } from "../../../lib/wallet-button";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@auralis/ui";

const steps = ["Connect wallet", "Verify Mantle", "Choose mode", "Risk profile", "First scan"];
export default function AppHome() { const [step,setStep]=useState(0); return <div className="mx-auto max-w-4xl"><h1 className="font-display text-4xl">Welcome to Auralis</h1><p className="mt-2 text-[var(--text-secondary)]">No seed phrase. No gas for your first check.</p><Card className="mt-6"><CardHeader><CardTitle>{steps[step]}</CardTitle></CardHeader><CardContent><div className="mb-6">{step===0 ? <WalletButton /> : <p>Configure: {steps[step]}</p>}</div><div className="flex justify-between"><Button variant="secondary" disabled={step===0} onClick={()=>setStep(step-1)}>Back</Button><Button onClick={()=>setStep(Math.min(steps.length-1,step+1))}>{step===steps.length-1?"Finish":"Next"}</Button></div></CardContent></Card></div>; }
