import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = function(event) {
    this.props.handleDateChange(event.target.value);
  };

  defaultDate = this.props.defaultDate.toISOString().substring(0,10);

  render() {

    return (
      <form noValidate className={this.props.classes.container}>
        <TextField
          id="date"
          label={this.props.label}
          type="date"
          defaultValue={this.defaultDate}
          className={this.props.classes.textField}
          onChange={event => this.handleDateChange(event)}
        />
      </form>
    );
  }
}

export default withStyles(styles)(DatePicker);