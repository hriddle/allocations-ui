import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {MuiThemeProvider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class AddPersonButton extends Component {
  state = {
    open: false,
    companySelectOpen: false,
    name: "",
    company: "",
  };

  handleOpenDialog = () => {
    this.setState({open: true});
  };

  handleCloseDialog = () => {
    this.setState({open: false, name: ""});
  };

  handleOpenCompanySelect = () => {
    this.setState({companySelectOpen: true});
  };

  handleCloseCompanySelect = () => {
    this.setState({companySelectClose: false});
  };

  handleChangeCompany = () => event => {
    this.setState({company: event.target.value});
    this.handleCloseCompanySelect();
  };

  handleChangeName = () => event => {
    this.setState({name: event.target.value});
  };

  handleAddPerson = e => {
    debugger;
    e.preventDefault();
    this.props.handleAddPerson(this.state.name);
    this.handleCloseDialog();
  };

  render() {
    return (
      <div>
        <MuiThemeProvider theme={this.props.theme}>
          <IconButton onClick={this.handleOpenDialog.bind(true)}><PersonAddIcon/></IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleCloseDialog.bind(true)}
            aria-labelledby="add-product-form-dialog-title"
          >
            <DialogTitle id="add-product-form-dialog-title">Add Person</DialogTitle>
            <form onSubmit={this.handleAddPerson.bind(this)}>
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
                  onChange={this.handleChangeName.bind(true)}
                />
                <FormControl>
                  <InputLabel htmlFor="company-select">Company</InputLabel>
                  <Select
                    open={this.state.companySelectOpen}
                    onClose={this.handleCloseCompanySelect.bind(true)}
                    onOpen={this.handleOpenCompanySelect.bind(true)}
                    value={this.state.company}
                    onChange={this.handleChangeCompany.bind(true)}
                    inputProps={{
                      name: 'company',
                      id: 'company-select',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"HCSC"}>HCSC</MenuItem>
                    <MenuItem value={"CONSULTANT"}>Consultant</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseDialog.bind(this)}>
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

export default AddPersonButton