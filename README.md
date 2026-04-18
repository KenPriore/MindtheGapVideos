# Handoff: Mind the Gap — Animated Video Intro

## Overview

An animated video intro (~105s full / ~45s teaser) for the blog post **"Mind the gap: AI capability vs. legal adoption"** and its companion interactive site (mindthegap.kenpriore.com). Designed for social sharing (LinkedIn/Twitter), silent read-along (no narration), and embed/screen-capture export.

The narrative arc:
1. Anthropic's labor market study maps AI exposure across occupations
2. Legal scores ~7/10 — the largest gap between capability and adoption
3. But "legal" isn't one job — it's 12 distinct in-house roles
4. Spotlight 5 of those roles, each with a different shape across all 12 job axes
5. Explore supporting concepts: 7 modes of work, process intelligence, fluency gap, entry-level pipeline collapse
6. CTA → mindthegap.kenpriore.com

## About the Design Files

The files in `source/` are **design references** created in HTML + React (via Babel) + custom animation runtime. They are prototypes showing the intended look, timing, and motion — **not production code to copy verbatim**.

The goal is to **recreate this video in the target environment**. Because this is a timed animated video (not an interactive UI), the recommended path is:

- **Option A — Motion design tool:** Rebuild in After Effects / Rive / Lottie / Motion-One / GSAP. Use the HTML source as the reference spec for scene layouts, timing, easings, and typography. This is the cleanest production path for a social-share video.
- **Option B — Keep as HTML video:** Host the bundled HTML as-is and screen-record to MP4 for LinkedIn/Twitter. The `Mind the Gap - Teaser Export.html` is already configured for clean recording (no UI chrome, countdown, auto-play).
- **Option C — Framework port:** Rebuild as a React/Remotion project. Remotion is a near-1:1 match for the primitives used here (Sprite ≈ Sequence, useSprite ≈ useCurrentFrame). Would be the smallest lift.

## Fidelity

**High-fidelity.** Final colors, typography, scene structure, timing, and easing are all locked. Exact values are documented below.

## Visual System

### Brand direction
Swiss International Style — declarative, black/white/paper, single accent (red by default), heavy uppercase Helvetica headlines, aggressive negative letter-spacing on display type, monospace for numeric/meta data, thin rules, rigid grid. Every scene shares a consistent "Chrome" header with three cells (brand/title/time) and a bottom footer (byline + timecode).

### Canvas
- **Dimensions:** 1920 × 1080 (16:9)
- **Background behind canvas:** `#000000` (letterboxing in the Stage wrapper)
- **Scene backgrounds:** mostly `#FFFFFF` (paper: `#FAFAF7`) or `#000000` with white type for contrast scenes

### Color tokens
```
white:   #FFFFFF
black:   #000000
red:     #FF0000   (default accent — tweakable at runtime)
blue:    #0057B8
paper:   #FAFAF7
dimBlack:#111111

Role accent colors (also used as per-role "rail" color):
  #0057B8   Employment/HR, Corporate, Legal Engineer     (blue)
  #6A1B9A   IP/Patent, Privacy                           (purple)
  #333333   Litigation, GC/CLO                           (near-black)
  #D35400   Product Counsel, Regulatory, AI Gov Lead     (orange)
  #2E7D32   Commercial, Policy                           (green)
```

### Typography
```
Family:  "Helvetica Neue", Helvetica, Arial, sans-serif
Mono:    ui-monospace, SFMono-Regular, monospace  (for timecodes + numeric meta)

Display headline:  280px / 900 weight / line-height 0.82 / letter-spacing -0.05em / UPPERCASE
                   (scales down to 130-180px for scene headings)
Section headline:  92-150px / 900 / 0.92 / -0.035em / UPPERCASE
Subhead / body:    24-44px / 300 weight / 1.2-1.35 line-height / -0.01 to -0.02em
Micro label:       11-14px / 900 / tracking 0.25-0.3em / UPPERCASE (eyebrows, chrome, legends)
Numeric:           monospace for timecodes; Helvetica 900 for callout numbers
```

