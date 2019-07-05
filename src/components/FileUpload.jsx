import React, { Component } from 'react'
import config from 'config/configFromCookie'
import 'styles/qtcstyles.scss'

const { applicationPresentationName } = config
const LOCAL_API_URL = `http://127.0.0.1:5000/test_dbq`
const CLOUD_API_URL = 'http://ec2-54-144-23-157.compute-1.amazonaws.com/test_dbq';

class FileUpload extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          dbqnum: '',
          uploadInput: ''
        };
    
        this.handleUpload = this.handleUpload.bind(this);
      }
    
      handleUpload(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('dbqnum', this.dbqnum.value);
    
        fetch(CLOUD_API_URL, {
          method: 'POST',
          body: data,
        }).then(response => {
            window.location.assign(response.url);
        }).catch(err => console.log("error in api", err))
      }
    
      render() {
        return (
            <div className='app-page' id='test-page-div'>
                <h2>Testing a Mapping</h2>
                Please enter a DBQ number corresponding to the mapping file you would like to test.
                <form onSubmit={this.handleUpload}>
                    <br></br>
                    <div className="field">
                        <label className="label">DBQ Number:</label>
                        <div className="control">
                            <input ref={(ref) => { this.dbqnum = ref; }} type="text"/>
                        </div>
                        <br></br>
                        <label className="label">Upload Mapping File:</label>
                        <div className="control">
                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                        </div>
                    </div>
                    <br></br>
                    <input type="submit" value="Begin Test"/>
                </form>
                <br></br>
            </div>
        );
      }
}
export default FileUpload;