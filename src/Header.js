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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
    edits: []
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
        main: '#424242'
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

  handleClickViewAllChanges = () => {
    this.setState({viewAllChangesDialogOpen: true});
    let edits = this.props.getEdits();
    this.setState({edits: edits})
  };

  handleCloseViewAllChanges = () => {
    this.setState({viewAllChangesDialogOpen: false});
  };

  handleSaveAllChanges = () => {
    console.log("Submitting changes...")
    // clear all changes
    // trigger reload
  };

  render() {
    const {classes} = this.props;
    const {isLoggedIn} = this.props;
    const {edits} = this.state;

    let changesList = this.state.edits.map(edit => {
      let descriptionOfChange = "";
      if (edit.op === "move") {
        descriptionOfChange = edit.person.name + " moved from " + edit.from + " to " + edit.to;
      } else if (edit.op === "new-person") {
        descriptionOfChange = edit.person.name + " joined " + edit.to;
      } else {
        descriptionOfChange = "Unknown op type: " + edit.op;
      }
      return (
        <ListItem>
          <ListItemText>{descriptionOfChange}</ListItemText>
          <Divider/>
        </ListItem>
      )
    });

    return (
      <MuiThemeProvider theme={this.theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="headline" className={classes.flex}>
              Allocations
            </Typography>
            {isLoggedIn ? (
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    keyboard
                    onChange={this.handleDateChange}
                    value={this.props.currentWorkingDate}
                    autoOk={true}
                    showTodayButton={true}
                  />
                </MuiPickersUtilsProvider>
                <Button onClick={this.handleClickViewAllChanges.bind(this)} className={classes.button}>View All Changes</Button>
                <Dialog
                  open={this.state.viewAllChangesDialogOpen}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">All Changes</DialogTitle>
                  <DialogContent>
                    {edits.length === 0 ? (
                      <DialogContentText>No changes have been made.</DialogContentText>
                    ) : (
                      <List>{changesList}</List>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseViewAllChanges}>Close</Button>
                    <Button onClick={this.handleSaveAllChanges.bind(this)}>Save Changes</Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              <LoginButton theme={this.theme} handleLogin={this.props.handleLogin}/>
            )}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Header);