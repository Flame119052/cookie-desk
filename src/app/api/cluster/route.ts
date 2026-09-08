import { NextResponse } from "next/server";
import {
  COOKIE_RPC_URL,
  type ClusterSnapshot,
} from "@/lib/cookie-chain";

async function rpc<T>(method: string, params: unknown[] = []): Promise<T> {
  const res = await fetch(COOKIE_RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`RPC ${method} HTTP ${res.status}`);
  }
  const json = (await res.json()) as {
    result?: T;
    error?: { message?: string };
  };
  if (json.error) {
    throw new Error(json.error.message ?? `RPC ${method} failed`);
  }
  return json.result as T;
}

export async function GET() {
  try {
    const [health, slot, epoch, supply, version, vote] = await Promise.all([
      rpc<string>("getHealth"),
      rpc<number>("getSlot"),
      rpc<{
        epoch: number;
        slotIndex: number;
        slotsInEpoch: number;
        absoluteSlot: number;
        blockHeight: number;
        transactionCount?: number;
      }>("getEpochInfo"),
      rpc<{
        value: { total: number; circulating: number; nonCirculating: number };
      }>("getSupply", [{ excludeNonCirculatingAccountsList: true }]),
      rpc<{ "solana-core"?: string; "feature-set"?: number }>("getVersion"),
      rpc<{
        current: Array<{
          votePubkey: string;
          nodePubkey: string;
          activatedStake: number;
          commission: number;
        }>;
        delinquent: unknown[];
      }>("getVoteAccounts"),
    ]);

    const snapshot: ClusterSnapshot = {
      rpc: COOKIE_RPC_URL,
      health,
      slot,
      blockHeight: epoch.blockHeight,
      epoch,
      supply: supply.value,
      version,
      validators: {
        current: vote.current.length,
        delinquent: vote.delinquent.length,
        sample: vote.current.slice(0, 8).map((v) => ({
          votePubkey: v.votePubkey,
          nodePubkey: v.nodePubkey,
          activatedStake: v.activatedStake,
          commission: v.commission,
        })),
      },
    };

    return NextResponse.json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "cluster fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
