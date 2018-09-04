import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import grey from '@material-ui/core/colors/grey'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = function (date) {
    this.props.setWorkingDate(date);
  };

  theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#424242'
      }
    },
    overrides: {
      MuiPickersModal: {
        dialogAction: {
          color: grey['500'],
        },
      }
    },
  });

  render() {
    const {classes} = this.props;

    return (
      <MuiThemeProvider theme={this.theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="headline" className={classes.flex}>
              Allocations
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                keyboard
                onChange={this.handleDateChange}
                value={this.props.currentWorkingDate}
                autoOk={true}
                showTodayButton={true}
              />
            </MuiPickersUtilsProvider>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Header);