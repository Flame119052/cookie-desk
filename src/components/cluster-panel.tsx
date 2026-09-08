"use client";

import { useCallback, useEffect, useState } from "react";
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
  COOKIE_EXPLORER_URL,
  formatCompact,
  type ClusterSnapshot,
} from "@/lib/cookie-chain";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-background/40 px-3 py-2">
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg leading-none">{value}</p>
      {hint ? (
        <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function ClusterPanel() {
  const [data, setData] = useState<ClusterSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/cluster", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Could not read the cluster");
      }
      setData(json as ClusterSnapshot);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read the cluster");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 8000);
    return () => window.clearInterval(id);
  }, [load]);

  if (loading && !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cookie Chain cluster</CardTitle>
          <CardDescription>Reading community RPC…</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Slot, validators, and COOK supply load from rpc.cookiescan.io.
        </CardContent>
      </Card>
    );
  }

  if (error && !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cookie Chain cluster</CardTitle>
          <CardDescription>The community RPC did not answer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-destructive">{error}</p>
          <Button variant="outline" onClick={() => void load()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const epochPct = Math.round(
    (data.epoch.slotIndex / data.epoch.slotsInEpoch) * 100,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Cookie Chain cluster</CardTitle>
          <CardDescription>
            Live SVM stats from the community RPC. Refreshes every 8 seconds.
          </CardDescription>
        </div>
        <Badge variant={data.health === "ok" ? "secondary" : "destructive"}>
          {data.health === "ok" ? "healthy" : data.health}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <p className="text-xs text-destructive">Last refresh failed: {error}</p>
        ) : null}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Stat label="Slot" value={formatCompact(data.slot)} />
          <Stat label="Block height" value={formatCompact(data.blockHeight)} />
          <Stat
            label="Epoch"
            value={String(data.epoch.epoch)}
            hint={`${epochPct}% · ${formatCompact(data.epoch.slotIndex)} / ${formatCompact(data.epoch.slotsInEpoch)}`}
          />
          <Stat
            label="Validators"
            value={String(data.validators.current)}
            hint={
              data.validators.delinquent
                ? `${data.validators.delinquent} delinquent`
                : "none delinquent"
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <Stat
            label="COOK circulating"
            value={formatCompact(data.supply.circulating / 1_000_000_000)}
            hint="native units ÷ 1e9"
          />
          <Stat
            label="Core version"
            value={data.version["solana-core"] ?? "unknown"}
          />
          <Stat
            label="Tx count"
            value={
              data.epoch.transactionCount
                ? formatCompact(data.epoch.transactionCount)
                : "—"
            }
          />
        </div>
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Activated stake sample
          </p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Vote</th>
                  <th className="px-3 py-2 font-medium">Identity</th>
                  <th className="px-3 py-2 font-medium">Stake</th>
                  <th className="px-3 py-2 font-medium">Fee</th>
                </tr>
              </thead>
              <tbody>
                {data.validators.sample.map((v) => (
                  <tr key={v.votePubkey} className="border-t">
                    <td className="px-3 py-2 font-mono">
                      <a
                        className="underline-offset-2 hover:underline"
                        href={`${COOKIE_EXPLORER_URL}/address/${v.votePubkey}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {v.votePubkey.slice(0, 4)}…{v.votePubkey.slice(-4)}
                      </a>
                    </td>
                    <td className="px-3 py-2 font-mono">
                      {v.nodePubkey.slice(0, 4)}…{v.nodePubkey.slice(-4)}
                    </td>
                    <td className="px-3 py-2 font-mono">
                      {formatCompact(v.activatedStake / 1_000_000_000)}
                    </td>
                    <td className="px-3 py-2">{v.commission}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
