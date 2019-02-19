import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import grey from '@material-ui/core/colors/grey'
import LoginButton from "./login/LoginButton";
import EditsButton from "./EditsButton";
import AddProductButton from "./AddProductButton";
import AddPersonButton from "./AddPersonButton";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends Component {
  state = {
    viewAllChangesDialogOpen: false,
  };

  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = date => {
    this.props.setWorkingDate(date);
  };

  theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: grey['700']
      }
    },
    overrides: {
      MuiPickersModal: {
        dialogAction: {
          color: grey['500'],
        },
      }
    }
  });

  render() {
    const {classes} = this.props;
    const {isLoggedIn} = this.props;

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
            {!isLoggedIn && <LoginButton theme={this.theme} handleLogin={this.props.handleLogin} classes={classes}/>}
            {isLoggedIn && <EditsButton theme={this.theme} getEdits={this.props.getEdits} classes={classes} />}
            {isLoggedIn && <AddProductButton theme={this.theme} handleAddProduct={this.props.handleAddProduct} classes={classes}/>}
            {isLoggedIn && <AddPersonButton theme={this.theme} handleAddPerson={this.props.handleAddPerson} classes={classes}/>}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Header);