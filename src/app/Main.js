/**
 * In this file I regroup every single
 * component found in "./components".
 * Here I also manage the communication with the socket
 */

import React, {Component} from 'react';
import io from 'socket.io-client';

import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header';
import RowButton from './components/RowButton';
import RowInput from './components/RowInput';
import Footer from './components/Footer';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      status: "disconnected"
    };

    // scope binding
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.onLedControlArrived = this.onLedControlArrived.bind(this);
  }

  // Native ReactJS function in which the socket communication is managed
  componentWillMount(){
    // I should avoid using static IP
    this.socket = io('http://192.168.1.175:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('ledControlArrived', this.onLedControlArrived);
  }

  componentWillUnmount(){
    disconnect();
  }

  connect(){
    this.setState({status: 'connected'});
    console.log('Connected: '+this.socket.id);
  }

  disconnect(){
    this.setState({status: 'disconnected'});
  }

  emit(eventName, payload){
    this.socket.emit(eventName, payload);
  }

  onLedControlArrived(){
    console.log("Led control arrived");
  }

  render() {
    const rowButton1 = "Control only the first LED";
    const rowButton2 = "Control only the second LED";
    const rowButton3 = "Control both the LEDs in the same time";
    const rowButton4 = "Control both the LEDs alternately";
    const rowInput1 = "Set the interval for the first LED";
    const rowInput2 = "Set the interval for the second LED";

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header splash={true}/>
          <div style={styles.container}>
            <RowButton description={rowButton1} led="led1" emit={this.emit} />
            <RowButton description={rowButton2} led="led2" emit={this.emit} />
            <RowButton description={rowButton3} led="both" emit={this.emit}/>
            <RowButton description={rowButton4} />
            <RowInput description={rowInput1} />
            <RowInput description={rowInput2} />
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;