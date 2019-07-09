import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import IndexPage from './IndexPage'
import CreatePage from './CreatePage'
import DevelopPage from './DevelopPage'
import TestPage from './TestPage'
import NotFound from './NotFound'

const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/create" component={CreatePage} />
      <Route path="/develop" component={DevelopPage} />
      <Route path="/test" component={TestPage} />
      <Route component={NotFound} />
    </Switch>
  </main>
)

// hot-reload page
export default hot(module)(Main)
