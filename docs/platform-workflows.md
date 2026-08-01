# YARN Protocol — Complete Platform Workflows

**Date:** July 14, 2025
**Scope:** End-to-end user journeys across all platform surfaces

---

## WORKFLOW 1: First-Time Visitor → Platform Explorer

### Trigger
User visits yarnprotocol.ai for the first time.

### Steps

**Step 1 — Hero Experience (0-10 seconds)**
- Full-viewport starfield canvas loads immediately
- Headline "Institutional Intelligence, Decentralized." decrypts character-by-character over ~4 seconds
- Neon green cycling characters resolve to white text with phosphor glow fade
- Subheadline and CTAs appear below
- Live ticker scrolls at bottom: BTC/USD, ETH/USD, active nodes, block height

**Step 2 — Trust Bar (scroll)**
- Six institutional names fade in: BlackRock, PwC, Deloitte, EY, KPMG, Morgan Stanley
- Sets institutional tone immediately

**Step 3 — Platform Overview (scroll)**
- Sticky left column: "Five Domains. One Verified Layer."
- Right column scrolls through 5 domain cards:
  - Capital Markets, Legal Systems, Enterprise, Governance, Treasury
- Each card: number, name, description, hover reveals accent color

**Step 4 — Network Visualization (scroll)**
- Full-section neon green wireframe canvas
- 80×40 grid undulating with Perlin noise
- Mouse interaction distorts the surface
- Three live stats: "2,847 ACTIVE NODES", "12ms AVG LATENCY", "99.999% UPTIME"

**Step 5 — Bento Ecosystem Grid (scroll)**
- Apple-style 12-column bento grid with 6 ecosystem cards
- Each card: themed accent color, AI-generated image on hover
- Cards: Capital, Legal, Enterprise, Governance, Treasury, AI
- Stats embedded: "2,400+ Price Feeds", "186K+ AI Decisions"

**Step 6 — Live Metrics (scroll)**
- 8 animated counters trigger on viewport entry
- Evidence Generated Today, Capital Jobs, Legal Evidence, Enterprise Workflows, Governance Decisions, Treasury Reconciliations, YRN Consumed, AI Decisions
- Each counter animates from 0 to final value over 2 seconds
- Green pulse dot: "LIVE" indicator

**Step 7 — Evidence Engine (scroll)**
- Two-column: explanation + color-coded flow diagram
- Flow: User → Action → Evidence → Collective Intelligence → Better Decisions → Improved Platform → Higher Quality Evidence
- Checkmarks: Verifiable, Immutable, AI-Processed, Continuously Improving

**Step 8 — Decision Point**
- User sees "Launch App" CTA (neon green button, nav bar, and footer)
- Or scrolls to testimonials and footer

**Exit Points:**
- Click "Launch App" → Workflow 2 (App Launcher)
- Click nav link → Static page (Platform, Ecosystem, Developers, Pricing)
- Leave without action

---

## WORKFLOW 2: App Launcher → Module Selection

### Trigger
User clicks "Launch App" from any page.

### Steps

**Step 1 — App Launcher Page Loads**
- Dark surface with 6 module tiles in a grid
- Each tile: icon, name, subtitle, status badge, accent color
- Animation: tiles stagger in from bottom (100ms delay each)

**Step 2 — Module Display**
- **Finance** (active — green top border, no lock icon)
  - "Finance · Portfolio Intelligence · Operational"
  - Neon green accent, clickable cursor
  - Hover: subtle green glow overlay

- **Legal** (locked — greyed out, lock icon)
  - "Legal · Contract Intelligence · Coming Q4 2025"
  - Amber accent, not-allowed cursor

- **Enterprise** (locked)
  - "Enterprise · Workflow Automation · Coming Q4 2025"
  - Violet accent

- **Governance** (locked)
  - "Governance · On-chain Voting · Coming Q4 2025"
  - Orange accent

- **Treasury** (locked)
  - "Treasury · Cash Management · Coming Q4 2025"
  - Cyan accent

- **Evidence** (locked)
  - "Evidence · Attestation Trail · Coming Q4 2025"
  - Green accent

