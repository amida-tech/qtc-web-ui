const { configuredFormatter } = require('winston-json-formatter')

const { createLogger, transports } = require('winston')
const pjson = require('../../package.json')
const config = require('./serverConfig')

const logger = createLogger({
  level: config.logLevel,
  transports: [
    new transports.Console()
  ]
})

const options = {
  service: 'orange-web',
  logger: 'application-logger',
  version: pjson.version
}

logger.format = configuredFormatter(options)

module.exports = logger
