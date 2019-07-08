import React, { Component } from 'react'
import 'styles/qtcstyles.scss'
import config from 'config/configFromCookie'

const { apiURL } = config

/*
 * DevelopPage: React frontend for --dev functionality.
 *
 * 
 * 
*/
function DevelopPage() {
    return (
        <div className='app-page' id='develop-page-div'>
            <h2>Development Mode</h2>
            <p>
                Please fill out the fields below to generate a mapping file.
            </p>
        </div>
    )
}

export default DevelopPage;
