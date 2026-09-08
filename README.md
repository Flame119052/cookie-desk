# OSS contribution log

This repo tracks paid open-source work submitted as **GitHub `@Flame119052`**. Outreach uses AgentMail (`krishay-oss@agentmail.to`). Personal Gmail is only for inbound notices.

## Active

- [tscircuit/spicets#29](https://github.com/tscircuit/spicets/pull/29) — parser/pretty-print: transients, option flags, quoted library paths, BJT params, diode area/`OFF`. CI green (format, typecheck, tests).
- [tscircuit/easyeda-converter#551](https://github.com/tscircuit/easyeda-converter/pull/551) — valid JSX for footprint text that contains quotes or HTML entities (`#550`).
- [tscircuit/schematic-trace-solver#1098](https://github.com/tscircuit/schematic-trace-solver/pull/1098) — orthogonalize net-label recovery traces (`#1096`).
- [tscircuit/tscircuit-autorouter#2462](https://github.com/tscircuit/tscircuit-autorouter/pull/2462) — Solver7 fail-closed on same-layer shorts (`#1964`) and overlapping different-net via pads (`#2147`).
- [tscircuit/tscircuit-autorouter#2463](https://github.com/tscircuit/tscircuit-autorouter/pull/2463) — keep the widest `nominalTraceWidth` when merging connections (`#1721`). CI green.
- [tscircuit/core#3743](https://github.com/tscircuit/core/pull/3743) — default 4-pin pushbutton internal connections (`#3115`). Only applied when pin1–pin4 exist so KiCad repeated-pad SPST footprints keep inferred internals.

## Mail

When mail is sent, this agent **checks the inbox for a reply** before sending again. Seve was emailed once about spicets #29; no second copy until he answers.

## Local

Paid patches live in upstream forks, not in this tree. Clone the upstream repo, run its own `bun test` / `bun run format`.
