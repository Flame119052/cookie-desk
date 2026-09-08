"use client";

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  COOKIE_BRIDGE_URL,
  explorerAddress,
  formatCook,
  type DasAsset,
} from "@/lib/cookie-chain";

export function WalletPanel() {
  const { connection } = useConnection();
  const { publicKey, connected, connecting } = useWallet();
  const [lamports, setLamports] = useState<number | null>(null);
  const [assets, setAssets] = useState<DasAsset[]>([]);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [loadingAssets, setLoadingAssets] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      setLamports(null);
      setAssets([]);
      return;
    }
    let cancelled = false;
    void connection
      .getBalance(publicKey)
      .then((value) => {
        if (!cancelled) {
          setLamports(value);
          setBalanceError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setBalanceError(err instanceof Error ? err.message : "balance failed");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [connection, publicKey]);

  useEffect(() => {
    if (!publicKey) return;
    let cancelled = false;
    setLoadingAssets(true);
    void fetch(`/api/assets?owner=${publicKey.toBase58()}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "DAS failed");
        return json as { items: DasAsset[] };
      })
      .then((json) => {
        if (!cancelled) {
          setAssets(json.items);
          setAssetError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setAssetError(err instanceof Error ? err.message : "DAS failed");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingAssets(false);
      });
    return () => {
      cancelled = true;
    };
  }, [publicKey]);

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>
            Nightly is required for the Cookie Chain bounty. Phantom also works
            if you point it at rpc.cookiescan.io.
          </CardDescription>
        </div>
        <WalletMultiButton />
      </CardHeader>
      <CardContent className="space-y-4">
        {!connected && !connecting ? (
          <div className="rounded-lg border border-dashed px-3 py-4 text-sm text-muted-foreground">
            Connect Nightly to show your COOK balance, DAS holdings, and send a
            confirmation-tracked transfer on Cookie Chain.
          </div>
        ) : null}

        {publicKey ? (
          <div className="space-y-2">
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Connected address
            </p>
            <a
              className="block break-all font-mono text-sm underline-offset-2 hover:underline"
              href={explorerAddress(publicKey.toBase58())}
              target="_blank"
              rel="noreferrer"
            >
              {publicKey.toBase58()}
            </a>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {lamports == null
                  ? "balance…"
                  : `${formatCook(lamports)} COOK`}
              </Badge>
              {lamports === 0 ? (
                <Button asChild size="sm" variant="outline">
                  <a href={COOKIE_BRIDGE_URL} target="_blank" rel="noreferrer">
                    Bridge COOK
                  </a>
                </Button>
              ) : null}
            </div>
            {balanceError ? (
              <p className="text-xs text-destructive">{balanceError}</p>
            ) : null}
            <p className="text-xs text-muted-foreground">
              1 COOK = {LAMPORTS_PER_SOL.toLocaleString()} lamports, same
              decimals as Solana native SOL.
            </p>
          </div>
        ) : null}

        {publicKey ? (
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Digital assets
            </p>
            {loadingAssets ? (
              <p className="text-sm text-muted-foreground">Loading DAS…</p>
            ) : assetError ? (
              <p className="text-sm text-destructive">{assetError}</p>
            ) : assets.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No indexed assets for this address yet. Native COOK still
                appears in the balance above.
              </p>
            ) : (
              <ul className="space-y-2">
                {assets.map((asset) => {
                  const name =
                    asset.content?.metadata?.name ??
                    asset.token_info?.symbol ??
                    asset.id.slice(0, 8);
                  const symbol =
                    asset.token_info?.symbol ??
                    asset.content?.metadata?.symbol ??
                    "";
                  return (
                    <li
                      key={asset.id}
                      className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2"
                    >
                      <span className="truncate text-sm">{name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {symbol}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
