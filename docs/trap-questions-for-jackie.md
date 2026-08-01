# TRAP QUESTIONS FOR JACKIE
## 50 Questions That Will Expose a Fraud

**Rule:** Ask these in sequence. A real developer answers specifics immediately. A fraud deflects, delays, or gives vague answers. Record every response.

---

## ROUND 1: THE BASICS (If he can't answer these in 30 seconds each, he's lying)

1. **What programming language is the PER Engine written in? What file can I open to see its source code?**

2. **What optimization library does the Portfolio Construction Engine use? CVXPY? scipy.optimize? OSQP? Something custom?**

3. **The Capital Allocation Engine — are you using full Kelly, half Kelly, or quarter Kelly? What's the exact formula in your code?**

4. **How does the Harvest Engine determine "optimal" profit-taking timing? Show me the utility function. What are the parameters?**

5. **The Risk Engine calculates VaR — parametric, historical simulation, or Monte Carlo? What's the confidence level and holding period?**

6. **The Regime Engine — what model architecture? HMM with how many states? What are the emission distributions? Gaussian?**

7. **Show me the git commit history for the Conviction Engine. When was the first commit? How many commits?**

8. **What's the exact API endpoint I can call to get the current portfolio allocation weights?**

9. **The Execution Layer — does it connect to Binance, Coinbase, or what exchanges? What API wrapper library? CCXT? Custom?**

10. **Show me a unit test for the Compounding Engine. What does it test? What's the assertion?**

---

## ROUND 2: THE MATH (These have RIGHT and WRONG answers. No room for BS.)

11. **The PER Engine estimates expected returns. What factor model? Fama-French 3-factor? 5-factor? Carhart 4-factor? Your own?**

12. **How do you estimate the covariance matrix for portfolio optimization? Sample covariance? Ledoit-Wolf shrinkage? Factor model? Graphical Lasso?**

13. **Your backtest shows 75.7% accuracy. What's the information ratio? What's the Sharpe ratio? Maximum drawdown? These numbers matter more than accuracy — where are they?**

14. **The Harvest Engine uses "optimal timing." This is a classic optimal stopping problem. Are you using the Snell envelope? Dynamic programming? Or just fixed thresholds?**

15. **Kelly criterion requires estimating win probability and payoff ratio. How does your system estimate these in real-time? Bayesian updating? Fixed window?**

16. **Your LightGBM model uses walk-forward validation with a 120-day training window. What's the retraining frequency? Daily? Weekly? What happens on retraining day — does the engine pause?**

17. **The multi-agent system uses 7 agents. How are their votes aggregated? Simple majority? Weighted by historical accuracy? Bayesian model averaging? If weighted, what's the weight update rule?**

18. **You claim ROC-AUC of 0.867. What's the precision-recall AUC? What's the calibration curve look like? A well-calibrated model is more important than AUC for portfolio decisions.**

19. **Portfolio optimization with transaction costs is a multi-period problem. Are you solving single-period or multi-period? If multi-period, what's the horizon and how do you handle the curse of dimensionality?**

20. **The Risk Engine monitors drawdown. What's the drawdown calculation method? Peak-to-trough from all-time high? Rolling window? What's the lookback period?**

---

## ROUND 3: THE ARCHITECTURE (Force him to draw a diagram with specifics)

21. **Draw me the system architecture on a whiteboard right now. Show me: data sources → processing → model inference → decision → execution → logging. Every component, every data flow.**

22. **The YRN Execution Node runs locally. How does it receive signals from the cloud platform? WebSocket? gRPC? REST polling? What's the latency?**

23. **If the cloud platform sends a "BUY BTC" signal but the user's exchange API is down, what happens? Walk me through the failure handling step by step.**

24. **The Evidence Engine stores "immutable" evidence. Is this on-chain? If yes, which blockchain? Which smart contract? Show me the contract address. If no, how is it immutable?**

25. **Database schema: What tables store portfolio positions? What tables store model predictions? What's the primary key on the evidence table? Show me the schema.**

26. **The 8 engines need to communicate. What's the message bus? Kafka? Redis? RabbitMQ? Direct API calls? How do you handle an engine failure without crashing the whole system?**

27. **Authentication: The node connects to user exchange APIs. How are API keys stored? HashiCorp Vault? Environment variables? Encrypted file? Who holds the encryption key?**

28. **If I deploy the YRN Execution Node right now, what's the Docker command? What's in the docker-compose.yml? Show me.**

29. **The node needs to run 24/7. How is it deployed? systemd service? Kubernetes? Docker Swarm? What's the uptime monitoring?**

30. **Model versioning: You retrain the LightGBM model. How do you deploy the new model without downtime? Blue-green deployment? Feature flags? Model registry?**

---

## ROUND 4: THE CONTRADICTIONS (These are designed to trap him)

31. **Your website says "This platform IS NOT... A trading execution platform." But Rajan explicitly asked for autonomous portfolio execution. Which is it? Why the contradiction?**

32. **The multi-agent system contradicts the LightGBM model on ~90% of picks. If the agents are so good, why keep the LightGBM model? If LightGBM is so good, why have agents that reject everything?**

33. **You generate 290 picks per day but only 2-5 are "confirmed." Why generate 288 picks you immediately reject? What's the point of that pipeline?**

