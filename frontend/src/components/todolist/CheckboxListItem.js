import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import './CheckboxListItem.css';
import {updateTodo} from '../../api/TodoApi';
import {getRelativeTime} from '../../util/TimeUtil'

class CheckboxListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	...props.item
    };
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  handleChange = (name, valueProperty, callback) => event => {
    this.setState({
      [name]: event.target[valueProperty],
    }, callback);
  }

  handleItemUpdate = () => {
    updateTodo(this.state, this.props.id).then(response => {
      this.setState({
        lastUpdate: response.lastUpdate
      }, this.props.onItemUpdate(this.state, this.props.id));
    })
  }

  render() {
    return (
      <ListItem
        className={this.state.completed?'CheckboxListItem-completed':''}
	      dense>
	      	<Checkbox
	            checked={this.state[this.props.toggleField]}            
	            onChange={this.handleChange(this.props.toggleField, 'checked', this.handleItemUpdate)}
	            disableRipple/>
	      	<TextField value={this.state[this.props.textField]} 
	          	onChange={this.handleChange(this.props.textField, 'value')} 
              onBlur={this.handleItemUpdate}
	          	fullWidth
              multiline
              margin="dense"
              helperText={getRelativeTime(this.state.lastUpdate)}/>	  	
          
            <IconButton aria-label="Delete" onClick={this.props.onItemDelete(this.props.id)}>
              <Icon>delete</Icon>
            </IconButton>
	    </ListItem>
    );
  }
}

export default CheckboxListItem;