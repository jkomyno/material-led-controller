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
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';

class RowButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      called: false,
      defaultInterval: 1000,
      value: "",
      warningDialog: false
    }

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnClick(){
    if(!this.state.called){
      this.setState({
        called: true
      })
    }

    console.log(this.refs.myInterval.getValue());

    this.setState({
      defaultInterval: this.refs.myInterval.getValue(),
      value: ""
    });
  }

  handleInputChange(event) {
    this.setState({
        value: event.target.value
    })
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
            />
            <RaisedButton label={buttonLabel} onClick={this.handleOnClick} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default RowButton;