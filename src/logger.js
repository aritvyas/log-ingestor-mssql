const { BaseLogger } = require("@log-ingestor/core");
const { startIngestor } = require("./ingestor");
const { buildIngestorConfig } = require("./config");

class Logger extends BaseLogger {
  constructor(options) {
    super(options);

    const ingestorConfig = buildIngestorConfig({
      logDir: options.logging?.logDir || "./logs",
      db: options.db,
      batch: options.batch
    });

    startIngestor(ingestorConfig);
  }
}

module.exports = { Logger };