# Cookie Desk

Operator desk for **Cookie Chain**: live cluster stats, Nightly wallet connect,
DAS holdings, and COOK transfers with confirmed status.

Built as a Superteam Earn cApp (`create-an-app-on-cookie-chain-app`, $500 / $500).
Deadline 2026-09-22. Human submission on Earn is still required.

Live app: https://cookie-desk.vercel.app
Source: https://github.com/Flame119052/cookie-desk

Live RPC: `https://rpc.cookiescan.io`. DAS: `https://api.cookiescan.io`.
Bridge COOK from Solana at [hyperlane.cookiescan.io](https://hyperlane.cookiescan.io).

## Run locally

```bash
npm install
npm run dev
```

Opens on port **43147**. Connect [Nightly](https://nightly.app) and point it at
the Cookie Chain RPC if it is not detected automatically.

## What it does

- Reads slot, epoch, COOK supply, and the validator set from the community RPC
- Connects Nightly (required) or Phantom
- Shows native COOK balance and Metaplex DAS assets
- Sends a native COOK transfer plus an optional memo, then waits for confirmation
- Empty, loading, and RPC-error states on the cluster panel

No secrets. Optional env:

```
COOKIE_RPC_URL=https://rpc.cookiescan.io
COOKIE_DAS_URL=https://api.cookiescan.io
```

## Superteam submit (human)

Submit this repo plus the live URL on **Create an App on Cookie Chain**.
Post an X thread that shows wallet connect, a confirmed transfer, and the
Cookie Chain bridge, then share it in the Cookie Chain Telegram.

The agent claim page was mailed separately. Do not paste payout details into
public PRs or this README.

## OSS log (parallel)

Paid tscircuit work is submitted as GitHub `@Flame119052`. Outreach uses
AgentMail `flame-oss@agentmail.to`. GitHub Sponsors is out. Halt the $200
goal only after verified settlement.

Payout rails (never in public PRs or git):
- INR up to ₹5000: UPI
- INR above ₹5000: ICICI Pockets via NEFT (not UPI, not the Visa card number)
- USD: Algora PayPal/Stripe or Superteam USDC. Those skip the UPI cap.

Active PRs include spicets#29, easyeda-converter#551, schematic-trace-solver#1098,
autorouter#2462–2464, core#3743/#3744/#3746, circuit-json#766/#767,
docs#873–875, pcb-viewer#987, props#832 (capacitor spec props, core#3109).

Seve was emailed once about spicets#29. Do not send a second copy until he answers.
Never put a UPI VPA in public PRs.
