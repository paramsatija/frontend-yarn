# YARN Protocol — Typography System

## Philosophy

The typography system creates tension between two worlds: the **institutional authority** of high finance (represented by Instrument Serif) and the **technical precision** of terminal interfaces (represented by IBM Plex Mono). Every typographic decision reinforces that YARN Protocol is both a refined institutional platform and serious mission-critical infrastructure.

The serif handles display and emotional weight. The monospace handles everything functional — navigation, data, body copy, labels. The pairing creates a visual hierarchy that is unmistakably premium and unmistakably technical.

---

## Typeface Selection

### Primary Display: Instrument Serif

A contemporary serif typeface designed for editorial and display use. Its high contrast, sharp terminals, and slightly condensed proportions give it an authoritative, editorial gravitas that evokes Bloomberg Terminal seriousness and Palantir-level refinement.

**Why this font:**
- The thin strokes and sharp serifs create elegance at large sizes
- The moderate contrast feels modern, not old-fashioned
- The slightly condensed width maximizes impact in tight spaces
- The italic is genuinely beautiful (used sparingly for emphasis)

**Usage:** All headlines, hero text, display quotes, section titles.

**Weights used:** 400 (Regular) only. The display typography achieves hierarchy through size, not weight variation.

**Fallback stack:** `'Instrument Serif', Georgia, 'Times New Roman', serif`

**Loading:** Google Fonts with `font-display: swap`.

### Primary Functional: IBM Plex Mono

A comprehensive open-source typeface family designed by IBM. The monospace variant provides the utilitarian, data-driven aesthetic that defines terminal interfaces, code editors, and institutional dashboards.

**Why this font:**
- True monospace with excellent legibility at small sizes
- Comprehensive character set including technical symbols
- Five weights (200-600) for functional hierarchy
- Open Source (OFL) — no licensing concerns
- Designed for screen use — excellent hinting

**Usage:** Navigation, body copy, captions, data labels, buttons, code blocks, ticker text, metrics.

**Weights used:**
- 400 (Regular) — body, descriptions, labels
- 500 (Medium) — headings, emphasized text, nav links

**Fallback stack:** `'IBM Plex Mono', 'SF Mono', 'Fira Code', 'Consolas', 'Liberation Mono', monospace`

**Loading:** Google Fonts with `font-display: swap`.

---

## Type Scale

The scale uses a fluid approach — clamping between mobile and desktop values to maintain proportional relationships across breakpoints.

### Display Scale (Instrument Serif)

| Token | Mobile | Desktop | Line Height | Tracking | Usage |
|---|---|---|---|---|---|
| **Display XL** | 48px | 120px | 0.95 | -0.02em | Hero headline |
| **Display L** | 40px | 80px | 1.0 | -0.015em | Section headlines |
| **Display M** | 32px | 48px | 1.05 | -0.01em | Sub-section titles |

### Functional Scale (IBM Plex Mono)

| Token | Mobile | Desktop | Line Height | Tracking | Weight | Usage |
|---|---|---|---|---|---|---|
| **Heading M** | 20px | 32px | 1.3 | 0.02em | 500 | Card titles, feature names |
| **Heading S** | 16px | 20px | 1.4 | 0.01em | 500 | Sub-headings, labels |
| **Body** | 12px | 16px | 1.6 | 0.01em | 400 | Paragraphs, descriptions |
| **Body Small** | 11px | 14px | 1.5 | 0.02em | 400 | Secondary copy, captions |
| **Caption** | 9px | 11px | 1.4 | 0.05em | 400 | Metadata, tags, data labels |
| **Nav** | 12px | 12px | 1.0 | 0.08em | 400 | Navigation links |
| **Data** | 14px | 14px | 1.0 | 0.04em | 400 | Numbers, metrics, code |
| **Button** | 11px | 12px | 1.0 | 0.10em | 500 | CTA buttons |

### Tracking Philosophy

Tracking (letter-spacing) follows an inverse relationship with size:

- **Large text (Display):** Negative tracking (-0.01em to -0.02em) for tighter, more impactful headlines
- **Medium text (Headings):** Slight positive tracking (0.01em to 0.02em) for readability
- **Small text (Captions):** Aggressive positive tracking (0.05em to 0.10em) for scannability

This creates a natural rhythm: big text breathes inward, small text breathes outward.

---

## Typographic Patterns

### Hero Headline

```
Font: Instrument Serif
Size: Display XL (48px / 120px)
Color: #ffffff
Line Height: 0.95
Tracking: -0.02em
Position: Bottom-left of hero (not centered — asymmetric tension)
Max Width: 900px
```

The hero headline uses the CRT text decrypt effect — characters cycle through random symbols in neon green before locking into white. This is the most dramatic typographic moment on the site.

### Section Headlines

```
Font: Instrument Serif
Size: Display L (40px / 80px)
Color: #ffffff
Line Height: 1.0
Tracking: -0.015em
```

