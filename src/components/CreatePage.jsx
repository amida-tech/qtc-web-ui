import React, { Component } from 'react'
import 'styles/qtcstyles.scss'
import config from 'config/configFromCookie'
import { callAPI, downloadFile } from './HelperFunctions';

const { apiURL } = config

/*
 * CreatePage: React frontend for --create functionality.
 *
 * Prompts the user for a DBQ number, calls the corresponding mapping_data_frames 
 * API endpoint, and downloads the resulting file.
*/
class CreatePage extends Component {
    state = {
        dbqnum: '',
        isCreating: false,
        isDownloading: false
    };

    resetForm = () => {
        this.setState({ 
            dbqnum: '',
            isCreating: false,
            isDownloading: false 
        });
    }

    handleChange = () => { 
        this.setState({ dbqnum: event.target.value }); 
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
            const response = await callAPI(requestURL, 'GET', '');
            downloadFile(requestURL, this.state.dbqnum);

            this.setState({ 
                isCreating: false,
                isDownloading: true
            });
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
                <h2>Create a Mapping</h2>
                <p>
                    Please enter a valid DBQ number below to generate its mapping file.
                </p>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <br></br>
                    <div className="field">
                        <label className="label">DBQ Number:</label>
                        <div>
                            <input className="input" type="text" name="dbqnum" value={this.state.dbqnum} onChange={this.handleChange}/>
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

export default CreatePage;
