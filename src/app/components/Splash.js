/**
 * In this file I setup a basic splashscreen
 * represented by a dialog launched on startup
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Splash extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: true,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    // </ >

    const splashTitle = "Welcome to Material Led Controller";
    const welcomeMessage = "Developed by Alberto Schiabel - 5^A";

    if(this.props.display){
      return (
        <Dialog
          open={this.state.open}
          title={splashTitle}
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
          ref="mySplashScreen"
        >
          {welcomeMessage}
        </Dialog>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Splash;