### Layout grid
- Margin: **120px** left / right on most scenes
- Top chrome band: **y ≈ 40–100px**, height ~60px with a 1px horizontal rule beneath at y=100
- Bottom footer band: **bottom: 80px** padding from canvas edge
- Content area: ~120–1800 x / 120–980 y
- Rails (role spotlights): **120px wide** vertical color band at left: 120px

### Motion language
- All animations driven by a single timeline. Scenes declare a `[start, duration]` window and fade in based on `localTime` inside that window.
- **Easings** (from `animations.jsx` Easing map):
  - `easeOutCubic` for most entry animations
  - `easeInOutCubic` for cross-scene transitions
  - Linear for continuous pans / ticks
- **Entry pattern** per scene:
  1. Eyebrow label fades in (0.0 – 0.7s)
  2. Display headline rises + fades (0.3 – 1.0s, translateY: 20–40px → 0)
  3. Supporting viz/chart animates in (0.6 – 2.0s, scale 0.94→1 + opacity 0→1)
  4. Callouts / annotations (2.6 – 4.0s)
  5. Caption or body text (4.0 – 5.0s)
- Scene crossfade: 150–200ms via Sprite's built-in fade window

## Scene-by-Scene Breakdown (Full Video, 105s)

The timeline uses `T[name] = [start, duration]` seconds on a 105s total.

### 01 · Title (0–5s)
- **Background:** white
- **Chrome label:** "A video intro · 01 / 14"
- **Composition:**
  - Massive "MIND / THE / GAP." stacked uppercase at 280px, left: 120px, top: 180px
  - Lines reveal one at a time (0.0 / 0.25 / 0.5s offsets), each translateY 80→0 + opacity
  - "GAP." uses accent color (red)
  - Subtitle: "Twelve roles, twelve gaps." at 28px italic weight 700, bottom-left
  - Byline strip at bottom-right with Ken Priore · date

### 02 · Premise (5–10s)
- **Background:** black, white text
- **Chrome label:** "02 · Anthropic premise" (white variant)
- Lead line: "Anthropic mapped AI exposure across **22 occupational categories**."
- Key number: large "22" in red
- Meta strip: dataset name + date

### 03 · Radar hero (10–17s)
- **Background:** `#FAFAF7` paper
- **Chrome label:** "03 · The headline chart"
- **Left column (120–540px wide):**
  - Eyebrow: "Anthropic · Economic Index · Fig 01" (14px/900/tracking 0.3em)
  - Stacked headline: "Theoretical **capability** vs. observed **usage**." ("capability" in blue, "usage" in red) 72px/900/0.92/-0.035em
  - Supporting copy: 18px/400/0.65 opacity — the outlier framing
  - Bottom cell: "→ That outlier" micro label + "Legal." at 56px/900 in red
- **Right column (620–1800 x, 120–980 y):**
  - The Anthropic radar image (`assets/anthropic-radar.png`, 1000×920) centered with objectFit: contain
  - Pan-in: scale 0.94→1.02 + opacity over 2s
  - **Legal callout ring:** red 3px circle, 140×140px, positioned at left: 74%, top: 56% of container (translate(-50%, -50%)). Fade + scale in from 0.5→1.0 at t=2.6–3.3s
  - **Legal label:** "Legal ↓" text, 22px/900/tracking 0.25em/red, positioned at left: 74%, top: 40% (centered). Fade + rise from translateY(-20→0) at t=3.2–3.9s

### 04 · 7 out of 10 (17–22s)
- **Background:** black, white text
- **Chrome label:** "04 · The headline number" (white)
- Giant "7/10" composition
- Supporting: "Legal's score on the Anthropic exposure index."
- Red highlight on "7"

### 05 · Chart evidence (22–28s)
- **Background:** white/paper
- **Chrome label:** "05 · Fig 02 — Capability vs. Adoption"
- Figure card with grayscaled radar image + annotated Legal circle (180×180, `left: 70%, top: 48%`)
- Stat: "Capability ~68%, Adoption ~12%, Gap 56 pts"
- Label: "Legal →" at left: 88%, top: 40% (red)