Section headlines also use the decrypt effect, triggered on scroll entry via IntersectionObserver. The reveal creates a rhythm of discovery as users scroll.

### Eyebrow Labels

```
Font: IBM Plex Mono
Size: Caption (9px / 11px)
Color: #ccff00 (Neon Green)
Tracking: 0.12em
Text Transform: Uppercase
Margin Bottom: 16-24px
```

Eyebrows serve as section identifiers — "THE PLATFORM", "EVIDENCE ENGINE", "THE ECOSYSTEM". The neon green color and extreme tracking make them instantly scannable.

### Body Copy

```
Font: IBM Plex Mono
Size: Body (12px / 16px)
Color: rgba(255, 255, 255, 0.6)
Line Height: 1.6
Max Width: 480-560px
```

Body copy is intentionally muted (60% white) to create clear hierarchy against headlines. The monospace font at body size creates a "reading a classified document" feeling. Max width prevents lines from exceeding ~75 characters for optimal readability.

### Data & Metrics

```
Font: IBM Plex Mono
Size: Data (14px)
Color: #ccff00 (Neon Green) for values
Color: rgba(255, 255, 255, 0.35) for labels
Tracking: 0.04em
Text Transform: Uppercase
```

Metrics are presented as label-value pairs. The neon green values against muted labels create instant visual hierarchy. Monospace ensures numbers align perfectly in columns.

### Navigation

```
Font: IBM Plex Mono
Size: Nav (12px)
Color: rgba(255, 255, 255, 0.6) default
Color: #ffffff on active/current page
Tracking: 0.08em
Text Transform: Uppercase
```

Nav links use aggressive tracking (0.08em) to compensate for the small size. The scramble-on-hover effect briefly disrupts the text with neon green characters before resolving.

### Buttons

```
Font: IBM Plex Mono
Size: Button (11px / 12px)
Tracking: 0.10em
Text Transform: Uppercase
Weight: 500
```

The extreme tracking on buttons (0.10em) makes small uppercase text feel intentional and premium. This is the most aggressively tracked text on the site — buttons must feel like commands, not sentences.

### Code Blocks

```
Font: IBM Plex Mono
Size: Body Small (11px / 14px)
Line Height: 1.6
Background: #1a1a1a
Border: 1px solid rgba(255, 255, 255, 0.06)
```

Code uses the same IBM Plex Mono but with syntax highlighting. The monospace ensures perfect alignment of indented code blocks.

### Ticker

```
Font: IBM Plex Mono
Size: Caption (9px / 11px)
Color: rgba(255, 255, 255, 0.35)
Animation: Continuous horizontal scroll at 40px/s
```

The ticker is the most ambient typographic element — barely visible, continuously moving, creating background energy.

---

## Typographic Hierarchy in Practice

### Example: Homepage Hero

```
[Eyebrow: none in hero — the decrypt headline IS the identity]

Institutional        ← Display XL, Instrument Serif, #ffffff
Intelligence,        ← CRT decrypt: chars cycle #ccff00 → #ffffff
Decentralized.

The verified data    ← Body, IBM Plex Mono, rgba(255,255,255,0.6)
layer powering
capital markets...

[EXPLORE ECOSYSTEM]  ← Button, IBM Plex Mono, #ccff00 bg
[READ DOCUMENTATION] ← Button outline, IBM Plex Mono, transparent

BTC/USD $67,231.04   ← Ticker, Caption, rgba(255,255,255,0.35)
| ETH/USD $3,412.88
| YARN Network: 2,847 Active Nodes...
```

### Example: Section Header

```
THE ECOSYSTEM         ← Eyebrow, Caption, #ccff00, 0.12em tracking

One Intelligence      ← Display L, Instrument Serif, #ffffff
Platform. Infinite
Possibilities.
```

### Example: Metric Card

```
17,421                ← Data, 14px, #ccff00
EVIDENCE GENERATED    ← Caption, 9px, rgba(255,255,255,0.35)
  TODAY               ← Caption, 9px, rgba(255,255,255,0.35)

● LIVE                ← Caption, 9px, with pulse dot
```

---

## Special Effects & Typography

### CRT Text Decrypt

The signature typographic effect. Applied to all major headlines.

**Mechanism:**
1. Text starts as random characters (neon green: `#ccff00`)
2. Each "cycle" (every 38ms), one more character resolves to its final form (white: `#ffffff`)
3. After ~4 seconds (for 45-char headline), all characters resolved
4. Living text mode: random letters periodically flicker and glow

**CSS for resolved characters:**
```css
/* During decrypt */
.unresolved-char {
  color: #ccff00;
  text-shadow: none;
}

.resolved-char {
  color: #ffffff;
  text-shadow: 0 0 8px #ffffff;
}

/* Living text flicker */
.decrypt-flicker {
  display: inline-block;
  animation: decryptFlicker 0.08s ease-in-out;
}

@keyframes decryptFlicker {
  0% { opacity: 1; text-shadow: 0 0 16px rgba(204,255,0,0.9); }
  50% { opacity: 0.85; text-shadow: 0 0 24px rgba(204,255,0,1); }
  100% { opacity: 1; text-shadow: 0 0 16px rgba(204,255,0,0.9); }
}
```

