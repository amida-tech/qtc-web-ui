import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import config from 'config/configFromCookie'
import styles from 'styles/styles.scss'

const { applicationPresentationName } = config

const LOCAL_API_URL = 'http://127.0.0.1:5000/mapping_data_frames/'
const CLOUD_API_URL = 'http://ec2-54-144-23-157.compute-1.amazonaws.com/mapping_data_frames/';

/*
 * GenerateMappingApp: React frontend for --create functionality.
 *
 * Prompts the user for a DBQ number, calls the corresponding mapping_data_frames 
 * API endpoint, and downloads the resulting file.
*/
class GenerateMappingApp extends Component {
    constructor(props) {
        /*
         * Initializes app's dbqnum property and binds form event functions.
        */

        super(props);
        this.state = { dbqnum: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        /*
         * When input field changes, updates DBQ#.
        */

        this.setState({ dbqnum: event.target.value });
    }

    async handleSubmit(event) {
        /*
         * When form is submitted, fetches mapping file from API and downloads it.
        */

        event.preventDefault();

        try {
            // call to API
            var requestURL = CLOUD_API_URL + this.state.dbqnum;
            const response = await fetch(requestURL);

            // confirm returned file type is spreadsheet
            var contentType = response.headers.get('content-type');
            if(!contentType || !contentType.includes('spreadsheetml')) {
                throw new TypeError("Error downloading mapping (bad file type)");
            }

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
        /*
         * Renders HTML form for user to enter a DBQ# and its generate mapping.
        */

        return (
            <div className="App">
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

// hot-reload page
export default hot(module)(GenerateMappingApp)
