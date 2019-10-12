import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {authenticate} from '../../api/UserApi';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = event => {
    authenticate(this.state.username, this.state.password)
    .then(response => {
        this.props.onAuthenticationSuccess();
      })
    .catch(error => {
        this.props.onAuthenticationFail();
      }
    );
  }

  render() {
    return (
    <div className="Login-form-wrapper">      
      <TextField
        id="name"
        label="Name"
        value={this.state.username}
        onChange={this.handleFormChange('username')}
        margin="normal"
        fullWidth
        className="Login-form-input"/>
      <TextField
        id="password-input"
        label="Password"
        value={this.state.password}
        onChange={this.handleFormChange('password')}
        type="password"
        autoComplete="current-password"
        margin="normal"
        fullWidth
        className="Login-form-input"/>    
      <Button variant="raised"  
        color="primary" 
        fullWidth 
        className="Login-form-submit-btn"
        onClick={this.handleSubmit}>
              Login
      </Button>
    </div>
  )}
}
export default LoginForm;