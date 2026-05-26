import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../lib/providers";

export const metadata: Metadata = { title: "Auralis Finance", description: "AI risk and compliance for Mantle RWAs" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="font-sans"><Providers>{children}</Providers></body></html>;
}
