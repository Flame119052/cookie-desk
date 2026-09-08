# OSS contribution log

This repo tracks paid open-source work submitted as GitHub `@Flame119052`.
Outreach uses AgentMail `flame-oss@agentmail.to` (display: OSS contributions).
Personal Gmail is inbound only.

## $200 target

Halt only after **$200 USD or INR equivalent** is verified on UPI, PayPal,
Algora, or Superteam USDC. GitHub Sponsors is out. The public Algora "open"
list is stale farm tickets. Real money is a merged high-impact PR plus a
maintainer Algora `/tip` or private UPI.

Do not file thousands of fake bounty issues.

## Payout rails (private)

1. UPI VPA in private maintainer mail only. Never in public PRs, issues, or git.
2. PayPal through Algora when a maintainer `/tip`s or awards a bounty on a merged PR.
3. Superteam Earn USDC if a live AGENT_ALLOWED coding listing exists. Current live agent listings have winners announced.

Connect PayPal at https://console.algora.io as `@Flame119052`.

## Active PRs

- [tscircuit/spicets#29](https://github.com/tscircuit/spicets/pull/29) parser and pretty-print. CI green. Seve mailed once. No second copy.
- [tscircuit/easyeda-converter#551](https://github.com/tscircuit/easyeda-converter/pull/551) JSX text escaping (`#550`).
- [tscircuit/schematic-trace-solver#1098](https://github.com/tscircuit/schematic-trace-solver/pull/1098) orthogonal net-label traces.
- [tscircuit/tscircuit-autorouter#2462](https://github.com/tscircuit/tscircuit-autorouter/pull/2462) fail-closed same-layer shorts (`#1964`, `#2147`).
- [tscircuit/tscircuit-autorouter#2463](https://github.com/tscircuit/tscircuit-autorouter/pull/2463) keep widest trace width (`#1721`).
- [tscircuit/tscircuit-autorouter#2464](https://github.com/tscircuit/tscircuit-autorouter/pull/2464) via/pad output DRC (`#2058`).
- [tscircuit/core#3743](https://github.com/tscircuit/core/pull/3743) default 4-pin pushbutton internals (`#3115`).
- [tscircuit/core#3744](https://github.com/tscircuit/core/pull/3744) unbroken copper-pour Simple Route JSON (`#3379`).
- [tscircuit/core#3746](https://github.com/tscircuit/core/pull/3746) per-side board finish and assembly on `pcb_board` (`#3101`). Companion [circuit-json#766](https://github.com/tscircuit/circuit-json/pull/766).
- [tscircuit/docs#873](https://github.com/tscircuit/docs/pull/873) compact `schSize`, inline netlabels (part of Seve `#849`, replaces `#856`).
- [tscircuit/docs#874](https://github.com/tscircuit/docs/pull/874) pin-header mating-side aliases (part of Seve `#849`, replaces `#854`).
- [tscircuit/docs#875](https://github.com/tscircuit/docs/pull/875) `fanoutMargin`, edge-first fanout names, and singleton buses (part of Seve `#849`, replaces `#857`).

## Mail

Check both `flame-oss@agentmail.to` and `krishay-oss@agentmail.to` before sending.
Seve was emailed once about spicets #29. Do not send a second copy until he answers.

## Local

Paid patches live in upstream forks, not in this tree.
Clone the upstream repo and run its own `bun test` / `bun run format`.
