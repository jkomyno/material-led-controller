/**
 * In this file I organise the view for
 * the input controllers
 * @TODO: add SnackBar onClick/onTouchTap
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';

class RowButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      called: false,
      defaultInterval: 1000,
      value: "",
      warningDialog: false,
      raisedButtonDisabled: true,
      errorText: ""
    }

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearText = this.clearText.bind(this);
    this.emitSocketEvent = this.emitSocketEvent.bind(this);
  }

  handleOnClick(){
    if(parseInt(this.state.value) == 0){
      console.log("The value was 0");
      this.setState({
        errorText: "The value cannot be 0",
        defaultInterval: 1000,
        value: ""
      });

    } else {

      this.clearText();
      console.log(this.state.defaultInterval);
      console.log(this.state.value);
      console.log(this.state.raisedButtonDisabled);

      this.emitSocketEvent();
    }
  }

  clearText(){
    this.setState({
      defaultInterval: this.refs.myInterval.getValue(),
      value: "",
      raisedButtonDisabled: true
    });
  }

  emitSocketEvent(){
    if(this.state.called){
      this.props.emit('clearInterval');
    }

    // socket.io-client: emitting the event "setInterval" to the GPIO server
    this.props.emit('setInterval', { led: this.props.led,
                                     interval: parseInt(this.state.value)
                                   });
    if(!this.state.called){
      this.setState({
        called: true
      })
    }
  }

  handleInputChange(event) {

    if(this.state.errorText != "" || parseInt(event.target.value) != 0){
      this.state.errorText = "";
    }

    // console.log(event.target.value);
    if(event.target.value != ""){
      this.setState({
          value: event.target.value,
          raisedButtonDisabled: false
      }) 
    } else {
      this.setState({
          raisedButtonDisabled: true,
          defaultInterval: 1000,
          value: ""
      })
    }
  }

  handleClose(){
    this.setState({
      warningDialog: false
    })
  }

  render() {

    const buttonLabel = "SET";
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.state.isWarningDialogOpen}
          onRequestClose={this.handleClose}
        >
          Open a Date Picker dialog from within a dialog.
          <TextField
            hintText={this.state.defaultInterval}
            value={this.state.value}
            floatingLabelText="Milliseconds"
            ref="myInterval"
            onChange={this.handleInputChange}
          />
        </Dialog>

        <Card>
          <CardTitle title={this.props.description} />
          <CardActions>
            <TextField
              hintText={this.state.defaultInterval}
              value={this.state.value}
              floatingLabelText="Milliseconds"
              ref="myInterval"
              onChange={this.handleInputChange}
              errorText={this.state.errorText}
            />
            <RaisedButton label={buttonLabel} disabled={this.state.raisedButtonDisabled} onClick={this.handleOnClick} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default RowButton;