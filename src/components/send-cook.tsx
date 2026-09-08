"use client";

import { useMemo, useState } from "react";
import { Buffer } from "buffer";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  COOKIE_BRIDGE_URL,
  explorerTx,
  LAMPORTS_PER_COOK,
} from "@/lib/cookie-chain";

const MEMO_PROGRAM = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

export function SendCookPanel() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.001");
  const [memo, setMemo] = useState("cookie-desk ping");
  const [busy, setBusy] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const destination = useMemo(() => {
    try {
      return to.trim() ? new PublicKey(to.trim()) : publicKey;
    } catch {
      return null;
    }
  }, [to, publicKey]);

  async function onSend() {
    if (!publicKey || !destination) {
      setError("Connect a wallet and enter a valid destination address.");
      return;
    }
    const cook = Number(amount);
    if (!Number.isFinite(cook) || cook <= 0) {
      setError("Amount must be a positive COOK value.");
      return;
    }
    const lamports = Math.round(cook * LAMPORTS_PER_COOK);
    setBusy(true);
    setError(null);
    setSignature(null);
    setStatus("Building transaction…");
    try {
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: destination,
          lamports,
        }),
      );
      if (memo.trim()) {
        tx.add(
          new TransactionInstruction({
            keys: [],
            programId: MEMO_PROGRAM,
            data: Buffer.from(memo.trim(), "utf8"),
          }),
        );
      }
      setStatus("Waiting for wallet signature…");
      const sig = await sendTransaction(tx, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });
      setSignature(sig);
      setStatus("Confirming on Cookie Chain…");
      const confirmation = await connection.confirmTransaction(
        { signature: sig, blockhash, lastValidBlockHeight },
        "confirmed",
      );
      if (confirmation.value.err) {
        throw new Error(`Chain rejected the transaction: ${JSON.stringify(confirmation.value.err)}`);
      }
      setStatus("Confirmed");
      toast.success("Transfer confirmed on Cookie Chain");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Transaction failed";
      setError(message);
      setStatus(null);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send COOK</CardTitle>
        <CardDescription>
          Builds a native transfer plus an optional memo, then waits for
          confirmed status on Cookie Chain. Empty destination sends to yourself
          as a ping.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!connected ? (
          <p className="text-sm text-muted-foreground">
            Connect Nightly first. If the wallet has zero COOK, bridge from
            Solana at{" "}
            <a
              className="underline underline-offset-2"
              href={COOKIE_BRIDGE_URL}
              target="_blank"
              rel="noreferrer"
            >
              hyperlane.cookiescan.io
            </a>
            .
          </p>
        ) : null}
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">
            Destination
          </span>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Leave blank to ping your own address"
            disabled={!connected || busy}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">
            Amount (COOK)
          </span>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            disabled={!connected || busy}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">
            Memo
          </span>
          <Input
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={!connected || busy}
          />
        </label>
        {destination === null && to.trim() ? (
          <p className="text-xs text-destructive">That address is not valid.</p>
        ) : null}
        <Button onClick={() => void onSend()} disabled={!connected || busy}>
          {busy ? "Sending…" : "Send on Cookie Chain"}
        </Button>
        {status ? (
          <p className="text-sm text-muted-foreground">{status}</p>
        ) : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {signature ? (
          <p className="break-all font-mono text-xs">
            Signature:{" "}
            <a
              className="underline underline-offset-2"
              href={explorerTx(signature)}
              target="_blank"
              rel="noreferrer"
            >
              {signature}
            </a>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
