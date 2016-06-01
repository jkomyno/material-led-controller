/**
 * In this file I organise the view for
 * the various types of controllers
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';

class Row extends Component {

  constructor(props){
    super(props);
    this.state = {
      running: false
    }

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    this.setState({
      running: !this.state.running
    })
  }

  render() {

    let buttonLabel = this.state.running ? "OFF" : "ON";

    return (

      <div>
        <Card>
          <CardTitle title={this.props.description} />
          <CardActions>
            <RaisedButton label={buttonLabel} onClick={this.handleOnClick} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Row;