34. **SCREEN Holdings (7735.T) is listed as "🇬🇧 UK" on your website. It's a Japanese company on the Tokyo Stock Exchange. How did your system get the country wrong?**

35. **Your website date shows "Jul 14, 2026" but it's 2025. If this is a live operational system, why is the date wrong? Is the data actually live?**

36. **You said you built 8 engines "in hours." The PER Engine alone requires multi-factor return forecasting with regime-dependent calibration. How many hours specifically? Show me the commits.**

37. **You said "I'm using scripts." Scripts in what language? Python? What libraries? numpy? pandas? scikit-learn? PyPortfolioOpt? LightGBM? Be specific.**

38. **The website claims "institutional-grade." Name one institution that has signed a contract, paid money, or provided a written testimonial. Just one.**

39. **Your backtest shows 75.7% accuracy. Have you traded these signals with real money? If yes, what's the P&L? If no, how can you claim the system works?**

40. **Rajan asked for a crypto-native platform. You built an equity stock screener. Why did you change the product without telling him?**

---

## ROUND 5: THE DEMANDS (Force him to show proof)

41. **Screen share right now. Show me the directory structure of the codebase. I want to see the files for all 8 engines. Not screenshots — live screen share.**

42. **Run the test suite. Show me all tests passing. How many tests? What's the coverage percentage?**

43. **Show me a recent API request and response. I want to see the actual JSON for a portfolio allocation signal. Not documentation — the real thing.**

44. **Show me the database. I want to see the evidence table with actual rows. What does one row of evidence look like?**

45. **Deploy the YRN Execution Node for me right now. I want to see it running. I want to see it connect to a test exchange. I want to see it place a paper trade.**

46. **Show me the smart contract for the YRN token. Contract address. Which blockchain. The actual verified contract on Etherscan or equivalent.**

47. **Run a backtest with the exact parameters from the website. Show me the equity curve. Show me the drawdown periods. Show me the monthly returns.**

48. **Show me the git log for the past 30 days. I want to see who's committing, what files changed, and the commit messages.**

49. **What's the infrastructure cost? AWS? GCP? What's the monthly bill? How much compute does the model training use?**

50. **I want to talk to your team. Who else is working on this? Names. Roles. LinkedIn profiles. A solo developer didn't build 8 quant engines in hours.**

---

## HOW TO USE THESE QUESTIONS

### Step 1: Send all 50 to Jackie in writing (email/ WhatsApp)
Tell him: *"Rajan asked me to review the technical implementation before we proceed. Please answer all 50 questions in writing. Specifics only — no marketing language."*

### Step 2: Give him 48 hours
A real developer with actual code can answer 80%+ of these in a few hours. A fraud will:
- Ask for more time (stalling)
- Give vague answers ("it's complex...")
- Get defensive ("you don't understand...")
- Refuse to answer ("IP concerns...")

### Step 3: Cross-reference every claim
- If he names a library → check if it exists and does what he claims
- If he gives a formula → verify it's the right formula for the job
- If he shows code → ask a developer friend to review it
- If he names team members → check their LinkedIn and reach out

### Step 4: The screen share demand
If he answers in writing, demand a live screen share. A real developer shows their IDE, runs tests, deploys systems. A fraud makes excuses.

---

## WHAT HIS ANSWERS WILL TELL YOU

| If he says... | It means... |
|---|---|
| "I'll need a few days to prepare answers" | He doesn't have the code. He's buying time to Google. |
| "The IP is sensitive, I can't share details" | A real contractor shares everything with the client who paid for it. |
| "It's very complex, you wouldn't understand" | He's hoping you'll give up asking. |
| "I used Python with [specific library]" | Check the library. If it matches the function, might be real. |
| "Let me show you on a screen share" | Good sign. But watch — is he showing a demo or the actual codebase? |
| "I built it alone in 2 weekends" | IMPOSSIBLE for 8 quant engines. Mathematical impossibility. |
| "The engines are [specific formulas]" | Write them down. Verify with a quant developer or professor. |
| "I can't deploy the node, it's not ready" | Then he hasn't built it. Period. |
| "The YRN token is on [chain], contract [address]" | Check the blockchain. If no contract exists = lie. |

---

## THE ULTIMATE TEST

**Ask him this one question and watch his face:**

> *"Jackie, if I pay you $10,000 right now, can you deploy the YRN Execution Node on my laptop today, connect it to my Binance account in paper trading mode, and show it autonomously managing a portfolio based on the 8 engines? Not the stock screener — the actual crypto execution platform Rajan specified. Yes or no?"*

**If he says anything other than an immediate, confident "Yes, let's do it right now" — he hasn't built it.**

A real developer with working code deploys it eagerly. They WANT to show it off. They can't wait to demonstrate. A fraud finds excuses.

---

## WHAT TO TELL RAJAN

**"Uncle, I've prepared 50 technical questions. If Jackie has actually built what he claims, he can answer these in a few hours. If he can't — or if he deflects, delays, or gets defensive — then he hasn't built it. We're not asking him to prove the system works perfectly. We're asking him to prove it EXISTS. There's a big difference. A real developer LOVES showing their work. A fraud hates it. Watch which one Jackie is."**

---

*Prepared for: Rajan's representative*
*Date: July 14, 2025*
*Purpose: Technical due diligence on contractor claims*
