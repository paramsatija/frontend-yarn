# RAW DATA: What Rajan Wants vs. What Exists vs. What We Built

**Prepared for:** Claude analysis
**Date:** July 14, 2025
**Scope:** All source documents, all websites, all claims
**Format:** Structured raw data — paste directly into Claude

---

## SECTION 1: WHAT RAJAN MARWAHA WANTS (Extracted from all messages)

### 1A. Original Vision Document (First message)

**Product Name:** YARN Protocol
**Positioning:** "Operating System for Institutional Intelligence"
**Core Statement:** "Institutional-Grade Decentralized Oracle Network"

**Primary Objective:**
- Build a platform that combines capital intelligence, legal systems, enterprise workflows, governance, and treasury intelligence into one ecosystem
- NOT a trading platform or investment app
- Platform for institutional-grade intelligence across multiple domains

**Five Intelligence Domains:**
1. Capital Markets — real-time price feeds, volatility, risk metrics
2. Legal Systems — smart contract attestation, compliance
3. Enterprise — workflow automation, operational intelligence
4. Governance — transparent governance, on-chain voting
5. Treasury — real-time treasury management

**Brand Character:**
- "Not designed for hype"
- "Built for permanence"
- "Every layer is engineered, not scripted"
- Feels like "mission-critical infrastructure"
- Reference: Bloomberg Terminal (institutional), Notion (utility)

**Target Users:**
- Institutional investors
- Enterprise legal teams
- Treasury managers
- Protocol governance participants

**YRN Token Utility:**
- Platform access token
- Staking for governance
- Transaction fees
- NOT a speculative asset

**Evidence Engine:**
- Every action generates evidence
- Evidence strengthens intelligence across all domains
- Cryptographic attestation
- "Network effect" — every user improves platform for all

---

### 1B. Execution Layer Document (Second message)

**New Component:** Private Autonomous Portfolio Execution Layer

**Core Product:** YRN Execution Node
- Self-hosted by user in their own environment
- Connects to exchanges via user's private API credentials
- Autonomous portfolio management within user-defined constraints

**User-Defined Parameters (8 total):**
1. Target portfolio return
2. Maximum drawdown
3. Profit harvesting rules
4. Capital compounding policy
5. Portfolio exit conditions
6. Risk tolerance
7. Position sizing constraints
8. Allocation preferences

**Autonomous Actions:**
- Harvest profits
- Reduce exposure
- Reallocate capital
- Move assets to treasury
- Exit individual positions
- Exit entire portfolio

**Integration Engines (8 total):**
1. Conviction Engine
2. Capital Allocation Engine
3. Capital Migration Engine
4. Dynamic Harvest Engine
5. Portfolio Expected Return (PER) Engine
6. Compounding Engine
7. Portfolio Risk Engine
8. Market Regime Engine

**Core Philosophy:**
"Your capital. Your keys. Your infrastructure. Your strategy."
"Yarn Protocol supplies the intelligence. The user controls the execution."

**Non-Custodial by Design:**
- Never holds user funds
- Never holds API credentials
- Execution happens in user's environment only

---

### 1C. Legal Disclaimer Document

**Key Points:**
- Software platform only, not financial advice
- Users retain exclusive ownership of assets
- No custody of client funds
- Substantial risk disclosure
- Users responsible for compliance in their jurisdiction
- No liability for trading losses

---

### 1D. User-Defined Risk Framework Document

**User Configurable Parameters:**
- Maximum acceptable drawdown
- Target return objective
- Profit lock thresholds
- Compounding percentage
- Harvesting strategy
- Position sizing
- Portfolio exit rules
- Risk budget

**Engine Behavior:**
- Autonomously manages within user constraints
- Locks gains at targets
- Reduces/exits at risk thresholds
- No guaranteed outcomes

---

### 1E. Regulatory Design Document

**Platform Must Never:**
- Take custody of client assets
- Hold client funds
- Guarantee returns
- Guarantee capital protection
- Provide personalized financial advice

