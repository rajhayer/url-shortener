import React from 'react';

class AddShortPanel extends React.Component {

  constructor(props) {
    super(props);
    console.log('AddShortPanel props', {props})
    this.state = {
      origUrl: "",
      desiredUrl: "",
      inputCount: 0
    }
  }

  updateOrigUrl = (e) => {
    this.setState({origUrl: e.target.value})    
  }

  updateDesiredUrl = (e) => {
    this.setState({desiredUrl: e.target.value})    
  }

  bubbleClick = () => {
    if (this.props.addNewShort) {
      if (this.state.origUrl.trim() !== '') {
        this.props.addNewShort(this.state.origUrl, this.state.desiredUrl); 
      } else {
        console.log("b.prps", this.props)
        if (this.props.reportError) { 
          this.props.reportError("URL must be non-empty.");
        }
      }
    }
  }

  render = () => (
    <div className='input-panel'>
      <input id='input-url' type='text' placeholder='Enter Url to be shorten' name='inputUrl' value={this.state.origUrl} onChange={this.updateOrigUrl} required />
      <input id='desired-url' type='text' placeholder='Enter Desired short Url' name='desiredUrl' value={this.state.desiredUrl} onChange={this.updateDesiredUrl} />
      <button onClick={this.bubbleClick}>Shorten</button>
    </div>
  )
}

export default AddShortPanel;