### Phosphor Glow Fade

After a character resolves during decrypt, it briefly glows:

```css
.decrypt-glow {
  text-shadow: 0 0 10px rgba(204, 255, 0, 0.6);
  animation: phosphorFade 1.5s ease-out forwards;
}

@keyframes phosphorFade {
  0% { text-shadow: 0 0 15px rgba(204, 255, 0, 0.8); }
  100% { text-shadow: 0 0 5px rgba(204, 255, 0, 0); }
}
```

### Nav Scramble

On hover, nav link letters scramble for 100ms:

```
Hover:     "Platform"
Frame 1:   "P1@tF0rm"  (20ms)
Frame 2:   "Pl#tF8rm"  (20ms)
Frame 3:   "PlaTF$rm"  (20ms)
Frame 4:   "PlatF0rm"  (20ms)
Frame 5:   "Platform"  (20ms)
```

Scrambling characters appear in `#ccff00` (neon green) before snapping to final color.

---

## Responsive Behavior

### Mobile (< 768px)

| Element | Change |
|---|---|
| Display XL | 48px (clamped minimum) |
| Display L | 40px |
| Body | 12px |
| Line heights | +0.1 for readability |
| Nav | Collapse to hamburger |
| Ticker | Same size, slower scroll |
| Code blocks | Horizontal scroll |

### Tablet (768-1024px)

| Element | Change |
|---|---|
| Display XL | ~80px (clamped mid) |
| Display L | ~56px |
| Two-column layouts | Activate |
| Bento grid | 2 columns |

### Desktop (1024-1400px)

| Element | Change |
|---|---|
| Display XL | ~100px |
| Display L | ~72px |
| Full layouts | All features active |
| Bento grid | 12-column |

### Wide (> 1400px)

| Element | Change |
|---|---|
| Display XL | 120px (maximum) |
| Content | Centered with max-width: 1400px |
| Spacing | Full desktop spacing |

---

## Font Loading Strategy

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Critical:** `display=swap` prevents FOIT (Flash of Invisible Text). The browser shows fallback fonts immediately, then swaps when the custom fonts load. This is essential for a site where monospace text dominates — FOIT would leave the page blank for seconds.

**Preconnect:** The `preconnect` hints establish early connections to Google Fonts servers, reducing load time by ~100-200ms.

---

## Anti-Patterns (What NOT to Do)

1. **Never use Instrument Serif below 32px** — it loses its impact and becomes hard to read
2. **Never use IBM Plex Mono for large display text** — it looks like a mistake, not a design choice
3. **Never center hero text** — the asymmetric bottom-left placement is intentional
4. **Never use colors other than white for body text** — the 60% white is the only body color
5. **Never use rounded corners on cards** — 0px radius is the terminal aesthetic
6. **Never use font-weight 700** — the system achieves hierarchy through size and color, not boldness
7. **Never mix other fonts** — the two-font system is complete; adding a third breaks the tension

---

## Implementation Reference

### Tailwind Configuration

```javascript
fontFamily: {
  display: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
  mono: ['IBM Plex Mono', 'SF Mono', 'Fira Code', 'monospace'],
},
fontSize: {
  'display-xl': ['clamp(48px, 8vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
  'display-l': ['clamp(40px, 5vw, 80px)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
  'heading-m': ['clamp(20px, 2vw, 32px)', { lineHeight: '1.3', letterSpacing: '0.02em' }],
  'heading-s': ['clamp(16px, 1.5vw, 20px)', { lineHeight: '1.4', letterSpacing: '0.01em' }],
  'body': ['clamp(12px, 1.2vw, 16px)', { lineHeight: '1.6', letterSpacing: '0.01em' }],
  'body-small': ['clamp(11px, 1vw, 14px)', { lineHeight: '1.5', letterSpacing: '0.02em' }],
  'caption': ['clamp(9px, 0.8vw, 11px)', { lineHeight: '1.4', letterSpacing: '0.05em' }],
  'data': ['14px', { lineHeight: '1.0', letterSpacing: '0.04em' }],
},
```

### CSS Custom Properties

```css
:root {
  --font-display: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  --font-mono: 'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace;

  --text-display-xl: clamp(48px, 8vw, 120px);
  --text-display-l: clamp(40px, 5vw, 80px);
  --text-heading-m: clamp(20px, 2vw, 32px);
  --text-heading-s: clamp(16px, 1.5vw, 20px);
  --text-body: clamp(12px, 1.2vw, 16px);
  --text-body-small: clamp(11px, 1vw, 14px);
  --text-caption: clamp(9px, 0.8vw, 11px);
}
```

---

*Document Version: 1.0*
*Last Updated: July 14, 2025*
