# YARN Protocol — Design System

## Overview

YARN Protocol's visual identity fuses the authoritative gravitas of Bloomberg Terminal with the refined minimalism of Palantir — dark, confident, and quietly aggressive. The design thesis is **"precision infrastructure"**: every element communicates that this is serious technology for serious institutions.

The site feels less like a marketing page and more like accessing a terminal into the backbone of global finance. Three distinct motion systems anchor the experience: a deep-space starfield that warps into hyperspace on scroll, an interactive neon-green network visualization, and a CRT text-decrypt system that makes every headline feel like classified intelligence being decoded in real time.

---

## Design Tokens

### Colors

The palette is rooted in near-black surfaces with a single electric accent. The neon green is used sparingly but aggressively — for data highlights, interactive states, and the WebGL distortion. Never for large fills.

| Token | Hex | Usage |
|---|---|---|
| **Base Dark** | `#0a0a0a` | Primary background, hero, nav |
| **Surface Dark** | `#141414` | Card backgrounds, elevated sections |
| **Surface Elevated** | `#1a1a1a` | Hover states, dropdowns, code blocks |
| **Border Subtle** | `rgba(255,255,255,0.06)` | Dividers, 1px rules, card borders |
| **Border Active** | `rgba(255,255,255,0.12)` | Hover borders, focus rings |
| **Text Primary** | `#ffffff` | Headlines, primary copy |
| **Text Secondary** | `rgba(255,255,255,0.6)` | Body copy, descriptions |
| **Text Muted** | `rgba(255,255,255,0.35)` | Timestamps, metadata, disabled |
| **Neon Green** | `#ccff00` | Primary accent: CTAs, active states, data highlights |
| **Neon Green Dim** | `rgba(204,255,0,0.15)` | Subtle glow backgrounds |
| **Status Red** | `#ef4444` | Errors, offline indicators |
| **Status Green** | `#22c55e` | Success, online indicators |

### Ecosystem Accent Colors

Each domain page applies a subtle color tint. The base dark palette remains constant.

| Domain | Accent | Token |
|---|---|---|
| Capital Markets | `#00ff9d` | `--yarn-capital` |
| Legal Systems | `#ffb800` | `--yarn-legal` |
| Enterprise | `#a855f7` | `--yarn-enterprise` |
| Governance | `#ff6b35` | `--yarn-governance` |
| Treasury | `#00d4ff` | `--yarn-treasury` |
| AI Engine | `#ccff00` | `--yarn-ai` |

### Typography

The type system pairs an authoritative display serif with a utilitarian monospace — creating tension between institutional gravitas and technical precision.

| Role | Font | Size (Mobile/Desktop) | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| **Display XL** | Instrument Serif | 48px / 120px | 400 | 0.95 | -0.02em |
| **Display L** | Instrument Serif | 40px / 80px | 400 | 1.0 | -0.015em |
| **Heading M** | IBM Plex Mono | 20px / 32px | 500 | 1.3 | 0.02em |
| **Heading S** | IBM Plex Mono | 16px / 20px | 500 | 1.4 | 0.01em |
| **Body** | IBM Plex Mono | 12px / 16px | 400 | 1.6 | 0.01em |
| **Body Small** | IBM Plex Mono | 11px / 14px | 400 | 1.5 | 0.02em |
| **Caption** | IBM Plex Mono | 9px / 11px | 400 | 1.4 | 0.05em |
| **Data** | IBM Plex Mono | 14px | 400 | 1.0 | 0.04em |

**Font Stack:**
- Display: `'Instrument Serif', Georgia, 'Times New Roman', serif`
- Monospace: `'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace`

### Spacing

| Token | Value |
|---|---|
| Page Padding | 24px (mobile) / 48px (desktop) |
| Section Gap | 120px (mobile) / 200px (desktop) |
| Grid Gap | 1px (bento) / 24px (content) |
| Card Padding | 32px (mobile) / 48px (desktop) |
| Nav Height | 64px |
| Max Content Width | 1400px |

### Radii

| Element | Radius |
|---|---|
| Cards | 0px (sharp — terminal aesthetic) |
| Buttons | 2px (nearly square) |
| Inputs | 2px |
| Bento cells | 0px |

### Background Texture

All dark sections use a static grain overlay:
- 512x512px SVG noise texture at 3% opacity
- `background-repeat: repeat`
- `mix-blend-mode: overlay`
- `pointer-events: none`
- Applied site-wide via `.grain-overlay` class

---

## Global Interactions

### Smooth Scroll

Lenis smooth scroll: `lerp: 0.08`, `duration: 1.2`, `smoothWheel: true`. All scroll-triggered animations use Lenis's scroll position.

### CRT Text Decrypt Reveal

Applied to all major headlines. On element entry (IntersectionObserver, threshold 0.3), text cycles through random characters before resolving.

**Parameters:**
| Parameter | Value | Description |
|---|---|---|
| `cycleInterval` | **38ms** | Time between character updates |
| `cyclesPerCharacter` | **2** | Ticks before a character resolves |
| `maxCycles` | 15 | Hard cap to force completion |
| `finalTextColor` | `#ffffff` | Resolved character color |
| `unresolvedTextColor` | `#ccff00` | Cycling character color (neon green) |

**Result:** ~4 seconds for a 45-character headline.

**Phase 2 — Living Text (post-resolve):**
After the headline fully resolves, a subtle ongoing flicker activates:
- Every 3-5 seconds, 1-2 random letters briefly flash to a random character
- Neon green glow pulse (`text-shadow: 0 0 16px #ccff00`)
- Snaps back to original letter in 80-120ms
- Creates "living terminal" energy

### Nav Text Scramble on Hover

