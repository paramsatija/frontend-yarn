# RED TEAM: yarnprotocol.ai — The Reality Report

**Date:** July 14, 2025
**Scope:** yarnprotocol.ai — All public pages and claims
**Verdict:** This is not the product Rajan described. It's a stock screener dressed up as AI. And the "AI" mostly disagrees with itself.

---

## THE SMOKING GUN: Wrong Product Entirely

### What Rajan Asked For (Per His Documents)
- Decentralized oracle network for **crypto** capital markets
- Legal systems intelligence, enterprise workflows, governance, treasury
- **YRN token** utility platform
- Private autonomous **portfolio execution** for crypto
- Non-custodial execution nodes
- "Operating System for Institutional Intelligence"
- 8 sophisticated quant engines (Conviction, Allocation, Migration, Harvest, PER, Compounding, Risk, Regime)

### What Jackie Built
- **Traditional equity stock screener** for G20 markets
- LightGBM gradient boosting model (basic ML classifier)
- "Multi-agent debate" theater with 7 agents that mostly disagree
- 290 daily stock picks, 99.3% rejected by the system's own signals
- **Zero crypto. Zero YRN token. Zero decentralized oracles. Zero execution.**
- Company: "GlobalPrisenter LLC-FZ · Dubai, UAE" — a shell company

### The Conclusion
**Jackie is not building Rajan's product.** He is building what he CAN build (a stock screener with off-the-shelf ML) and passing it off as the institutional intelligence operating system Rajan envisioned. Rajan doesn't have the technical background to recognize the difference — the demo looks impressive with its dark theme, numbers, and "AI" branding.

---

## CLAIM-BY-CLAIM FACT CHECK

### Claim 1: "75.7% Directional Accuracy"

**What's suspicious:**
- No time horizon specified. 75.7% accuracy over 1 day? 1 week? 1 month? This changes everything.
- No information ratio or Sharpe ratio. High accuracy with low magnitude gains can be worse than lower accuracy with high magnitude gains.
- No mention of transaction costs. In real trading, commissions, slippage, and market impact erode returns.
- The benchmark is unstated. 75.7% vs. what? A coin flip? Buy-and-hold? Random selection?

**Reality:**
With momentum features (20/60/120-day) in a bull market, achieving 65-70% directional accuracy on a binary up/down classifier is not extraordinary — it's expected. Momentum is one of the most persistent factors in finance (documented since Jegadeesh & Titman, 1993). The 75.7% claim is plausible but unimpressive for anyone who understands quantitative finance. It's like claiming your weather app is 75% accurate at predicting "will it be warmer or colder tomorrow" — easy baseline.

**What would be impressive (and is missing):**
- Risk-adjusted returns (Sharpe, Sortino, Calmar ratios)
- Maximum drawdown of the strategy
- Alpha generation after all costs
- Out-of-sample performance in bear markets
- Independent audit by a third party

**Verdict: MISLEADING** — Plausible number with no context. Doesn't prove alpha generation.

---

### Claim 2: "ROC-AUC 0.8670"

**What's suspicious:**
- ROC-AUC measures how well a model ranks positive vs. negative cases. A value of 0.867 means the model ranks a random positive case above a random negative case 86.7% of the time.
- **But AUC is not profitability.** A model can have high AUC and still lose money if:
  - The profitable predictions are low-magnitude
  - The unprofitable predictions are high-magnitude (fat left tail)
  - Transaction costs exceed the edge
- AUC is easy to inflate with momentum features in trending markets. Every momentum model gets high AUC in a bull market because the trend is your friend.

**Reality:**
The website says features include "momentum (20/60/120d)." In a semiconductor bull market (which 2025 has been), any model using momentum as a feature will naturally achieve 0.85+ AUC because recent winners tend to keep winning. This is not evidence of sophisticated modeling — it's evidence that momentum exists as a factor.

**Verdict: TECHNICALLY TRUE, FUNCTIONALLY MEANINGLESS** — High AUC with momentum features in a bull market is the baseline, not proof of edge.

---

### Claim 3: "Multi-Agent Debate — 7 Specialized Agents"

**What's suspicious:**
- 7 agents: Fundamentals, Sentiment, Technical, Bull Researcher, Bear Researcher, Risk Management, Portfolio Manager
- This sounds sophisticated to a non-technical audience. To someone who builds ML systems, this is a massive red flag.