**Architecture Goal:**
- Software platform, not investment manager
- User defines all parameters
- Platform executes only within user permissions
- Legal review required in every jurisdiction

---

### 1F. Privacy & Security Framework Document

**12 Principles:**
1. Privacy by Design
2. User Data Sovereignty
3. Local Execution Architecture
4. Data Minimization
5. Encryption (in transit and at rest)
6. Access Control (RBAC, MFA, least privilege)
7. User Control (exchange connections, automation, data)
8. Transparency
9. Security Monitoring
10. Third-Party Services (trusted only)
11. Regulatory Support (GDPR, CCPA, etc.)
12. Governance

**Core Principle:** "Privacy by Design. Security by Default. User Sovereignty Always."

---

### 1G. Latest Vision Document ("What Yarn Becomes")

**New Term:** Adaptive Capital Operating System (ACOS)

**At Maturity, Combines:**
- Portfolio Management System (PMS)
- Portfolio Construction Engine
- Portfolio Expected Return (PER) Engine
- Capital Allocation Engine
- Decision Intelligence Platform
- Institutional Risk Management Framework
- Confidence Calibration & Model Governance System
- Geometric Compounding Engine
- Autonomous Execution Layer
- Adaptive Capital Operating System

**Objective:** "Not to optimise individual trades, but to continuously optimise the productivity of every dollar within the portfolio."

**Strategic Position:**
- Differentiated portfolio intelligence platform
- Proprietary decision architecture
- Continuous model governance
- Explainable portfolio optimisation
- Disciplined capital allocation
- Target: sophisticated investors, asset managers, wealth managers, family offices

---

## SECTION 2: WHAT JACKIE BUILT (yarnprotocol.ai — Verified)

### 2A. What The Website Actually Is

**URL:** yarnprotocol.ai
**Company:** GlobalPrisenter LLC-FZ, Dubai, UAE
**Product Name:** "Smart Money AI" / "G20 Smart Money"

**What It Actually Does:**
- Stock screening/scoring for G20 equity markets (NOT crypto)
- Uses LightGBM (gradient boosting library) for binary classification
- Scores stocks 0-100% win probability
- Generates BUY / HOLD / SELL signals
- 290 stock picks per day across 18 G20 markets
- "Multi-agent debate" with 7 agents for secondary validation

### 2B. Data Sources (From Website)

- India mutual fund holdings (107 funds)
- G20 ETF institutional holdings (15 countries)
- Brazil CVM official filings
- Price & momentum data (OHLCV)
- Government investment intelligence (RSS feeds)

### 2C. Model (From Website)

- Algorithm: LightGBM binary classifier
- Training: Walk-forward time-series cross-validation
- Window: 120 days training, validated T-60 to T-0
- Features: Institutional conviction, fund count, momentum (20/60/120d), news sentiment, sector signals
- Claimed ROC-AUC: 0.867 (backtested)
- Claimed directional accuracy: 75.7%
- Claimed best markets: UK 75%, USA 75%, Canada 71%, Australia 70%, India 68%

### 2D. Multi-Agent System (From Website)

7 agents:
1. Fundamentals Analyst Agent
2. Sentiment Analyst Agent
3. Technical Analyst Agent
4. Bull Researcher Agent
5. Bear Researcher Agent
6. Risk Management Agent
7. Portfolio Manager Agent (final verdict)

Output: Buy / Hold / Sell / Overweight / Underweight
Coverage: Top 3 picks per country (48 stocks/night)

### 2E. Triple-Signal Pipeline (From Website)

Signal 1: LightGBM Model (quantitative scoring)
Signal 2: Institutional Flow (fund holdings data)
Signal 3: Multi-Agent Debate (consensus)

CONFIRMED: All three align
MIXED: Signals conflict
AVOID: All signals bearish

### 2F. What The Website Says It IS NOT

