const { Logger } = require("./logger");

function createLogger(options) {
  return new Logger(options);
}

module.exports = {
  createLogger
};