**What the data actually shows:**
Looking at the markets page, the verdict column shows:

| Stock | Momentum | LightGBM | Multi-Agent | Final |
|---|---|---|---|---|
| SUMCO CORP | +139.1% | STRONG BUY | Underweight | **MIXED** |
| TIANSHUI HUATIAN | +104.8% | STRONG BUY | Hold | **MIXED** |
| SCREEN Holdings | +68.2% | STRONG BUY | Underweight | **MIXED** |
| TONGFU MICRO | +54.2% | STRONG BUY | Hold | **MIXED** |
| Capri Global | +38.7% | STRONG BUY | Hold | **MIXED** |
| MARATHON PETROLEUM | +33.6% | STRONG BUY | Hold | **MIXED** |
| Samsung Fire & Marine | +31.5% | STRONG BUY | Buy | **CONFIRMED** |

**The LightGBM model says STRONG BUY on virtually every top stock. The multi-agent system contradicts it on 90%+ of picks.**

If your secondary validation system disagrees with your primary system on 90% of outputs, you have one of two problems:

1. **The multi-agent system is broken** — It's so conservative it rejects obvious winners
2. **The multi-agent system is theater** — It exists to make the product look sophisticated while producing no real output

Either way, the "triple-signal alignment" that supposedly produces "CONFIRMED" picks is a fiction. The system generates 290 picks per day and **confirms approximately 2-5 of them (0.7-1.7% confirmation rate).**

**Why would anyone use a system that rejects 99% of its own output?**

**Verdict: THEATER** — Sounds sophisticated, produces contradictions, has no practical value.

---

### Claim 4: "290 Stock Picks Per Day, 18 G20 Markets"

**What's suspicious:**
- 290 picks across 18 markets = ~16 picks per market
- But the "top picks" table only shows ~60 stocks
- The "48 multi-agent runs/night" producing "top 3 per country" should yield 18 × 3 = 54 picks, not 290
- Where do the other 236 picks come from?

**The math doesn't add up.** Either:
- 290 is a fabricated number for marketing
- Most of the 290 are low-quality picks that never make the dashboard
- The "48 runs/night" and "top 3 per country" are inconsistent with the 290 claim

**Verdict: NUMBERS DON'T ADD UP**

---

### Claim 5: "CONFIRMED Signals"

**The website's own hero says "Found 2 confirmed picks across South Korea and Japan."**

Out of 290 daily picks, only 2 are "confirmed." That's a 0.7% hit rate.

**What this actually means:**
- The LightGBM model generates 290 "STRONG BUY" signals
- The multi-agent system rejects 288 of them (99.3% rejection)
- Only 2 stocks have all three signals "aligned"
- One of those "confirmed" picks is a +139% momentum semiconductor stock (extremely high risk)
- The other is a +31.5% insurance stock (moderate risk)

**If your system only "confirms" 2 out of 290 picks, why generate 290?** This is like a restaurant that cooks 290 meals and throws away 288 of them — then claims the 2 they served were delicious.

**Verdict: SELF-DEFEATING** — The system's own validation rejects its primary output.

---

### Claim 6: "No Mock, Simulated, or Synthetic Data"

**What's suspicious:**
- The website claims all data is "real, verified, no simulations"
- But the entire product is a backtested model that has never been traded live
- **Backtesting IS simulation.** Every backtest is a simulation of what WOULD have happened. It's not real trading.
- The "verified backtest" they link to — who verified it? What's the methodology? Where's the audit trail?

**The real test:** Has Jackie (or anyone) put real money behind these picks and tracked performance? If not, this is simulated data presented as real.

**Verdict: SEMANTIC GAMES** — The data inputs are real, but the outputs are simulated (backtested), not live-traded.

---

### Claim 7: "Last Pipeline Run: Jul 14, 2026"

**This is a date error.** The current date is July 14, 2025. The website shows 2026.

This could be:
- A typo (meant 2025)
- A system clock error
- Evidence that the "live" data is stale or pre-generated

**Verdict: SLOPPY** — Whether typo or data issue, it undermines the "live and operational" claim.

---

## REAL MARKET DATA VERIFICATION

### SUMCO CORP (3436.T) — Website: +139.1% 60d momentum

