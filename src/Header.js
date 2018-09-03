import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DatePicker from "./DatePicker.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = function (date) {
    this.props.setWorkingDate(date)
  };

  theme = createMuiTheme({
    palette: {
      type: 'dark'
    },
    typography: {
      headline: {
        fontSize: 72,
        fontWeight: 900,
      }
    }
  });

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <AppBar color={"#000000"}>
          <Toolbar>
            <Typography variant="headline">
              Allocations
            </Typography>
                   <DatePicker
                     label="Working Date"
                     defaultDate={this.props.currentWorkingDate}
                     handleDateChange={this.handleDateChange}/>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    )
    // return (
    //   <MuiThemeProvider theme={this.theme}>
    //     <header><span>Allocations</span>
    //       <DatePicker
    //         label="Working Date"
    //         defaultDate={this.props.currentWorkingDate}
    //         handleDateChange={this.handleDateChange}/>
    //     </header>
    //   </MuiThemeProvider>
    // )
  }
}

export default Header;