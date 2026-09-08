import { NextResponse } from "next/server";
import { COOKIE_DAS_URL, type DasAsset } from "@/lib/cookie-chain";

export async function GET(request: Request) {
  const owner = new URL(request.url).searchParams.get("owner");
  if (!owner) {
    return NextResponse.json({ error: "owner is required" }, { status: 400 });
  }

  try {
    const res = await fetch(COOKIE_DAS_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAssetsByOwner",
        params: {
          ownerAddress: owner,
          page: 1,
          limit: 24,
        },
      }),
      cache: "no-store",
    });
    const json = (await res.json()) as {
      result?: { items?: DasAsset[]; total?: number };
      error?: { message?: string };
    };
    if (json.error) {
      throw new Error(json.error.message ?? "DAS error");
    }
    return NextResponse.json({
      items: json.result?.items ?? [],
      total: json.result?.total ?? json.result?.items?.length ?? 0,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "DAS fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
