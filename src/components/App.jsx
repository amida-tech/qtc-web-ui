import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { hot } from 'react-hot-loader'

import 'styles/qtcstyles.scss'

import IndexPage from './IndexPage';
import CreatePage from './CreatePage';
import DevelopPage from './DevelopPage';
import TestPage from './TestPage';
import NotFound from './NotFound';

/*
 * AppNavigator: Navigation menu that provides links to show the HTML 
 * corresponding with each endpoint (create, develop, and test).
*/
function AppNavigator() {
    // return navigation menu
    return (
        <Router>
        <div id='app-div'>
            <div className='header'>
                <img id='logo' src='/public/assets/amida-logo.png' alt="Amida logo"></img>
                <div id='nav-bar-div'>
                    <ul>
                        <li><Link to="/" className='react-link'>HOME</Link></li>
                        <li><Link to="/create" className='react-link'>CREATE</Link></li>
                        <li><Link to="/develop" className='react-link'>DEVELOP</Link></li>
                        <li><Link to="/test" className='react-link'>TEST</Link></li>
                    </ul>
                </div>
            </div>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/create" component={CreatePage} />
                <Route path="/develop" component={DevelopPage} />
                <Route path="/test" component={TestPage} />
                <Route component={NotFound} />
            </Switch>
            <div id='footer'></div>
        </div>
        </Router>
    );
}

// hot-reload page
export default hot(module)(AppNavigator)
