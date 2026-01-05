# @log-ingestor/mssql

Disk-first Node.js logger with automatic ingestion into Microsoft SQL Server — no ELK, no log management headaches.

⚠️ **MSSQL database name is mandatory in the connection string.**
This package is the **MSSQL adapter** for the `log-ingestor` ecosystem.  
It writes structured logs to disk and reliably ingests them into **Microsoft SQL Server** using a high‑performance background ingestor.

---

## Why this exists

Most Node.js applications:
- Print logs to console
- Rotate files manually
- Lose logs on crashes
- Overpay for ELK

This solves that with a simple model:

**App → disk → background ingestor → MSSQL**

No Kafka. No ELK. No ops pain.

---

## Features

- Structured JSON logging
- Disk-first (crash-safe)
- Automatic background ingestion
- Batch inserts with retry
- Auto table creation
- One ingestor per process
- Production-ready defaults

---

## Installation

```bash
npm install @log-ingestor/mssql
```

---

## Basic Usage

```js
const { createLogger } = require("@log-ingestor/mssql");

const logger = createLogger({
  service: {
    name: "order-service",
    version: "1.0.0"
  },
  logging: {
    logDir: "./logs"
  },
  db: {
    type: "mssql",
    connection:
      "Server=localhost,1433;" +
      "Database=logsdb;" +
      "User Id=sa;" +
      "Password=***;" +
      "Encrypt=true;" +
      "TrustServerCertificate=true;"
  },
  batch: {
    size: 200
  }
});

logger.info("order created", { orderId: 123 });
logger.error("payment failed", { reason: "timeout" });
```

That’s it.  
The ingestor starts automatically in the background.

---

## How it works

1. Logs are written as JSON lines to disk
2. A background ingestor binary starts automatically
3. Logs are batched and inserted into MSSQL
4. Retries happen automatically on failure

Your app never blocks on DB writes.

---

## Configuration

### Logger options

```ts
{
  service: {
    name: string,
    version?: string
  },
  logging: {
    logDir?: string // default: ./logs
  },
  db: {
    type: "mssql",
    connection: string,
    table?: string // default: unified_logs
  },
  batch?: {
    size?: number        // default: 200
    maxRetries?: number  // default: 3
  }
}
```

---

## Output format (example)

```json
{
  "logId": "uuid",
  "timestamp": "2026-01-05T10:20:30.000Z",
  "level": "INFO",
  "service": {
    "name": "order-service",
    "version": "1.0.0"
  },
  "message": "order created",
  "data": {
    "orderId": 123
  }
}
```

---

## Internal components

- **@log-ingestor/core** – shared logger logic
- **@log-ingestor/mssql** – MSSQL ingestion adapter
- **Ingestor binary** – high-performance background worker

---

## What this is NOT

- Not a console logger
- Not a replacement for application metrics
- Not an ELK stack

This is for **durable, queryable application logs**.

---

## Roadmap

- PostgreSQL adapter
- MySQL adapter
- MongoDB adapter
- DynamoDB adapter

---

## License

MIT
