const Joi = require('joi')
const logger = require('./winston')

const schema = Joi.object().keys({
  port: Joi.number().integer().required()
})

const result = Joi.validate({
  port: process.env.QTC_WEB_UI_PORT
}, schema)

if (result.error) {
  logger.error('serverConfig.js joi validation failed with error: ' + result.error)
  process.exit(1)
}

module.exports = result.value