### 06 · Not one job (28–33s)
- **Background:** black
- **Chrome label:** "06 · The reframe" (white)
- Punch line: "But legal isn't one job. It's twelve."

### 07 · 12 Roles grid (33–40s)
- **Background:** white
- **Chrome label:** "07 · Fig 03 — Twelve in-house roles"
- 12-cell grid (4 cols × 3 rows) listing every role with:
  - Role color chip (10×10 square)
  - Numeric index (01–12)
  - Role name (22px/900 uppercase)
- Each cell fades in with staggered delay

### 08 · Role Spotlights (40–70s, 6s each × 5 roles)
5 consecutive sub-scenes, each 6s long, each spotlighting one role:
  1. Employment / HR (40–46)
  2. Corporate / Sec (46–52)
  3. Litigation (52–58)
  4. Commercial (58–64)
  5. Privacy / Data (64–70)

**Each spotlight layout:**
- **Chrome label:** "Spotlight 0N / 05 — {Role name}"
- **Left rail (120px wide, top 100 to bottom 100):** filled with `role.color`, vertical "Role · 0N" text rotated 180°
- **Left content column (300 → 1060 x, 160 → 940 y):**
  - Eyebrow: "Tension · {role.tension}" (14px/900/tracking 0.3em, in role.color)
  - Role name 110–130px/900/0.82/-0.05em UPPERCASE
  - Body note 44px/300/1.2/-0.02em (syncs with radar fade-in at t=0.9s, translateY 16→0)
  - Bottom strip (border-top 1px black, paddingTop 14px, grid 3 cols):
    - Capability: 44px/900 blue, counting up with easeOutCubic
    - Adoption: 44px/900 red, counting up
    - Gap: 44px/900 role.color (fades in at t=3.4s)
- **Right column (right: 120, width 620, 140 → 960 y):**
  - Small header: "Fig · Role shape" + "12 jobs · {Role} highlighted" (12px/900/tracking 0.3em)
  - 12-axis **radar SVG** (see spec below) in a 1px bordered paper card
  - Legend strip: blue square + "Capability" / red square + "Adoption" / right-aligned "Polygon area = practical fit"

