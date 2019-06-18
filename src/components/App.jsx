import React from 'react'
import { hot } from 'react-hot-loader'

import config from 'config/configFromCookie'

const { applicationPresentationName } = config

// Just need to import this once somewhere so it ends up in the webpack dependency graph.
// eslint-disable-next-line no-unused-vars
import styles from 'styles/styles.scss'

const App = () => <div>This is {applicationPresentationName}</div>

export default hot(module)(App)
