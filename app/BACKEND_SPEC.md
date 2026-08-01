# YARN Protocol — Backend Specification
## For Backend Developer — Complete API Contract

---

## 1. Authentication & User Management

### POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "string (min 8, requires uppercase + number)",
  "name": "string"
}
```
Response: `{ "token": "jwt", "user": { "id", "email", "name" } }`

### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "string"
}
```
Response: `{ "token": "jwt", "user": { "id", "email", "name" } }`

### GET /api/auth/me
Headers: `Authorization: Bearer <jwt>`
Response: `{ "id", "email", "name", "role", "createdAt" }`

---

## 2. Portfolio Data

### GET /api/portfolio
Headers: `Authorization: Bearer <jwt>`
Response:
```json
{
  "totalValue": 1000000,
  "totalCost": 640300,
  "totalPnL": 359700,
  "totalPnLPercent": 56.2,
  "dayPnL": 8420,
  "dayPnLPercent": 0.84,
  "activePositions": 8,
  "cashReserve": 70000,
  "positions": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "allocation": 25.4,
      "value": 254000,
      "entry": 42500,
      "current": 67231,
      "pnl": 58.2,
      "type": "crypto"
    }
  ],
  "history": [
    { "date": "2025-01", "value": 920000 },
    { "date": "2025-02", "value": 880000 }
  ],
  "allocation": [
    { "name": "Crypto L1", "value": 56.4, "color": "#ccff00" },
    { "name": "Equities", "value": 29.8, "color": "#00ff9d" }
  ]
}
```

### GET /api/portfolio/attribution
Response:
```json
{
  "byAsset": [
    { "asset": "BTC", "contribution": 18.2 }
  ],
  "byEngine": [
    { "engine": "Conviction", "contribution": 22.4 }
  ]
}
```

---

## 3. Screener

### GET /api/screener?filter=ALL|CONFIRMED|MIXED&search=&page=1
Response:
```json
{
  "picks": [
    {
      "symbol": "3436.T",
      "name": "SUMCO CORP",
      "country": "JP",
      "sector": "Technology",
      "momentum": 139.1,
      "conviction": 92,
      "signal": "STRONG BUY",
      "agentVerdict": "Underweight",
      "final": "MIXED",
      "price": 5244
    }
  ],
  "confirmed": 2,
  "mixed": 10,
  "total": 12
}
```

---

## 4. Engines

### GET /api/engines
Response:
```json
{
  "engines": [
    {
      "id": "conviction",
      "name": "Conviction Engine",
      "description": "Scores investment opportunities by confidence level",
      "status": "active",
      "version": "2.1.4",
      "accuracy": 75.7,
      "lastRun": "2 min ago",
      "params": {
        "signalWeights": { "momentum": 0.35, "fundamentals": 0.25 },
        "minConfidence": 65
      }
    }
  ]
}
```

### POST /api/engines/:id/toggle
Toggle active/paused status.
Response: `{ "id", "status": "active|paused" }`

### POST /api/engines/:id/reset
Reset engine accuracy/counters.
Response: `{ "id", "accuracy": 0, "lastRun": "just now" }`

### POST /api/engines/bulk-action
Body: `{ "action": "pause-all" | "start-all" }`
Response: `{ "affected": 8 }`

---

## 5. Risk

### GET /api/risk/metrics
Response:
```json
{
  "portfolioVaR": 4.2,
  "portfolioCVaR": 6.8,
  "maxDrawdown": 8.4,
  "currentDrawdown": 2.1,
  "sharpeRatio": 2.14,
  "sortinoRatio": 3.21,
  "beta": 0.87,
  "correlationSpy": 0.62,
  "volatility30d": 18.5
}
```

### GET /api/risk/correlation
Response: 7x7 matrix of correlations between portfolio assets.

### GET /api/risk/alerts?status=all|active|resolved
Response:
```json
{
  "alerts": [
    {
      "id": 1,
      "severity": "high|medium|low",
      "message": "string",
      "time": "14:15",
      "status": "active|resolved",
      "detail": "string (full resolution description)"
    }
  ]
}
```

### POST /api/risk/alerts/:id/resolve
### POST /api/risk/alerts/:id/dismiss
### POST /api/risk/kill-switch
Trigger emergency liquidation. Logs reason and timestamp.

