import React, {Component} from 'react';
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
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

class EditsButton extends Component {
  state = {
    open: false,
    edits: []
  };

  handleOpen = () => {
    this.setState({open: true});
    let edits = this.props.getEdits();
    this.setState({edits: edits})
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSaveAllChanges = () => {
    console.log("Submitting changes...")
    // clear all changes
    // trigger reload
  };

  render() {
    const {classes} = this.props;
    const {edits} = this.state;

    let changesList = this.state.edits.map((edit, index) => {
      let descriptionOfChange = "";
      if (edit.op === "person.rotate") {
        descriptionOfChange = edit.person.name + " moved from " + edit.from + " to " + edit.to;
      } else if (edit.op === "person.add") {
        descriptionOfChange = edit.person.name + " joined " + edit.to;
      } else if (edit.op === "product.add") {
        descriptionOfChange = edit.product.name + " was added"
      } else {
        descriptionOfChange = "Unknown op type: " + edit.op;
      }
      return (
        <ListItem key={index}>
          <ListItemText>{descriptionOfChange}</ListItemText>
          <Divider/>
        </ListItem>
      )
    });

    return (
      <div>
        <MuiThemeProvider theme={this.props.theme}>
          <Button onClick={this.handleOpen.bind(this)} className={classes.button}>View All Changes</Button>
          <Dialog
            open={this.state.open}
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
              <Button onClick={this.handleClose}>Close</Button>
              <Button onClick={this.handleSaveAllChanges.bind(this)}>Save Changes</Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default EditsButton