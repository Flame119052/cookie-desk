import { ClusterPanel } from "@/components/cluster-panel";
import { SendCookPanel } from "@/components/send-cook";
import { WalletPanel } from "@/components/wallet-panel";
import { Button } from "@/components/ui/button";
import {
  COOKIE_BRIDGE_URL,
  COOKIE_DOCS_URL,
  COOKIE_EXPLORER_URL,
} from "@/lib/cookie-chain";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-amber-400/90 uppercase">
              Cookie Chain cApp
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Cookie Desk
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              A live operator desk for the Cookie Chain SVM. Connect Nightly,
              watch the validator set, inspect DAS holdings, and send COOK with
              confirmed transaction status.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={COOKIE_EXPLORER_URL} target="_blank" rel="noreferrer">
                Explorer
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={COOKIE_BRIDGE_URL} target="_blank" rel="noreferrer">
                Bridge COOK
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={COOKIE_DOCS_URL} target="_blank" rel="noreferrer">
                Docs
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-2">
        <div className="space-y-4">
          <ClusterPanel />
          <section className="rounded-xl border bg-card px-4 py-4 text-sm text-card-foreground">
            <h2 className="font-heading text-base font-medium">Why this exists</h2>
            <p className="mt-2 text-muted-foreground">
              Cookie Chain is cheap to deploy on and easy to ignore as a
              dashboard. Cookie Desk is the missing operator surface: cluster
              health, wallet identity, asset index, and a transfer that reports
              confirmation instead of fire-and-forget.
            </p>
          </section>
        </div>
        <div className="space-y-4">
          <WalletPanel />
          <SendCookPanel />
        </div>
      </main>

      <footer className="border-t border-border/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>RPC https://rpc.cookiescan.io · DAS https://api.cookiescan.io</span>
          <span>Open source · Flame119052 · Superteam Cookie Chain bounty</span>
        </div>
      </footer>
    </div>
  );
}