- NOT a licensed investment advisor
- NOT a trading execution platform
- NOT a guarantee of future returns
- NOT using simulated/mock/synthetic data

### 2G. Top Picks Currently Shown (July 14, 2025)

| Stock | Country | Sector | Momentum 60d | LightGBM | Multi-Agent | Final |
|---|---|---|---|---|---|---|
| SUMCO CORP | Japan | Technology | +139.1% | STRONG BUY | Underweight | MIXED |
| TIANSHUI HUATIAN | China | Technology | +104.8% | STRONG BUY | Hold | MIXED |
| SCREEN Holdings | Japan (labeled UK) | Technology | +68.2% | STRONG BUY | Underweight | MIXED |
| TONGFU MICRO | China | Technology | +54.2% | STRONG BUY | Hold | MIXED |
| Capri Global | India | Financial | +38.7% | STRONG BUY | Hold | MIXED |
| MARATHON PETROLEUM | USA | Energy | +33.6% | STRONG BUY | Hold | MIXED |
| Samsung Fire & Marine | South Korea | Financial | +31.5% | STRONG BUY | Buy | CONFIRMED |
| J.FRONT RETAILING | Japan | Consumer | +25.7% | STRONG BUY | Hold | MIXED |
| EXTENDICARE | Canada | Healthcare | +24.8% | STRONG BUY | Buy | CONFIRMED |
| GUDANG GARAM | Indonesia | Consumer | +23.5% | STRONG BUY | Hold | MIXED |

**Key observation:** LightGBM says STRONG BUY on virtually all top picks. Multi-agent contradicts on 8/10 picks. Only 2 out of 290 daily picks are "CONFIRMED."

### 2H. Errors Found on Website

1. Date shows "Jul 14, 2026" (should be 2025)
2. SCREEN Holdings (7735.T) listed as "🇬🇧 UK" — it's a Japanese company
3. 290 picks per day inconsistent with "48 runs/night, top 3 per country" (should be 54 picks)
4. All top picks are semiconductor/tech stocks during a semiconductor bull run

### 2I. What Jackie Has NOT Built (Per Rajan's Documents)

- NO crypto oracle network
- NO YRN token (no smart contract, no blockchain)
- NO decentralized anything
- NO legal intelligence module
- NO enterprise workflow module
- NO governance module
- NO treasury module
- NO execution layer (website explicitly says "NOT a trading execution platform")
- NO 8 quant engines (Conviction, Allocation, Migration, Harvest, PER, Compounding, Risk, Regime)
- NO evidence engine
- NO model governance system
- NO confidence calibration
- NO autonomous portfolio execution
- NO user-defined risk framework interface

---

## SECTION 3: WHAT WE BUILT (Our Website)

### 3A. Our Website

**URL:** https://l4q777ydvynom.kimi.page
**Type:** Marketing/preview website (NOT a functional product)
**Purpose:** Showcase the YARN Protocol vision for Rajan

### 3B. Pages Built

1. **Homepage** — Hero with starfield animation, trust logos, platform overview, network visualization, bento ecosystem grid, live metrics, evidence engine, YRN utility, testimonials
2. **Platform** — Architecture overview, 5 domain deep-dives, integration CTA
3. **Ecosystem** — 6 ecosystem sections with AI-generated images
4. **Developers** — Code example, SDK grid, documentation links
5. **Pricing** — 3-tier pricing with usage calculator

### 3C. Technical Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Three.js (starfield effect)
- Canvas 2D (network visualization)
- React Router (multi-page)
- Custom animations (CRT text decrypt, nav scramble, page transitions)

### 3D. What Our Website Is NOT

- NOT a functional product
- NOT connected to any backend
- NOT processing real data
- NOT a trading platform
- NOT executing anything
- Purely a marketing/preview website based on Rajan's documents

---

## SECTION 4: GAP ANALYSIS (Raw Facts)

### 4A. Product Type Gap

| What Rajan Wants | What Jackie Built | What We Built |
|---|---|---|
| Crypto-native institutional intelligence platform | Equity stock screener for G20 markets | Marketing website for the vision |
| Decentralized oracle network | Centralized web app with no blockchain | No blockchain |
| Autonomous portfolio execution | Explicitly NOT an execution platform | No execution |
| YRN token utility | No token exists | No token |
| 8 quant finance engines | 1 LightGBM momentum model | No engines |
| Multi-domain (capital/legal/enterprise/governance/treasury) | Single domain (stock screening) | Showcases all domains (visual only) |

### 4B. Technical Gap

| Component | Rajan's Spec | Jackie's Implementation | Gap |
|---|---|---|---|
| PER Engine | Multi-factor return forecasting | LightGBM momentum classifier | Different product entirely |
| Capital Allocation | Kelly/Markowitz/risk parity | No allocation engine | Not built |
| Risk Engine | VaR, CVaR, drawdown monitoring | No risk engine | Not built |
| Harvest Engine | Optimal profit-taking | No harvest engine | Not built |
| Regime Engine | HMM/GMM regime detection | No regime detection | Not built |
| Execution Layer | Self-hosted node, exchange APIs | No execution layer | Not built |
| Evidence Engine | Immutable attestation, cross-domain | No evidence engine | Not built |
| Model Governance | Performance tracking, A/B testing, calibration | No governance system | Not built |

### 4C. Claim vs. Reality Gap

| Claim | Reality |
|---|---|
| "8 engines built in hours" | 1 LightGBM model + a dashboard |
| "Multi-agent debate with 7 agents" | 7 agents that contradict primary model 90% of the time |
| "75.7% directional accuracy" | Backtested in bull market using momentum features (baseline, not special) |
| "290 daily picks" | Only 2-5 "confirmed" (0.7-1.7% confirmation rate) |
| "Institutional-grade" | No institutional clients named |
| "Live and operational" | Date error (2026), country mislabeling (Japan as UK) |
| "No simulated data" | Entire product is backtested (which IS simulation) |
| "Your capital, your keys" | No execution capability — just stock picks |

---

## SECTION 5: KEY QUESTIONS TO ASK CLAUDE

Paste this document into Claude and ask:

1. Is Jackie's product (yarnprotocol.ai) what Rajan asked for? Be specific about what's missing.

2. Rajan wants an "Adaptive Capital Operating System" with 8+ quant engines. Jackie built a stock screener with LightGBM. Are these the same product? If not, what's the gap?

3. The website (yarnprotocol.ai) says it's "NOT a trading execution platform" but Rajan explicitly asked for autonomous execution. Is this a contradiction or did Jackie deliberately build something different?

4. Jackie's "multi-agent system" contradicts his primary model on 90% of picks and only confirms 2 out of 290 daily picks. Is this a sophisticated validation system or theater?

5. Rajan describes 8 quant engines (Conviction, Allocation, Migration, Harvest, PER, Compounding, Risk, Regime). What mathematical knowledge and engineering effort does each actually require? Can one developer build all 8 "in hours"?

6. The website claims "75.7% accuracy" and "ROC-AUC 0.867" using momentum features in a 2025 semiconductor bull market. Is this impressive for a quant model, or is it baseline performance?

7. Jackie said "I'm using scripts" when asked about algorithms. In quantitative finance, what does "scripts" mean vs. "engines"? Is this a meaningful distinction?

8. Rajan wants a product for "sophisticated investors, asset managers, wealth managers, family offices." Is a LightGBM stock screener appropriate for this audience? What would they actually expect?

9. Should Rajan continue working with Jackie? What specific proof should Rajan demand before paying another dollar?

10. If Rajan wants his actual vision built, what team, budget, and timeline are realistically required?

---

*End of raw data document*
*Prepared for Claude analysis*
*All data extracted from primary sources — Rajan's messages and jackie's website*
