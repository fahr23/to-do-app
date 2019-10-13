import React from 'react';
import Paper from '@material-ui/core/Paper';
import './Login.css';
import Logo from '../components/Logo';
import LoginForm from '../components/login/LoginForm';

const Login = props => (
  <div className="Login-container">
    <Logo className="Login_logo"/>
    <Paper className="Login-form-container" elevation={10} >

      <p className="Login-form-heading">Login (kullanici->admin/ sifre->admin)</p>

      <LoginForm {...props}/>

    </Paper>
  </div>
);

export default Login;
