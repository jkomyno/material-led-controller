/**
 * In this file I organise the view for
 * the button controllers
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';

class RowButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      running: false,
      primary: false,
      secondary: true
    }

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    this.setState({
      running: !this.state.running,
      primary: !this.state.primary,
      secondary: !this.state.secondary
    })
  }

  render() {

    let buttonLabel = this.state.running ? "OFF" : "ON";

    return (

      <div>
        <Card>
          <CardTitle title={this.props.description} />
          <CardActions>
            <RaisedButton label={buttonLabel} primary={this.state.primary} secondary={this.state.secondary} onClick={this.handleOnClick} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default RowButton;