const Joi = require('joi')
const logger = require('./winston')

const schema = Joi.object().keys({
  applicationPresentationName: Joi.string().default('QTC Web UI'),
  apiURL: Joi.string()
})

const result = Joi.validate({
  applicationPresentationName: process.env.APPLICATION_PRESENTATION_NAME,
  apiURL: process.env.API_URL
}, schema)

if (result.error) {
  logger.error('bundleConfig.js joi validation failed with error: ' + result.error)
  process.exit(1)
}

module.exports = result.value