**12-axis radar spec (`RoleRadar` in scenes.jsx ~L446):**
- viewBox 520×520, radius = size/2 − 95
- 12 equally-spaced spokes starting at -π/2 (top) going clockwise
- Concentric polygon grid at 20/40/60/80/100 (outer ring 1.5px black 0.45 opacity, inner rings 1px black 0.10)
- 12 spokes (1px black 0.12; spotlighted spoke uses role.color at 2px/0.9)
- **Capability polygon:** blue (#0057B8), fill 0.15, stroke 2.5px (vertices = each role's `cap` value)
- **Adoption polygon:** red (#FF0000), fill 0.25, stroke 2.5px (vertices = each role's `adopt` value)
- Vertex dots: 3px radius normally, 6px + 2px white stroke for spotlighted role
- Axis labels at radius 118: 11px normally, 13px bold + role.color for spotlighted
- Two concentric highlight rings on spotlighted spoke (r=14 at 0.6 opacity, r=22 at 0.3 opacity)

### 09 · Seven Modes (70–77s)
- **Chrome label:** "08 · Fig 04 — Seven modes of legal work"
- Bar chart / list of 7 modes with capability values:
  - Operate 28 · Counsel 18 · Strategize 11 · Negotiate 14 · Argue 9 · Teach 8 · Govern 12
- Caption: "Every role mixes all seven."

### 10 · Process Intelligence (77–83s)
- **Chrome label:** "09 · The process intelligence gap"
- Side-by-side cards:
  - "What models learn" → "Draft an NDA. Summarize a brief. Flag a clause." (44px/900)
  - "What in-house actually does" → "Know which VP to call. When to escalate. What the board won't accept." (44px/900)

### 11 · Fluency Gap (83–89s)
- **Chrome label:** "10 · Fig 05 — The fluency gap" (white)
- Big stat: Databricks OfficeQA benchmark — models score 77% on generic tasks, 16% on real job tasks
- Punch: "A 61-point drop when the test becomes **your actual job.**" (red italic on "your actual job")

### 12 · Pipeline (89–95s)
- **Chrome label:** "11 · Fig 06 — The pipeline problem"
- Line chart: junior associate hiring index declining
- Headline: "The **first rung** is disappearing." (red on "first rung")
- Bottom strip (2-col):
  - "AI does the work that juniors used to learn on."
  - "In ten years, who supervises the AI?" (red italic, 24px/700)

### 13 · Takeaway (95–100s)
- **Chrome label:** "12 · The pattern" (white)
- Dark scene with summary statement

### 14 · CTA (100–105s)
- **Background:** white
- **Chrome label:** "End · 14 / 14"
- "Visit" eyebrow (14px/900/tracking 0.3em/0.5 opacity)
- URL: `mindthegap.kenpriore.com` at 68px/900/0.98/-0.03em — "mindthegap" in red, ".kenpriore.com" in black
- Byline below a 1px rule

## Teaser Variant (45s)

`Mind the Gap - Teaser Export.html` is a condensed 45s cut designed for clean screen recording:
- No scrubber, no Stage chrome, no drop shadow
- Countdown: 3-2-1 before play
- Auto-plays once, stops on last frame
- Keyboard: R (restart), Space (start/pause), H (hide panel)
- Composition picks a subset of scenes — title, premise, radar, not-one-job, 3 spotlights, CTA

Rework either selection in `scenes.jsx` → `Video` component (it exports all scene components individually for remixing).

## Data

### 12 roles (all used as radar axes, 5 featured in spotlights)
```js
[
  { id: 'emp',  name: 'Employment / HR',    cap: 68, adopt: 34, tension: 'Volume vs. Sensitivity',   color: '#0057B8' },
  { id: 'ip',   name: 'IP / Patent',        cap: 74, adopt: 31, tension: 'Precision vs. Speed',      color: '#6A1B9A' },
  { id: 'corp', name: 'Corporate / Sec',    cap: 72, adopt: 44, tension: 'Compliance vs. Agility',   color: '#0057B8' },
  { id: 'lit',  name: 'Litigation',         cap: 58, adopt: 22, tension: 'Risk vs. Cost',            color: '#333333' },
  { id: 'prod', name: 'Product Counsel',    cap: 65, adopt: 17, tension: 'Innovation vs. Safety',    color: '#D35400' },
  { id: 'com',  name: 'Commercial',         cap: 78, adopt: 40, tension: 'Velocity vs. Protection',  color: '#2E7D32' },
  { id: 'priv', name: 'Privacy / Data',     cap: 70, adopt: 20, tension: 'Trust vs. Utility',        color: '#6A1B9A' },
  { id: 'reg',  name: 'Reg / Compliance',   cap: 75, adopt: 25, tension: 'Rules vs. Reality',        color: '#D35400' },
  { id: 'pol',  name: 'Policy / Gov Aff',   cap: 58, adopt: 12, tension: 'Influence vs. Impact',     color: '#2E7D32' },
  { id: 'gc',   name: 'GC / CLO',           cap: 55, adopt: 15, tension: 'Strategy vs. Crisis',      color: '#333333' },
  { id: 'eng',  name: 'Legal Engineer',     cap: 62, adopt: 18, tension: 'Process vs. Practice',     color: '#0057B8' },
  { id: 'aig',  name: 'AI Gov Lead',        cap: 48, adopt: 10, tension: 'Governance vs. Growth',    color: '#D35400' },
]
```

Spotlight order: `['emp', 'corp', 'lit', 'com', 'priv']`.

Body notes for spotlights are in `scenes.jsx` under `SPOT_NOTES` — pull exactly as-is, they're copy-locked.

### 7 modes of work
```
Operate, Counsel, Strategize, Negotiate, Argue, Teach, Govern
```
(Used in the modes scene only — NOT as radar axes.)

## Design Tokens (copy-paste)

```css
/* Colors */
--mg-white:   #FFFFFF;
--mg-black:   #000000;
--mg-paper:   #FAFAF7;
--mg-red:     #FF0000;
--mg-blue:    #0057B8;
--mg-purple:  #6A1B9A;
--mg-orange:  #D35400;
--mg-green:   #2E7D32;
--mg-ink:     #111111;

/* Type scale */
--mg-display:  280px;
--mg-section:  130px;
--mg-hero:     92px;
--mg-sub:      44px;
--mg-body:     24px;
--mg-meta:     18px;
--mg-micro:    14px;
--mg-nano:     11px;

/* Spacing */
--mg-margin:   120px;
--mg-rail:     120px;
--mg-gutter:   40px;

/* Motion */
--mg-ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);  /* easeOutCubic */
--mg-ease-io:  cubic-bezier(0.645, 0.045, 0.355, 1); /* easeInOutCubic */
```

## Interactions & Behavior

The full-video version (`Mind the Gap - Video.html`) exposes a **Tweaks panel** via `window.postMessage` protocol (custom to this design environment; not relevant for production port). Drop it. Keep only:

**Teaser (for recording):**
- Countdown → auto-play
- Keyboard: R restart, Space start/toggle, H hide chrome
- Ends on final frame, no loop

**Full video:** Simple scrub bar + play/pause. Optionally save `currentTime` to localStorage and rehydrate on load.

## State Management

- Single `time` state (seconds) driven by requestAnimationFrame at 60fps
- Scene visibility derived from `(time >= start && time <= start + duration)`
- No per-scene mutable state — everything is a pure function of `localTime = time - sprite.start`
- Persist `time` to localStorage for refresh recovery (optional)

## Assets

- **`source/assets/anthropic-radar.png`** (1000×920): the Anthropic Economic Index radar chart. Used in scene 03 (hero) and scene 05 (grayscaled inside a figure card). This is Anthropic's published chart — verify licensing for your distribution context.
- **No icon set, no logos beyond Ken Priore byline text.** Keep it type-only.

## Files in `source/`

- `Mind the Gap - Video.html` — full 105s video entry point (React + Babel, loads `animations.jsx` + `scenes.jsx`)
- `Mind the Gap - Teaser Export.html` — 45s clean-recording variant
- `scenes.jsx` — all scene components, timing table `T`, role data, `RoleRadar` SVG, chrome helpers, `Video` root composition
- `animations.jsx` — the `Stage` + `Sprite` + `useTime` + `useSprite` + `Easing` runtime (timeline engine, resize scaling, scrubber). ~677 lines. A Remotion port is straightforward; each `<Sprite start end>` maps to a `<Sequence from durationInFrames>`.
- `assets/anthropic-radar.png` — hero chart image
- `uploads/mind-the-gap-ai-capability-legal-adoption-VOICED.md` — source blog post for copy reference

## Recommended Port Path

For social video delivery, I'd pick one of:

1. **Remotion** (React → MP4): nearly 1:1 port. `<Sequence>` = `<Sprite>`, `useCurrentFrame()` = `useTime()`, all the styling/layout transfers as-is. Render to H.264 MP4 via `remotion render`. Clean, programmatic, diffable.
2. **After Effects** (re-author): hand the README to a motion designer with the HTML as reference. Cleanest visual result, slowest iteration.
3. **Keep as HTML + screen record**: use `Mind the Gap - Teaser Export.html`, record the iframe area at 1920×1080 with QuickTime/OBS, export as MP4.

## Open Questions / Gotchas

- The Tweaks panel in the full video lets you swap accent color at runtime. The production video should pick one final accent (default red) and remove the protocol.
- Scene 05 and scene 03 both reuse the same radar PNG with different annotations. If re-authoring in AE, render the radar chart as a vector (SVG) instead of raster for crisp scaling.
- All copy is English-only and scaled for wide viewports. Localization would require a pass on the 280px display type — letter-spacing will need adjustment per language.
- No audio track. If you add one, scenes are currently paced for silent reading; narration will require stretching ~30–40% of scenes.
