import React, { Component } from 'react'
import config from 'config/configFromCookie'
import { maxHeaderSize } from 'http';
const { apiURL } = config
/*
 * TestPage: React frontend for --test functionality.
 *
 *
 *
*/
class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dbqnum: '',
      uploadInput: null,
      results: '',
      isTesting: false,
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.baseState = this.state
  }
  resetForm = () => {
    this.myFormRef.reset();
    this.setState(this.baseState)
  }

  handleUpload(ev) {
    ev.preventDefault();
    this.setState({ isTesting: true })
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('dbqnum', this.dbqnum.value);
    fetch(apiURL+'test_dbq', {
      method: 'POST',
      body: data,
    }).then(res => res.text())
      .then(text => this.setState({ results: text, isTesting: false}), (error) => { 
        if (error){
          alert('Please enter a valid DBQ number and upload a valid file.\n' + error)
          this.setState({ isTesting: false })
        }
      })
  }
  render() {
    let downloadMsg
    if (this.state.isTesting) {
      downloadMsg = 'Testing mapping...'
    }
    else {
      downloadMsg = ''
    }
    return (
        <div className='app-page' id='test-page-div'>
            <h2>Testing a Mapping</h2>
            <p> Please enter a DBQ number corresponding to the mapping file you would like to test. </p>
            <form ref={(el) => this.myFormRef = el} onSubmit={this.handleUpload} onReset={this.resetForm}>
                <div className="field">
                    <label className="label">DBQ Number:</label>
                    <div className="control">
                        <input ref={(ref) => { this.dbqnum = ref; }} type="text"/>
                    </div>
                    <label className="label">Upload Mapping File:</label>
                    <div className="control">
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </div>
                </div>
                <input type="submit" value="Begin Test"/>
                <div className="runtime-msg">
                  {downloadMsg}
                </div>
                <textarea cols="70" rows="15" value={this.state.results} readOnly/>
            </form>
            <button onClick={this.resetForm} type="button">Reset</button>
        </div>
    );
  }
}

export default TestPage