**Step 3 — User Action**
- Clicks **Finance** tile
- Page transition: fade-to-black overlay (350ms)
- Navigates to `/app/dashboard`
- Finance sidebar slides in from left
- Dashboard content fades in

**Alternative:**
- Clicks locked tile → nothing happens (visual feedback: slight shake or "Coming soon" tooltip)

---

## WORKFLOW 3: Finance Dashboard — Overview Tab

### Trigger
Finance module loads (default: Overview tab).

### What User Sees

**Header**
- Total portfolio value: $1,000,000
- P&L: +$145,230 (+16.9%)
- "Last updated: 14:32:18 UTC" with live pulse indicator

**Metrics Row (4 cards)**
- Portfolio Value: $1,000K (+12.4%)
- Day P&L: +$8,420 (+0.84%)
- Active Positions: 8 (2 rebalancing)
- Cash Reserve: $70,000 (7.0% allocation)

**Charts Row**
- **Left:** Portfolio performance area chart (Jan–Jul)
  - Green gradient fill under line
  - Y-axis in $K, X-axis by month
  - Tooltip on hover: month + value

- **Right:** Asset allocation pie chart
  - Crypto L1: 56.4% (neon green)
  - Equities: 29.8% (cyan-green)
  - Cash: 7.0% (cyan)
  - Crypto L2: 6.8% (violet)
  - Legend below with color dots

**Positions Table**
- 8 rows: BTC, ETH, SOL, AAPL, NVDA, AVAX, COIN, USDC
- Columns: Asset name + symbol, Allocation % (with bar), Value ($K), Entry price, Current price, P&L % (green/red), Type (crypto/equity/stable)
- Hover: row highlights to elevated surface

**Risk Metrics Bar (6 cards)**
- VaR (95%): 4.2% (green)
- CVaR: 6.8% (amber)
- Max DD: 8.4% (orange)
- Sharpe: 2.14 (green)
- Sortino: 3.21 (cyan)
- Beta: 0.87 (violet)

### User Actions
- Scroll through positions table
- Hover over chart for tooltips
- Click sidebar nav to switch tabs

---

## WORKFLOW 4: Finance — Stock Screener

### Trigger
User clicks "Screener" in sidebar.

### What User Sees

**Header**
- "G20 INTELLIGENCE SCREENER · Smart Money Signals"
- 2 CONFIRMED / 10 MIXED count badges

**Search & Filters**
- Search bar: "Search symbol or company..."
- Signal filter buttons: ALL / CONFIRMED / MIXED

**Warning Banner**
- Orange alert: "Multi-agent system contradicts LightGBM on 83% of picks. Only 2 out of 12 signals fully aligned."

**Pick Cards (2-column grid)**
Each card:
- Flag emoji + company name + symbol
- Country · Sector
- Final verdict badge: CONFIRMED (green) or MIXED (grey)
- Three signal bars:
  - LightGBM: neon green bar + STRONG BUY
  - Agents: green/orange bar + verdict
  - Momentum: teal bar + percentage
- Price with arrow icon

**Example — SUMCO CORP:**
- 🇯🇵 SUMCO CORP · 3436.T · Japan · Technology
- MIXED badge
- LightGBM: 92% bar · STRONG BUY
- Agents: 40% orange bar · Underweight
- Momentum: 100% bar · +139.1%
- Price: ¥5,244

### User Actions
- Type in search to filter picks
- Click ALL/CONFIRMED/MIXED to filter by signal type
- Click card to expand (future: detail view)

---

## WORKFLOW 5: Finance — Engine Control Center

### Trigger
User clicks "Engines" in sidebar.

### What User Sees

**Header**
- "ENGINE CONTROL CENTER · 8 Intelligence Engines"
- Active count: "7/8 ACTIVE"

**Engine List (expandable)**
Each engine row:
- Play/Pause toggle button (green = active, grey = paused)
- Engine icon + name
- Status badge: ACTIVE / PAUSED / CALIBRATING
- Accuracy %
- Version + last run time
- Expand/collapse chevron

**8 Engines:**

