const Joi = require('joi')
const logger = require('./winston')

const schema = Joi.object().keys({
  placeholderHtmlConfigValue: Joi.string().default('Some meta tag')
})

const result = Joi.validate({
  placeholderHtmlConfigValue: process.env.PLACEHOLDER_HTML_CONFIG_VALUE
}, schema)

if (result.error) {
  logger.error('htmlConfig.js joi validation failed with error: ' + result.error)
  process.exit(1)
}

module.exports = result.value
