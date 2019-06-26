import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { hot } from 'react-hot-loader'

import config from 'config/configFromCookie'
import styles from 'styles/styles.scss'

const { applicationPresentationName } = config

const LOCAL_API_URL = 'http://127.0.0.1:5000/mapping_data_frames/'
const CLOUD_API_URL = 'http://ec2-54-144-23-157.compute-1.amazonaws.com/mapping_data_frames/';

/*
 * IndexPage: Welcome/home page.
*/
function IndexPage() {
    return (
        <div class='app-page' id='create-page-div'>
            <h2>Welcome!</h2>
            You've reached the QTC Mapping-DBQs API.
            Please select a page from the navigation menu above in order to create a mapping, 
            generate a mapping in dev mode, or run tests on a pre-mapped DBQ.<br></br>
            Please reach out with any questions or concerns.
        </div>
    )
}

/*
 * CreatePage: React frontend for --create functionality.
 *
 * Prompts the user for a DBQ number, calls the corresponding mapping_data_frames 
 * API endpoint, and downloads the resulting file.
*/
class CreatePage extends Component {
    constructor(props) {
        /* Initializes app's dbqnum property and binds form event functions. */
        super(props);
        this.state = { dbqnum: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        /* When input field changes, updates DBQ#. */
        this.setState({ dbqnum: event.target.value });
    }

    async handleSubmit(event) {
        /* When form is submitted, fetches mapping file from API and downloads it. */
        event.preventDefault();
        try {
            // call to API
            var requestURL = CLOUD_API_URL + this.state.dbqnum;
            const response = await fetch(requestURL);

            // turn file into blob and create url pointing to it
            var blobResponse = await response.blob();
            const blobURL = window.URL.createObjectURL(new Blob([blobResponse]));
            const blobLink = document.createElement('a');
            blobLink.href = requestURL;
            blobLink.setAttribute('download', this.state.dbqnum);
            // auto-click link to download file, then cleanup url
            document.body.appendChild(blobLink);
            blobLink.click();
            blobLink.parentNode.removeChild(blobLink);

            this.setState({ dbqnum: '' });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    render() {
        /* Renders HTML form for user to enter a DBQ# and its mapping file. */
        return (
            <div class='app-page' id='create-page-div'>
                <h2>Create a Mapping</h2>
                Please enter a valid DBQ number below to generate its mapping file.
                <form onSubmit={this.handleSubmit}>
                    <br></br>
                    <div className="field">
                        <label className="label">DBQ Number:</label>
                        <div className="control">
                            <input className="input" type="text" name="dbqnum" value={this.state.dbqnum} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <br></br>
                    <input type="submit" value="Download Mapping"/>
                </form>
                <br></br>
            </div>
        );
    }
}

/*
 * DevelopPage: React frontend for --dev functionality.
 *
 * 
 * 
*/
function DevelopPage() {
    return (
        <div class='app-page' id='develop-page-div'>
            <h2>Development Mode</h2>
            Please fill out the fields below to generate a mapping file.
        </div>
    )
}

/*
 * TestPage: React frontend for --test functionality.
 *
 * 
 * 
*/
function TestPage() {
    return (
        <div class='app-page' id='test-page-div'>
            <h2>Test a Mapping</h2>
            Please enter a valid DBQ number below, then choose the mapping file you want to test.
        </div>
    )
}

/*
 * NotFound: Error page for when a user tries to go to any unrecognized URL on the domain.
*/
function NotFound() {
    return (
        <div class='app-page' id='not-found-div'>
            <h2>Not Found</h2>
            Sorry, that page doesn't exist. Try selecting a page from the navigation menu 
            above in order to create a mapping, generate a mapping in dev mode, 
            or run tests on a pre-mapped DBQ.<br></br>
            Please reach out with any questions or concerns.
        </div>
    )
}

/*
 * AppNavigator: Navigation menu that provides links to show the HTML 
 * corresponding with each endpoint (create, develop, and test).
*/
function AppNavigator() {
    // return navigation menu
    return (
        <Router>
        <div class='app-page' id='navigator-div'>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/develop/">Develop</Link></li>
                    <li><Link to="/test/">Test</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/create/" component={CreatePage} />
                <Route path="/develop/" component={DevelopPage} />
                <Route path="/test/" component={TestPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
        </Router>
    );
}

// hot-reload page
export default hot(module)(AppNavigator)
