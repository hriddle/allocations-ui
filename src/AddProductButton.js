import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import {MuiThemeProvider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class AddProductButton extends Component {
  state = {
    open: false,
    name: "",
    description: ""
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false, name: "", description: ""});
  };

  handleAddProduct = e => {
    e.preventDefault();
    this.props.handleAddProduct(this.state.name, this.state.description);
    this.handleClose();
  };

  handleChangeName = event => {
    this.setState({name: event.target.value});
  };

  handleChangeDescription = event => {
    this.setState({description: event.target.value});
  };

  render() {
    return (
      <div>
        <MuiThemeProvider theme={this.props.theme}>
          <IconButton onClick={this.handleOpen.bind(this)}><LibraryAddIcon/></IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="add-product-form-dialog-title"
          >
            <DialogTitle id="add-product-form-dialog-title">Add Product</DialogTitle>
            <form onSubmit={this.handleAddProduct.bind(this)}>
              <DialogContent>
                <TextField
                  value={this.state.name}
                  required
                  margin="normal"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  autoFocus
                  onChange={this.handleChangeName.bind(this)}
                />
                <TextField
                  value={this.state.description}
                  margin="normal"
                  id="desc"
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  onChange={this.handleChangeDescription.bind(this)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose.bind(this)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AddProductButton