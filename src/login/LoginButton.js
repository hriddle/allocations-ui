import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MuiThemeProvider} from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import {Person, VpnKey} from '@material-ui/icons';


class LoginButton extends React.Component {
  state = {
    open: false,
    credentials: {
      username: '',
      password: ''
    },
    incorrectLogin: false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleLogin = e => {
    e.preventDefault();
    if (this.state.credentials.username === this.state.credentials.password) {
      this.handleClose();
      this.props.handleLogin(true);
    } else {
      this.setState({incorrectLogin: true})
    }
  };

  handleCredentialsChange = field => event => {
    let credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({credentials: credentials})
  };

  render() {
    const {incorrectLogin} = this.state;
    return (
      <div>
        <MuiThemeProvider theme={this.props.theme}>
          <Button onClick={this.handleClickOpen}>Sign In</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <form>
              <DialogContent>
                <TextField
                  error={incorrectLogin}
                  required
                  margin="normal"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  onChange={this.handleCredentialsChange('username')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person/>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  error={incorrectLogin}
                  required
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={this.handleCredentialsChange('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey/>
                      </InputAdornment>
                    ),
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button onClick={this.handleLogin} type="submit">
                  Sign In
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginButton