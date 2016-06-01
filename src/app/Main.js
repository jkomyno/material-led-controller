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
import Row from './components/Row';
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

    let only = "Control only the ";
    let both = "Control both the ";

    this.state = {
      row1: only + "first LED",
      row2: only + "second LED",
      row3: both + "LEDs in the same time",
      row4: both + "LEDs alternately"
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header />
          <div style={styles.container}>
            <Row description={this.state.row1} />
            <Row description={this.state.row2} />
            <Row description={this.state.row3} />
            <Row description={this.state.row4} />
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;