| # | Engine | Status | Accuracy | Version |
|---|---|---|---|---|
| 1 | Conviction Engine | active | 75.7% | 2.1.4 |
| 2 | Capital Allocation | active | 82.3% | 1.8.2 |
| 3 | Capital Migration | active | 71.2% | 1.5.1 |
| 4 | Dynamic Harvest | active | 68.9% | 2.0.3 |
| 5 | PER Engine | calibrating | 64.1% | 1.2.0 |
| 6 | Compounding | active | 91.2% | 1.3.0 |
| 7 | Portfolio Risk | active | 88.7% | 2.3.1 |
| 8 | Market Regime | active | 72.4% | 1.7.0 |

**Expanded View (per engine)**
- **Configuration Panel (left):**
  - All parameters listed as label-value pairs
  - Example for Conviction:
    - Signal Weights: {"momentum":0.35,"fundamentals":0.25,"sentiment":0.2,"onChain":0.2}
    - Min Confidence: 65
    - Lookback Days: 120

- **Live Output Panel (right):**
  - Status: RUNNING/PAUSED
  - Last Execution: "2 min ago"
  - Accuracy (30d): 75.7%
  - Signals Generated: 284
  - Avg Latency: 45ms
  - Action buttons: Pause/Start Engine, Reset

### User Actions
- Click play/pause to toggle engine on/off
- Click row to expand/collapse config
- Click Reset to reset engine parameters

---

## WORKFLOW 6: Finance — Risk Management

### Trigger
User clicks "Risk" in sidebar.

### What User Sees

**Header**
- "PORTFOLIO RISK ENGINE"
- "ALL SYSTEMS NOMINAL" with shield icon

**Risk Metrics (4 cards)**
- VaR (95%, 1D): 4.2% ✓
- CVaR (Expected Shortfall): 6.8% ⚠
- Max Drawdown: 8.4% ✓
- Current Drawdown: 2.1% ✓

**Charts Row**
- **Risk Radar (left):** Spider chart with 6 axes
  - Volatility: 65, Concentration: 78, Correlation: 72, Liquidity: 30, Drawdown: 42, Leverage: 15
  - Green fill, white grid

- **Position Risk (right):** Horizontal bar chart
  - Each position's allocation % as bar
  - Y-axis: asset symbols

**Correlation Matrix**
- 8×8 table: BTC, ETH, SOL, AAPL, NVDA, AVAX, COIN, USDC
- Values color-coded:
  - White (1.0 = self)
  - Orange (>0.7 = high correlation warning)
  - Grey (low correlation)
  - Black (0.0 = USDC)

**Risk Alerts**
- 5 alerts with severity icons:
  - 🔴 HIGH: AVAX correlation with BTC spiked to 0.82 (resolved)
  - 🟡 MEDIUM: NVDA allocation approaching 15% limit (active)
  - 🔵 LOW: USDC yield opportunity detected (active)
  - 🔴 HIGH: Portfolio VaR exceeded 4% threshold (resolved)
  - 🟡 MEDIUM: BTC 30d volatility increased to 24.5% (active)

---

## WORKFLOW 7: Finance — Evidence Log

### Trigger
User clicks "Evidence" in sidebar.

### What User Sees

**Header**
- "EVIDENCE ENGINE · Attestation Trail"
- Description: "Every decision is cryptographically attested, timestamped, and stored."

**Stats Row (4 cards)**
- Evidence Records: 28,471
- Today: 342
- Engines Active: 8/8
- Integrity: 100%

**Search & Filter**
- Search: "Search asset, action, or engine..."
- Filter button

**Evidence Table**
Columns: ID, Timestamp, Action, Asset, Details, Engine, Attestation Hash

Example rows:
- EV-28471 · 14:32:18 · Position increased · BTC · Conviction 92 → allocation 22%→25.4% · Conviction+Allocation · 0x8f3a...b2e1 [copy]
- EV-28470 · 14:28:05 · Profit harvested · NVDA · +45% gain → harvested 30% ($21,300) · Harvest · 0x7d2c...a4f3 [copy]
- EV-28469 · 14:15:33 · Rebalance executed · Portfolio · SOL exceeded 12% threshold → reduced 2.1% · Migration · 0x6e1b...93d2 [copy]

