const configCookieRegexp = /qtcWebUiConfig=(.*?)(?:;|$)/
const match = configCookieRegexp.exec(document.cookie)
let config
let configAttempted = false
let configSuccessful

export const getConfigSuccessful = () => configSuccessful

if (!configAttempted) {
  configAttempted = true
  getConfigFromCookie()
}

function getConfigFromCookie () {
  if (match && match[1]) {
    try {
      config = JSON.parse(match[1])
      Object.freeze(config)
      configSuccessful = true
    }
    catch (err) {
      console.error('ERROR: getConfigFromCookie() JSON.parse() failed with error:')
      console.error(err)
      configSuccessful = true
    }
  }
  else {
    console.error('ERROR: getConfigFromCookie() regex match failed.')
    configSuccessful = true
  }
}

export default config
