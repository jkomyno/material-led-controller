/**
 * In this file I setup the header of the
 * SPA and the dialog launched on startup
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
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

    return (
      <div>
        <AppBar
          title="Material LED Controller"
        />

        <Dialog
          open={this.state.open}
          title="Welcome to Material Led Controller"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
        >
          Developed by Alberto Schiabel - 5^A
        </Dialog>
        
      </div>
    );
  }
}

export default Header;