### User Actions
- Search to filter evidence records
- Click copy icon to copy attestation hash to clipboard
- Copy confirmed with checkmark icon (2 second timeout)

---

## WORKFLOW 8: Finance — User Settings (Risk Framework)

### Trigger
User clicks "Settings" in sidebar.

### What User Sees

**Header**
- "USER POLICY LAYER · Risk & Return Framework"
- Description: "Define your portfolio objectives. All engines execute only within these constraints."

**Warning Banner**
- "Changes to risk parameters are validated by the Portfolio Risk Engine before activation. Conflicting parameters will be flagged."

**7 Configurable Sections:**

1. **Target Return** — Slider 5% to 100%, current: 25%
   - Label: "Annual portfolio return objective"

2. **Maximum Drawdown** — Slider 5% to 50%, current: 15%
   - Label: "Maximum acceptable peak-to-trough decline"
   - Orange color (warning tone)

3. **Compounding Percentage** — Slider 0% to 100%, current: 80%
   - Label: "Percentage of profits reinvested"
   - "0% = harvest all" / "100% = reinvest all"

4. **Profit Harvesting Rules** — 4 tier cards
   - At +10% → 20% harvested
   - At +20% → 30% harvested
   - At +30% → 40% harvested
   - At +50% → 50% harvested

5. **Portfolio Exit Conditions** — 3 rules
   - Target return reached → Harvest 50% + continue
   - Max drawdown hit → Reduce exposure 50%
   - Portfolio exit signal → Full exit to stablecoins

6. **Risk Tolerance Profile** — 4 buttons
   - Conservative / Moderate / Moderate-Aggressive / Aggressive
   - Current: Moderate-Aggressive (highlighted in neon green)

7. **Maximum Position Size** — Slider 5% to 50%, current: 25%
   - Label: "No single position can exceed this %"

**Save Button**
- "Save Policy" button (neon green)
- On save: "Policy validated and saved. Engines will use new parameters on next cycle."
- Engines re-read settings on next execution cycle

---

## WORKFLOW 9: Sidebar Navigation

### Behavior
- Fixed left sidebar, 224px wide (56px collapsed)
- Collapse toggle: small button on right edge
- Active tab: green left border + neon green icon + white text
- Inactive: transparent border + grey icon + muted text

### Tabs
1. **Overview** — portfolio value, charts, positions, risk metrics
2. **Screener** — G20 stock picks with signal analysis
3. **Engines** — 8 engine control with config panels
4. **Risk** — VaR, correlation matrix, alerts
5. **Evidence** — attestation trail with cryptographic hashes
6. **Settings** — user-defined risk & return framework

### Exit
- "Exit to Launchpad" button at bottom of sidebar
- Returns to `/launch` with fade transition

---

## WORKFLOW 10: Returning User Journey

### Trigger
User has visited before, returns to site.

### Steps
1. Homepage loads (starfield, decrypt animation)
2. User clicks "Launch App" (knows where it is now)
3. App launcher loads
4. User clicks Finance tile
5. Dashboard loads with previous tab state
6. User continues from where they left off

### Optimizations for Return Users
- No need to re-read marketing copy
- Direct path: Homepage → Launch App → Finance → [last used tab]
- Settings persist across sessions
- Evidence log accumulates

---

## PAGE TRANSITION MAP

```
HOMEPAGE (/) ──┬──→ /platform (marketing)
                ├──→ /ecosystem (marketing)
                ├──→ /developers (marketing)
                ├──→ /pricing (marketing)
                ├──→ /launch (app launcher) ──→ /app/dashboard (finance)
                │                                  ├──→ /app/screener
                │                                  ├──→ /app/engines
                │                                  ├──→ /app/risk
                │                                  ├──→ /app/evidence
                │                                  └──→ /app/settings
                │
                └──→ Footer links (static/external)
```

---

*Document Version: 1.0*
*Scope: All platform surfaces — marketing website + finance dashboard*
