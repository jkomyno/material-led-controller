/**
 * In this file I regroup every single
 * component found in "./components"
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header';
import RowButton from './components/RowButton';
import RowInput from './components/RowInput';
import Footer from './components/Footer';

import { setFirstLed } from './GPIOFunctions';

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

    const only = "Control only the ";
    const both = "Control both the ";

    this.state = {
      rowButton1: only + "first LED",
      rowButton2: only + "second LED",
      rowButton3: both + "LEDs in the same time",
      rowButton4: both + "LEDs alternately",
      rowInput1: "Set the interval for the first LED",
      rowInput2: "Set the interval for the second LED"
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header splash={true}/>
          <div style={styles.container}>
            <RowButton description={this.state.rowButton1} action={setFirstLed.bind(this, status)} />
            <RowButton description={this.state.rowButton2} />
            <RowButton description={this.state.rowButton3} />
            <RowButton description={this.state.rowButton4} />
            <RowInput description={this.state.rowInput1} />
            <RowInput description={this.state.rowInput2} />
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;