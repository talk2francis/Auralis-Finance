"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "sonner";
import { CommandPalette } from "../components/CommandPalette";
import { CopilotWidget } from "../components/CopilotWidget";

// Phase 1 shell provider boundary. Wallet dependencies (wagmi/viem, Privy, RainbowKit)
// are installed and env-configured; wallet UI is progressively enhanced from the
// lightweight button so production builds remain deterministic in constrained CI.
export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <CommandPalette />
      <CopilotWidget />
      <Toaster richColors />
    </QueryClientProvider>
  );
}
