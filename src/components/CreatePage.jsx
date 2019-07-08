import React, { Component } from 'react'
import 'styles/qtcstyles.scss'
import config from 'config/configFromCookie'

const { apiURL } = config

/*
 * CreatePage: React frontend for --create functionality.
 *
 * Prompts the user for a DBQ number, calls the corresponding mapping_data_frames 
 * API endpoint, and downloads the resulting file.
*/
class CreatePage extends Component {
    constructor(props) {
        /* Initializes app's dbqnum property and loading states and binds form event functions. */
        super(props);
        this.state = {
            dbqnum: '',
            isCreating: false,
            isDownloading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm() {
        this.setState({ dbqnum: '' });
        this.setState({ isCreating: false });
        this.setState({ isDownloading: false });
    }

    handleChange(event) {
        /* When input field changes, updates DBQ#. */
        this.setState({ dbqnum: event.target.value });
    }

    async handleSubmit(event) {
        /* When form is submitted, fetches mapping file from API and downloads it. */
        event.preventDefault();
        this.setState({ isCreating: true });

        // catches blank input error
        if (this.state.dbqnum == '') {
            this.resetForm();
            alert('Error: Please enter a valid DBQ number.');
            return;
        }
        try {
            // call to API
            var requestURL = apiURL + 'mapping_data_frames/' + this.state.dbqnum;
            const response = await fetch(requestURL);

            // create url pointing to returned file
            const fileLink = document.createElement('a');
            fileLink.href = requestURL;
            fileLink.setAttribute('download', this.state.dbqnum);
            document.body.appendChild(fileLink);
            // auto-click link to download file, then cleanup url
            fileLink.click();
            fileLink.parentNode.removeChild(fileLink);

            this.setState({ isCreating: false });
            this.setState({ isDownloading: true });
        } catch (error) {
            alert('Error: Please enter a valid DBQ number.');
        }
        // reset form
        //this.resetForm();
    }

    render() {
        /* Renders HTML form for user to enter a DBQ# and its mapping file. */
        // display run-time messages
        const isCreating = this.state.isCreating;
        const isDownloading = this.state.isDownloading;
        let createMsg, downloadMsg;
        if (isCreating) {
            createMsg = 'Creating mapping...';
        } else if (isDownloading) {
            createMsg = 'Creating mapping: done';
            downloadMsg = 'Downloading mapping...';
        } else {
            createMsg = '';
            downloadMsg = '';
        }

        return (
            <div className='app-page' id='create-page-div'>
                <h2>Create a Mapping</h2>
                Please enter a valid DBQ number below to generate its mapping file.
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <br></br>
                    <div className="field">
                        <label className="label">DBQ Number:</label>
                        <div className="control">
                            <input className="input" type="text" name="dbqnum" value={this.state.dbqnum} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <br></br>
                    <input type="submit" value="Download"/>
                    <div className="runtime-msg">
                        {createMsg} <br></br>
                        {downloadMsg}
                    </div>
                </form>
                <br></br>
            </div>
        );
    }
}

export default CreatePage;