When hovering over any navigation link:
- Letters rapidly scramble through random characters
- ~5 frames at 20ms intervals (100ms total)
- Characters progressively resolve left-to-right
- Same neon green color for scrambling characters
- Applied to: all nav links, footer links, YARN logo

### Smooth Page Transitions

Fade-to-black transition between all pages:
1. User clicks nav link
2. Content fades out (`opacity: 0`, 350ms)
3. Black overlay fades in
4. Page navigates behind overlay
5. Scroll resets to top
6. Content fades in (`opacity: 1`, 350ms)

### Scroll-Triggered Entrances

All section content uses consistent entrance:
- Start: `opacity: 0`, `translateY(40px)`
- On viewport entry: `opacity: 1`, `translateY(0)`
- Duration: 0.7s, ease: `power3.out`
- Stagger for grouped elements: 0.1s between items

### Button Hover States

| Button Type | Idle | Hover |
|---|---|---|
| **Primary (Neon)** | `#ccff00` bg, `#0a0a0a` text | `brightness(1.1)`, `box-shadow: 0 0 20px rgba(204,255,0,0.3)` |
| **Outline** | `rgba(255,255,255,0.06)` border | Border → `rgba(255,255,255,0.12)`, text → white |
| **Text Link** | No underline | Underline slides in from left (`background-size: 0% → 100% 1px`) |

All transitions: 0.2s ease

---

## Core Effects

### 1. Hyperspace Starfield Warp

**Canvas:** Full-screen `<canvas>` element, 3000 star particles distributed in a cylindrical volume along Z-axis.

**Behavior:**
- Particles move toward camera (negative Z) each frame
- When particle passes camera, wraps to far end (Z -= 2000)
- Scroll accelerates Z-velocity: `normalZVel = 2`, `maxZVel = 15`
- Z-velocity lerps toward target with factor 0.05

**Mouse Parallax:**
- `normalizedMouseX = (clientX / width) * 2 - 1`
- `normalizedMouseY = -(clientY / height) * 2 + 1`
- `starGroup.rotation.y = lerp(current, mouseX * 0.05, 0.05)`
- `starGroup.rotation.x = lerp(current, mouseY * 0.05, 0.05)`

**Mobile:** Reduce to 1500 particles below 768px.

### 2. Network Visualization (Canvas 2D)

80x40 wireframe grid with Perlin-noise-inspired displacement.

**Per-vertex calculation:**
```
noise = sin(x * 0.5 + t) * cos(y * 0.3 + t * 0.7) * 0.5
      + sin(x * 0.8 - t * 0.5) * sin(y * 0.6 + t * 0.3) * 0.3
      + cos(x * 0.2 + y * 0.4 + t * 0.8) * 0.2

mouseInfluence = exp(-distToMouse * 0.003) * 30
z = noise * 15 + mouseInfluence * sin(t * 3 + dist * 0.01)
```

**Rendering:**
- Dots: `rgba(204, 255, 0, alpha * 0.6)` where `alpha = 0.3 + (z + 15) / 60`
- Lines between adjacent dots at `alpha * 0.15`
- Scanline overlay: horizontal lines every 3px at `rgba(0,0,0,0.08)`

### 3. Live Metrics Counters

Animated number counting from 0 to target value.
- Duration: 2000ms
- Easing: `easeOutCubic` (1 - (1 - progress)^3)
- Triggered by IntersectionObserver at threshold 0.2
- Numbers formatted with `toLocaleString()` for thousands separators

---

## Page Structure

### Homepage Sections (in order)

1. **Navigation** — Fixed 64px, blur on scroll
2. **Hero** — 100vh, starfield canvas, headline decrypt, CTAs, ticker
3. **Trust Logos** — 6 institutional names, horizontal layout
4. **Platform Overview** — Sticky left + scrollable domain cards
5. **Network Visualization** — 80vh, wireframe canvas, live stats
6. **Bento Ecosystem Grid** — 12-column grid, 6 themed cards with images
7. **Live Metrics Dashboard** — 8 animated counters with pulse indicators
8. **Evidence Engine** — Two-column: content + color-coded flow
9. **YRN Utility** — Pricing in YRN, transaction example
10. **Testimonials** — Horizontal scroll carousel, 6 cards
11. **Footer** — CTA, 5-column links, social, copyright

### Platform Page
- Hero with architecture points
- 5 domain sections (alternating backgrounds)
- Integration CTA

### Ecosystem Page
- Hero headline
- 6 ecosystem sections with generated images (alternating layouts)

### Developers Page
- Hero with search bar
- Code example with syntax highlighting
- SDK grid (4 languages)
- Documentation links grid

### Pricing Page
- Hero headline
- 3-tier pricing cards
- Interactive usage calculator (slider)
- YRN discount section

---

## Assets

| Asset | Type | Usage |
|---|---|---|
| Starfield | Procedural (Canvas) | Homepage hero background |
| Network Viz | Procedural (Canvas 2D) | Homepage network section |
| 6 Ecosystem Images | AI-generated (2K, 16:9) | Bento grid + ecosystem page |
| Grain Texture | SVG (512x512) | Site-wide overlay |
| Trust Logos | Text (Instrument Serif) | Trust section |
| Icons | Lucide React | All UI icons |

---

## Performance Guidelines

- Starfield: Pause animation loop when scrolled out of view
- Network viz: Initialize only when approaching viewport (`rootMargin: 200px`)
- Images: Lazy load below the fold
- Fonts: `font-display: swap` to prevent FOIT
- Bundle: Code-split per page

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Single column, reduced particles, simplified viz |
| Tablet | 768-1024px | 2-column grids, medium spacing |
| Desktop | 1024-1400px | Full layout, max spacing |
| Wide | > 1400px | Centered content, max-width container |

---

*Document Version: 2.0*
*Last Updated: July 14, 2025*
