import React, { Component } from 'react'
import 'styles/qtcstyles.scss'
import config from 'config/configFromCookie'
import { callAPI, downloadFile } from './HelperFunctions';

const { apiURL } = config

/*
 * DevelopPage: React frontend for --dev functionality.
 *
 * Prompts the user for a DBQ number and thresholds, calls the corresponding 
 * mapping_data_frames API endpoint, and downloads the resulting file.
*/
class DevelopPage extends Component {
    state = {
        dbqnum: '',
        matchThresh: 0,
        scrapeThresh: 0,
        isCreating: false,
        isDownloading: false
    };

    resetForm = () => {
        this.setState({ 
            dbqnum: '',
            matchThresh: 0,
            scrapeThresh: 0,
            isCreating: false,
            isDownloading: false
        });
    }

    handleChange = () => { 
        this.setState({ [event.target.name]: event.target.value }); 
    };

    /* When form is submitted, fetches mapping file from API and downloads it. */
    handleSubmit = async () => {
        event.preventDefault();
        this.setState({ isCreating: true });

        // catches blank input error
        if (this.state.dbqnum == '') {
            this.resetForm();
            alert('Please enter a valid DBQ number.\n' + error);
            return;
        }
        try {
            // call API and download file
            var requestURL = apiURL + 'mapping_data_frames/' + this.state.dbqnum;
            var data = {
                "threshold": this.state.matchThresh,
                "thresholdForScraping": this.state.scrapeThresh
            };
            const response = await callAPI(requestURL, 'POST', data);
            downloadFile(requestURL, this.state.dbqnum);

            this.setState({ isCreating: false });
            this.setState({ isDownloading: true });
        } catch (error) {
            alert('Please enter a valid DBQ number.\n' + error);
        }
        // reset form
        this.resetForm();
    }

    /* Renders HTML form for user to enter a DBQ# and mapping file. */
    render() {
        // display run-time messages
        const isCreating = this.state.isCreating;
        const isDownloading = this.state.isDownloading;
        let downloadMsg;
        if (isCreating) {
            downloadMsg = 'Creating mapping...';
        } else if (isDownloading) {
            downloadMsg = 'Downloading file...';
        } else {
            downloadMsg = '';
        }

        return (
            <div className='app-page'>
                <h2>Development Mode</h2>
                <p>
                    Please fill out the fields below to generate a mapping file.<br></br>
                    Blank threshold fields will be set to 80 by default.
                </p>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <br></br>
                    <div className="field">
                        <label className="label">DBQ Number:</label>
                        <div>
                            <input className="input" type="text" name="dbqnum" value={this.state.dbqnum} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Matching Threshold (0-100):</label>
                        <div>
                            <input className="input" type="number" name="matchThresh" min="0" max="100" value={this.state.matchThresh} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Scraping Threshold (0-100):</label>
                        <div>
                            <input className="input" type="number" name="scrapeThresh" min="0" max="100" value={this.state.scrapeThresh} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <br></br>
                    <input type="submit" value="Download"/>
                    <div className="runtime-msg">
                        {downloadMsg}
                    </div>
                </form>
                <br></br>
            </div>
        );
    }
}

export default DevelopPage
