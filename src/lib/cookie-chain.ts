export const COOKIE_RPC_URL =
  process.env.COOKIE_RPC_URL ?? "https://rpc.cookiescan.io";
export const COOKIE_DAS_URL =
  process.env.COOKIE_DAS_URL ?? "https://api.cookiescan.io";
export const COOKIE_EXPLORER_URL = "https://cookiescan.io";
export const COOKIE_BRIDGE_URL = "https://hyperlane.cookiescan.io";
export const COOKIE_DOCS_URL = "https://docs.cookiechain.wtf";
export const LAMPORTS_PER_COOK = 1_000_000_000;

export function explorerAddress(address: string) {
  return `${COOKIE_EXPLORER_URL}/address/${address}`;
}

export function explorerTx(signature: string) {
  return `${COOKIE_EXPLORER_URL}/tx/${signature}`;
}

export function formatCook(lamports: number | bigint, digits = 4) {
  const value = Number(lamports) / LAMPORTS_PER_COOK;
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

export function formatCompact(n: number | bigint) {
  const value = Number(n);
  if (!Number.isFinite(value)) return "—";
  return Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export type ClusterSnapshot = {
  rpc: string;
  health: string;
  slot: number;
  blockHeight: number;
  epoch: {
    epoch: number;
    slotIndex: number;
    slotsInEpoch: number;
    absoluteSlot: number;
    blockHeight: number;
    transactionCount?: number;
  };
  supply: {
    total: number;
    circulating: number;
    nonCirculating: number;
  };
  version: { "solana-core"?: string; "feature-set"?: number };
  validators: {
    current: number;
    delinquent: number;
    sample: Array<{
      votePubkey: string;
      nodePubkey: string;
      activatedStake: number;
      commission: number;
    }>;
  };
};

export type DasAsset = {
  id: string;
  content?: {
    metadata?: { name?: string; symbol?: string };
    json_uri?: string;
  };
  token_info?: {
    symbol?: string;
    balance?: number;
    decimals?: number;
  };
};
