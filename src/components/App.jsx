import React from 'react'
import { hot } from 'react-hot-loader'

// eslint-disable-next-line no-unused-vars
import 'styles/styles.scss'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'

/*
 * App: Major components in QTC DBQ-mapping app.
*/
const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
)

// hot-reload page
export default hot(module)(App)
