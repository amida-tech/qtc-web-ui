import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import config from 'config/configFromCookie'
import 'styles/qtcstyles.scss'

const { applicationPresentationName } = config
// const LOCAL_API_URL = 'localhost:5000/test_dbq'
const CLOUD_API_URL = 'http://ec2-54-144-23-157.compute-1.amazonaws.com/test_dbq/';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbqnum: '',
            file: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        console.log(evt.target.name, evt.target.value)
        this.setState({[evt.target.name]: evt.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.dbqnum, "dbq")
        if(this.state.dbqnum == '') {
            alert('Error: Please enter a valid DBQ number.');
            this.setState({ dbqnum: ''});
            return;
        }
        // try {
        let files = event.target.files;
        console.log(this.state.file, "filesss")
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload =(event) => {
            const requestURL = CLOUD_API_URL;
            const formData = {file:event.target.result, dbqnum: '16025'}
            fetch(requestURL, {
                method: 'POST',
                body: formData
            }).then((response) => {
                return response;
            });


        }
        // } catch(error) {
        //     alert('Error: Please enter a valid DBQ number.');
        // }
        this.setState({ dbqnum: '' });

    }
    
    render() {
        return (
            <div className='app-page' id='test-page-div'>
                <h2>Testing a Mapping</h2>
                Please enter a DBQ number corresponding to the mapping file you would like to test.
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <br></br>
                    <div className="field">
                        <label className="label">DBQ Number:</label>
                        <div className="control">
                            <input className="input" type="text" name="dbqnum" value={this.state.dbqnum}  onChange={this.handleChange}/>
                        </div>
                        <label className="label">Upload Mapping File:</label>
                        <div className="control">
                            <input className="input" type="file" name="dbqfile" value={this.state.file} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <br></br>
                    <input type="submit" value="Begin Test"/>
                </form>
                <br></br>
            </div>
        )
    }
}
export default FileUpload;