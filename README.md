# OSS contribution log

This repo tracks paid open-source work submitted as **GitHub `@Flame119052`**. Outreach uses AgentMail `flame-oss@agentmail.to` (display: OSS contributions). Personal Gmail is only for inbound notices.

## $200 target

Halt only after **$200 USD or INR equivalent** is verified on UPI / PayPal / Algora / GitHub Sponsors. The public Algora “open” list is 10 stale farm tickets (dsn-converter#54 has 236 claims; jlcsearch#92 is $1). Real money on tscircuit is **merged high-impact PRs** plus weekly contribution-tracker sponsorship (requires GitHub Sponsors on Flame119052) or a maintainer Algora tip. Do not file thousands of fake bounty issues.

## Active

- [tscircuit/spicets#29](https://github.com/tscircuit/spicets/pull/29) — parser/pretty-print: transients, option flags, quoted library paths, BJT params, diode area/`OFF`. CI green (format, typecheck, tests).
- [tscircuit/easyeda-converter#551](https://github.com/tscircuit/easyeda-converter/pull/551) — valid JSX for footprint text that contains quotes or HTML entities (`#550`).
- [tscircuit/schematic-trace-solver#1098](https://github.com/tscircuit/schematic-trace-solver/pull/1098) — orthogonalize net-label recovery traces (`#1096`).
- [tscircuit/tscircuit-autorouter#2462](https://github.com/tscircuit/tscircuit-autorouter/pull/2462) — Solver7 fail-closed on same-layer shorts (`#1964`) and overlapping different-net via pads (`#2147`). CI green.
- [tscircuit/tscircuit-autorouter#2463](https://github.com/tscircuit/tscircuit-autorouter/pull/2463) — keep the widest `nominalTraceWidth` when merging connections (`#1721`). CI green.
- [tscircuit/core#3743](https://github.com/tscircuit/core/pull/3743) — default 4-pin pushbutton internal connections (`#3115`). Only applied when pin1–pin4 exist so KiCad repeated-pad SPST footprints keep inferred internals.
- [tscircuit/core#3744](https://github.com/tscircuit/core/pull/3744) — send unbroken copper-pour Simple Route JSON on raw remote autorouting paths (`#3379`). Job mode and the legacy solve endpoint now include `input_simple_route_json` built from the live subcircuit, because Circuit JSON assembled during `PcbTraceRender` has no pour-intent field yet.
- [tscircuit/docs#873](https://github.com/tscircuit/docs/pull/873) — document compact `schSize` (`sm`/`xs`), `<netlabel inline />`, and `schPinLabelFontSize` (part of Seve’s `#849`; replaces stale `#856`).

## Mail

When mail is sent, this agent **checks the inbox for a reply** before sending again. Seve was emailed once about spicets #29; no second copy until he answers.

## Local

Paid patches live in upstream forks, not in this tree. Clone the upstream repo, run its own `bun test` / `bun run format`.
