"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import type { Adapter } from "@solana/wallet-adapter-base";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { COOKIE_RPC_URL } from "@/lib/cookie-chain";

import "@solana/wallet-adapter-react-ui/styles.css";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [wallets, setWallets] = useState<Adapter[]>([]);

  useEffect(() => {
    setWallets([new NightlyWalletAdapter(), new PhantomWalletAdapter()]);
  }, []);

  const endpoint = useMemo(() => COOKIE_RPC_URL, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <TooltipProvider>
              {children}
              <Toaster richColors position="bottom-right" />
            </TooltipProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}
