import React from 'react';
import { getShortUrl, getAll } from './Service.js';
import { } from './karius.css';
import ShortsList from './ShortsList';
import AddShortPanel from './AddShortPanel';
import ErrorMsg from './ErrorMsg';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputCount: 0,
      allAccessUrls: [],
      errMsg: ""
    }
  }

  componentDidMount = () => this.reloadShortsList()

  addNewShort = (url, desiredUrl) => {
    getShortUrl(url, desiredUrl)
      .then((response) => {
        console.log("Clearing state")
        this.setState(state => ({
          inputCount: state.inputCount++ // Use to update the key of AddShortPanel to trigger a re-render
        }));
        // Reload our list after successfully adding a new short url
        this.reloadShortsList();
      })
      .catch((error) => {
        if (error.toString().indexOf("Error: Conflict") > -1) {
          this.reportError("Desired URL is already in-use.")
        } else {
          this.reportError("Unknown server error.")
        }
      })
  }

  reportError = (msg) => {
    this.setState({ errMsg: msg });
    // Disappear the message in a bit
    setTimeout(
      () => { this.setState({ errMsg: "" }) },
      1000
    );
  }

  reloadShortsList() {
    console.log('Reloading list if existing shorts..');
    getAll()
      .then((response) => {
        this.setState({ allAccessUrls: response });
      })
      .catch((error) => {
        console.log(`Error while calling getShortUrl - ${error}`);
      })
  }

  render = () => {
    console.log("app.rendering: ", this.state.errMsg)
    return (
      <div className='app'>
        <AddShortPanel origUrl={this.state.origUrl} key={this.state.inputCount} addNewShort={this.addNewShort} reportError={this.reportError} />
        {(this.state.errMsg !== "") ? (<ErrorMsg key={this.state.errMsg} msg={this.state.errMsg} />) : ""}
        <ShortsList urls={this.state.allAccessUrls} />
      </div>
    )
  }
}

export default App;