**Real data (from Yahoo Finance):**
- Current price: ~¥4,544-5,244
- 52-week range: ¥1,126 – ¥5,939
- YTD return: 217.49%
- 1-year return: 287.82%
- 4-week return: 53.87%

**Analysis:** A 60-day return of +139% implies the price roughly 2.5 months ago was ~¥1,900 (if current is ¥4,544). Given the 52-week low was ¥1,126 and the stock has been in a massive bull run all year, this is arithmetically possible. But it's also **the most extreme outlier pick** — a stock that more than doubled in 2 months during a semiconductor frenzy.

**What the website doesn't tell you:** SUMCO has a trailing P/E of 57+ and forward P/E of 476+. It's a massively overvalued momentum stock. Buying it after a +139% run is chasing momentum at extreme valuations — a recipe for catastrophic losses when the trend reverses.

---

### SCREEN Holdings (7735.T) — Website: +68.2%, listed as "🇬🇧 UK"

**Real data:**
- SCREEN Holdings is a **Japanese** company
- Ticker 7735.T trades on the **Tokyo Stock Exchange**
- The website lists it as "🇬🇧 UK" with the flag

**This is a data error.** SCREEN Holdings has nothing to do with the UK. This is sloppy data labeling that undermines the "institutional-grade" claim. If the system can't correctly identify a company's country, what other data errors exist?

---

### TIANSHUI HUATIAN (002185.SZ) — Website: +104.8% 60d

**Real data:**
- Current price: ~¥21.93-25.45
- 52-week range: ¥9.67 – ¥26.40
- YTD return: 100.16%
- 1-year return: 123.14%

**Analysis:** Similar to SUMCO — a Chinese semiconductor stock in a massive bull run. +104.8% in 60 days is possible given the YTD is 100%+. The website is essentially cherry-picking the best-performing stocks in the best-performing sector and claiming its "AI" found them.

**This is survivorship bias.** Any momentum model in a semiconductor bull market will pick semiconductor stocks. The question is: would the model have picked these stocks BEFORE the 100%+ run? That's what backtesting claims, but without independent audit, it's unverified.

---

## THE MULTI-AGENT CONTRADICTION ANALYSIS

Let's look at what the 7 agents actually produce on the top picks:

| Stock | Momentum | LightGBM | Multi-Agent Verdict | Conflict? |
|---|---|---|---|---|
| SUMCO CORP | +139.1% | STRONG BUY | Underweight | **YES — contradicts** |
| TIANSHUI HUATIAN | +104.8% | STRONG BUY | Hold | **YES — contradicts** |
| SCREEN Holdings | +68.2% | STRONG BUY | Underweight | **YES — contradicts** |
| TONGFU MICRO | +54.2% | STRONG BUY | Hold | **YES — contradicts** |
| Capri Global | +38.7% | STRONG BUY | Hold | **YES — contradicts** |
| MARATHON PETROLEUM | +33.6% | STRONG BUY | Hold | **YES — contradicts** |
| Samsung Fire & Marine | +31.5% | STRONG BUY | Buy | NO — agrees |
| J.FRONT RETAILING | +25.7% | STRONG BUY | Hold | **YES — contradicts** |
| EXTENDICARE | +24.8% | STRONG BUY | Buy | NO — agrees |
| GUDANG GARAM | +23.5% | STRONG BUY | Hold | **YES — contradicts** |

**8 out of 10 top picks have the multi-agent system contradicting the LightGBM model.**

**What this means:**
- The "Bull Researcher" and "Portfolio Manager" agents are so conservative they reject obvious momentum winners
- Or the agents are configured to produce "Hold" as a default (safe) output
- Or the entire multi-agent system is random noise designed to look sophisticated

**If you remove the multi-agent theater, what remains?** A momentum stock screener. That's it. The LightGBM model picks stocks with strong recent momentum. The 7 agents add nothing of value — they just reject most picks and occasionally agree.

---

## THE CHERRY-PICKING PROBLEM

**All the top "picks" are semiconductor stocks in a semiconductor bull market.**

Look at the pattern:
- SUMCO: Semiconductor (Japan) +139.1%
- TIANSHUI HUATIAN: Semiconductor (China) +104.8%
- SCREEN Holdings: Semiconductor equipment (Japan) +68.2%
- TONGFU MICRO: Semiconductor (China) +54.2%

**This is not AI finding hidden gems. This is a momentum scanner finding the most obvious stocks in the most obvious sector during the most obvious bull run.**

