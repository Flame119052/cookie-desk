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
- INR above ₹5000: ICICI Pockets NEFT (not UPI, not the Visa card number)
- No PayPal. Superteam USDC still works if a listing pays.

Active PRs include spicets#29, easyeda-converter#551, schematic-trace-solver#1098,
autorouter#2462–2464, core#3743/#3744/#3746/#3750–3764/#3766–3769,
circuit-json#766/#767/#768, docs#873–875, pcb-viewer#987/#990, props#832–834,
image-utils#42 (PNG alpha comparison), calculate-packing#131,
simple-3d-svg#79 (RBush polygon visibility culling for #38),
simple-3d-svg#80 (jscadObjects via jscad-planner for #2),
core#3774 (diode `variant` enum selects the matching schematic symbol),
core#3776 (pinheader schematic `port_arrangement` emits numeric pins for #3075),
3d-viewer#989 (panel CAD sits on the copper surface instead of the mesh midplane; #612),
solver-utils#41 (pipeline output queries ignore inherited Object keys; #40),
solver-utils#42 (download templates spread getConstructorParams tuples; #39),
3d-viewer#990 (JSCAD camera frames the panel, not the first child board; #584),
3d-viewer#991 (plated-hole copper paints above soldermask on board textures; circuit-json-to-gltf#72),
autorouter#2472 (`allowBlindAndBuriedVias: false` emits full-stack PTH vias; 0hmX #2156),
3d-viewer#992 (RGB X/Y/Z arrows on the top-left orientation cube; Seve #27),
solver-utils#45 (`tryFinalAcceptance` exceptions fail the solver like `_step`; #44),
pcb-viewer#990 (View → Move Footprints after #951 removed the toolbar button; #976),
circuit-json-to-lbrn#205 (bounds include board, holes, vias, pills, polygons; #181/#191/#193/#195),
schematic-trace-solver#1107 (isGround aliases like AGND/VSS, not only the name GND; 0hmX #747),
jscad-fiber#132 (Text component from vectorText cuboid strokes; Seve #21),
pcb-viewer#991 (Ctrl/Cmd+Z undoes the last dropped footprint move; #302),
jscad-electronics#341 (rotated/pill SMT pads and oval/polygon plated holes no longer throw in ExtrudedPads),
copper-pour-solver#90 (`hole_with_polygon_pad` plated holes become pour obstacles, including `ccw_rotation`),
implicit-copper-pour-solver#12 (`hole_with_polygon_pad` outlines are translated/rotated into board space),
circuit-json-to-dsn#15 (pill/polygon plated-hole pads emit DSN padstacks instead of throwing),
circuit-json-to-gltf#193 (rotated pill plated-hole drills cut as pills, not circles from `hole_diameter`),
circuit-json-to-footprinter#111 (`hole_with_polygon_pad` outlines and drill offsets honor `ccw_rotation`),
circuit-json-to-step#130 (pill/polygon/rect-pad plated holes cut STEP drills instead of leaving solid copper),
circuit-json-to-easyeda#1 (pcb_cutout circle/rect/polygon export as HOLE or SOLIDREGION cutouts),
kicad-to-circuit-json#186 (KiCad `(drill (offset …))` maps to plated-hole `hole_offset` and NPTH centers),
easyedats#7 (PCB RECT SVG uses layer/stroke fields instead of swapping them),
stepts#20 (STEP tokenizer no longer ends entities at `;` inside STRING values or `/* comments */`),
eval#4446 (`package.json` `exports` string shorthand and fallback arrays resolve instead of falling through to `index.js`),
circuit-json-to-geometry#3 (circle/rotated_rect/pill/polygon SMT pads emit copper; `hole_with_polygon_pad` local outlines honor `ccw_rotation`),
kicadts#70 (`kicad_sch` parses `bus`/`bus_entry` instead of throwing),
circuit-json-to-simple-3d#14 (UTF-8 base64 board-face SVG so Ω/CJK silkscreen no longer throws),
circuit-json-to-simple-route-json#1 (keepout `outline` and `layers: ["all"]` become autorouter obstacles; polygon pads honor `ccw_rotation`),
lbrnts#44 (`Shape Type="Polygon"` parses and renders instead of throwing),
gerberts#2 (explicit decimal Gerber coordinates like `X1.27Y0.635D03` parse as operations, not UnknownCommand),
pads-to-circuit-json#2 (closed PADS polygon keepouts emit `pcb_keepout` `shape: "outline"` instead of being dropped),
dsn-to-circuit-json#22 (DSN padstack polygons emit `pcb_smtpad` `shape: "polygon"` instead of a bounding-box rect),
gltf-slice#5 (`TRIANGLE_STRIP`/`TRIANGLE_FAN` meshes are sliced instead of cloned unsliced),
stack-svgs#1 (single-quoted SVG `id`/`href` attributes are namespaced when stacking),
infer-cable-insertion-point#8 (silkscreen rect/circle/line shells count toward insertion-side bounds).
core#3768 adds a `require` export so stale CJS registry packages can load core
(tscircuit/cli#3982). core#3769 sizes schematic boxes from displayed pin-label
text so imported chips like RP2040 do not overlap inner labels.
calculate-packing#131 enables Seve's skipped first-component rotation
regression (issue #43); pad sizes swap at 90°/270°.

Seve was emailed once about spicets#29. Do not send a second copy until he answers.
Never put a UPI VPA in public PRs.