---

## 6. Evidence

### GET /api/evidence?search=&engine=&action=&page=1&limit=50
Response:
```json
{
  "records": [
    {
      "id": "EV-28471",
      "timestamp": "2025-07-14 14:32:18",
      "action": "Position increased",
      "asset": "BTC",
      "details": "Conviction score 92 → increased allocation 22% → 25.4%",
      "engine": "Conviction + Allocation",
      "hash": "0x8f3a...b2e1",
      "blockchainTx": "0xabc...def" // optional — null if not yet on-chain
    }
  ],
  "total": 28471,
  "today": 342
}
```

### GET /api/evidence/export?format=csv&search=&engine=&action=
Returns CSV file download.

### GET /api/evidence/:id/verify
Verify attestation hash on blockchain.
Response: `{ "verified": true, "txHash", "timestamp", "merkleRoot" }`

---

## 7. Settings (User Policy)

### GET /api/settings
Response:
```json
{
  "targetReturn": 25,
  "maxDrawdown": 15,
  "compoundingPercent": 80,
  "harvestRules": [
    { "gain": 10, "harvest": 20 },
    { "gain": 20, "harvest": 30 }
  ],
  "exitConditions": [
    { "condition": "Target return reached", "action": "Harvest 50% + continue" }
  ],
  "riskTolerance": "Moderate-Aggressive",
  "maxPositionSize": 25,
  "allocation": { "crypto": 70, "equities": 25, "cash": 5 }
}
```

### POST /api/settings
Body: full settings object.
Response: `{ "valid": true, "warnings": [], "errors": [], "impact": { "projectedReturn": 27.5, "projectedDrawdown": 15.8, "projectedSharpe": 1.74 } }`

Validation rules (implement server-side):
- targetReturn / maxDrawdown ratio must be <= 3.0
- maxPositionSize must be >= 5
- compoundingPercent 0 and 100 both trigger warnings

---

## 8. Workflows (NEW — Critical)

### Data Model

```typescript
interface WorkflowNode {
  id: string
  type: 'engine' | 'condition' | 'action' | 'data'
  subType: string        // e.g., 'conviction', 'buy', 'if'
  label: string
  description: string
  x: number              // canvas position
  y: number
  config: Record<string, any>  // node-specific configuration
  inputs: number         // number of input ports
  outputs: number        // number of output ports
  color: string          // hex color for UI
}

interface WorkflowEdge {
  id: string
  fromNode: string       // source node ID
  fromPort: number       // output port index
  toNode: string         // target node ID
  toPort: number         // input port index
}

interface Workflow {
  id: string
  userId: string
  name: string
  description: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  status: 'draft' | 'active' | 'paused'
  createdAt: string
  updatedAt: string
  lastRunAt: string | null
  runCount: number
}
```

### GET /api/workflows
Returns user's workflows list (without full node/edge data — just metadata).

### GET /api/workflows/:id
Returns full workflow with nodes and edges.

### POST /api/workflows
Create new workflow.
Body:
```json
{
  "name": "My Strategy",
  "description": "string",
  "nodes": [ /* WorkflowNode[] */ ],
  "edges": [ /* WorkflowEdge[] */ ]
}
```

### PUT /api/workflows/:id
Update workflow (nodes, edges, name, etc.).

### POST /api/workflows/:id/toggle
Toggle status: draft → active, active → paused, paused → active.

### DELETE /api/workflows/:id
Soft delete (set deletedAt).

### POST /api/workflows/:id/duplicate
Create a copy with "(Copy)" suffix.

### POST /api/workflows/:id/validate
Validate workflow graph before activation.
Checks:
- No disconnected nodes (all non-data nodes must have at least one input)
- No cycles (DAG validation)
- Required nodes present (at least one action)
- Engine compatibility (certain engines must come before others)

Response:
```json
{
  "valid": true|false,
  "errors": ["Node XYZ has no incoming connection"],
  "warnings": ["No STOP node — workflow will run indefinitely"]
}
```

### POST /api/workflows/:id/execute
Execute workflow once (for testing/backtesting).
Body: `{ "dryRun": true, "dateRange": { "from": "2024-01-01", "to": "2024-12-31" } }`
Response: `{ "trades": [], "logs": [], "pnl": 0 }`