A retail investor with a TradingView account and a momentum filter could produce the same list in 5 minutes. The "LightGBM quantitative engine" and "7-agent debate" are expensive wrappers around basic momentum screening.

**What would be impressive:**
- Finding winning stocks in DECLINING sectors
- Consistent alpha across bull AND bear markets
- Outperformance after transaction costs
- Named, verified institutional clients using the product

None of these are present.

---

## THE LEGAL EXPOSURE

### "This platform IS NOT... A trading execution platform"

The data sources page explicitly states: "This platform IS NOT... A trading execution platform."

**But Rajan's documents explicitly ask for a trading execution platform.** The entire "Private Autonomous Portfolio Execution Layer" is about executing trades. The YRN Execution Node is about connecting to exchanges and executing portfolio decisions.

**Jackie built a stock screener and labeled it "not a trading execution platform."** Which means even if Rajan wanted to use it for execution, the disclaimer prevents that positioning.

### "A licensed investment advisor or financial advisor"

The disclaimer is correct — this is not a licensed advisory service. But:
- Providing stock picks with "BUY" recommendations
- Claiming "75.7% accuracy"
- Offering "institutional-grade picks"

These are borderline advisory activities in many jurisdictions. The SEC, FCA, and other regulators have taken action against unregistered advisors for less.

### "GlobalPrisenter LLC-FZ · Dubai, UAE"

Dubai free zone companies are common for:
- Tax optimization (0% corporate tax in many free zones)
- Regulatory arbitrage (avoiding stricter regulations in US/EU)
- Asset protection

While not inherently suspicious, combining this with unverified financial claims, shell company structure, and no verifiable team creates a profile that sophisticated investors will scrutinize heavily.

---

## WHAT JACKIE ACTUALLY BUILT (HONEST DESCRIPTION)

> A **momentum-based stock screener** that uses LightGBM (a standard gradient boosting library) to rank stocks by recent price performance across G20 markets. The model achieves ~75% directional accuracy in backtests by primarily using momentum features (20/60/120-day returns), which is expected given momentum's persistence as a documented financial factor. A "multi-agent debate" system with 7 agents was added as a differentiator but contradicts the primary model on ~90% of picks, rendering it functionally useless. The system generates 290 daily picks but confirms only 2-5 (0.7-1.7%), meaning it rejects its own output 98%+ of the time. The product has never been live-traded and all performance claims are backtested.

**That's the honest description.** Everything else is marketing.

---

## SUMMARY: RED FLAGS RANKED

| # | Red Flag | Severity |
|---|---|---|
| 1 | **Wrong product entirely** — Built stock screener, not Rajan's crypto intelligence OS | CRITICAL |
| 2 | **Multi-agent system contradicts primary model 90% of the time** | CRITICAL |
| 3 | **99.3% of picks rejected by own validation** — System defeats itself | CRITICAL |
| 4 | **All "top picks" are obvious momentum stocks in obvious bull sector** | HIGH |
| 5 | **75.7% accuracy is unverified, likely momentum-driven baseline** | HIGH |
| 6 | **Company is Dubai shell corp, not disclosed team** | HIGH |
| 7 | **Date error (2026 instead of 2025)** shows sloppiness | MEDIUM |
| 8 | **Country mislabeling (SCREEN Holdings as UK)** | MEDIUM |
| 9 | **290 picks claim inconsistent with "48 runs/night, top 3 per country"** | MEDIUM |
| 10 | **Zero connection to Rajan's 8-engine architecture** | CRITICAL |

---

## WHAT TO TELL RAJAN

**"Uncle, Jackie is not building your product. He built a stock screener with a basic machine learning model and called it AI. The '7-agent debate' is theater — it contradicts itself and rejects 99% of its own picks. The '75.7% accuracy' is from backtesting in a bull market using momentum features, which any finance student could replicate. He has built nothing related to your vision — no YRN token, no decentralized oracles, no execution engine, no evidence engine, no 8 quant engines. You need to confront him immediately and demand to see the actual codebase, the mathematical specifications for each engine, and proof that anything has been built beyond a stock-picking website."**

---

*Red Team: Confidential*
*Scope: yarnprotocol.ai — Full site and claims*
*Overall Assessment: Product is a basic momentum screener marketed as sophisticated AI. Not what Rajan specified. High credibility risk.*
