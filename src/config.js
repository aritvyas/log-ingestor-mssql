function buildIngestorConfig({ logDir, db, batch }) {
  if (!logDir) {
    throw new Error("logDir is required");
  }

  if (!db?.type || !db?.connection) {
    throw new Error("db.type and db.connection are required");
  }

  if (!/Database=/i.test(db.connection)) {
    throw new Error(
      "MSSQL connection string must include Database=<db_name>"
    );
  }

  return {
    logDir,
    db: {
      type: db.type,
      connection: db.connection,
      table: db.table || "unified_logs"
    },
    batch: {
      size: batch?.size || 200,
      maxRetries: batch?.maxRetries || 3
    }
  };
}

module.exports = { buildIngestorConfig };