### GET /api/workflows/:id/runs
Get execution history.

---

## 9. WebSocket Events (Real-Time)

Connect to `/ws` with JWT token.

### Client → Server
- `subscribe:portfolio` — start receiving portfolio updates
- `subscribe:engines` — start receiving engine events
- `subscribe:risk` — start receiving risk alerts

### Server → Client
- `portfolio.update` — price changes, P&L updates
- `engine.event` — engine decisions (conviction scored, allocation made, etc.)
- `risk.alert` — new risk alerts
- `evidence.new` — new attestation record created

Example event:
```json
{
  "type": "engine.event",
  "data": {
    "engine": "Conviction",
    "action": "Position increased",
    "asset": "BTC",
    "details": "Score 92 → allocation +3%",
    "timestamp": "2025-07-14T14:32:18Z"
  }
}
```

---

## 10. Database Schema (Suggested)

### Tables

```sql
-- users
id (uuid, PK)
email (string, unique)
password_hash (string)
name (string)
role (enum: admin, analyst, trader, viewer)
created_at (timestamp)

-- portfolios
id (uuid, PK)
user_id (uuid, FK → users)
total_value (decimal)
cash_reserve (decimal)
created_at (timestamp)

-- positions
id (uuid, PK)
portfolio_id (uuid, FK → portfolios)
symbol (string)
name (string)
allocation (decimal)
value (decimal)
entry_price (decimal)
current_price (decimal)
pnl_percent (decimal)
type (enum: crypto, equity, stable)

-- engine_configs
id (uuid, PK)
engine_id (string, unique: conviction, allocation, etc.)
user_id (uuid, FK → users)
params (jsonb)
status (enum: active, paused, calibrating)
accuracy (decimal)
version (string)

-- risk_alerts
id (uuid, PK)
user_id (uuid, FK → users)
severity (enum: high, medium, low)
message (text)
detail (text)
status (enum: active, resolved, dismissed)
created_at (timestamp)
resolved_at (timestamp)

-- evidence
id (string, PK: EV-XXXXX)
user_id (uuid, FK → users)
timestamp (timestamp)
action (string)
asset (string)
details (text)
engine (string)
hash (string)
blockchain_tx (string, nullable)
created_at (timestamp)

-- settings
id (uuid, PK)
user_id (uuid, FK → users)
target_return (integer)
max_drawdown (integer)
compounding_percent (integer)
harvest_rules (jsonb)
exit_conditions (jsonb)
risk_tolerance (string)
max_position_size (integer)
allocation (jsonb)

-- workflows (CRITICAL TABLE)
id (uuid, PK)
user_id (uuid, FK → users)
name (string)
description (string)
nodes (jsonb)  -- WorkflowNode[]
edges (jsonb)  -- WorkflowEdge[]
status (enum: draft, active, paused)
run_count (integer, default 0)
last_run_at (timestamp, nullable)
created_at (timestamp)
updated_at (timestamp)
deleted_at (timestamp, nullable)

-- workflow_runs
id (uuid, PK)
workflow_id (uuid, FK → workflows)
status (enum: running, completed, failed, cancelled)
started_at (timestamp)
completed_at (timestamp)
trades_executed (integer)
logs (jsonb)
pnl (decimal)

-- notifications
id (uuid, PK)
user_id (uuid, FK → users)
type (enum: alert, info, success, warning)
title (string)
message (text)
read (boolean, default false)
created_at (timestamp)
```

---

## 11. Key Implementation Notes

### Workflow Engine (Backend Logic)
When a workflow is activated:
1. Parse the node graph (DAG)
2. Execute in topological order
3. Each engine node calls its respective engine service
4. Condition nodes evaluate and route to appropriate branch
5. Action nodes execute trades or send alerts
6. Every step creates an evidence record
7. Loop until STOP node or error

### Validation Rules
- Engine nodes MUST have at least one input (except data nodes)
- Action nodes MUST be reachable from at least one engine
- No cycles allowed in the graph
- Maximum 50 nodes per workflow
- Maximum 100 edges per workflow

### Performance
- Portfolio updates: every 2-5 seconds via WebSocket
- Engine events: every 30-120 seconds
- Risk alerts: real-time when thresholds are breached
- Evidence: logged synchronously with every engine action

---

*End of Backend Specification*
