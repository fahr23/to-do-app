import React from 'react';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Grid from '@material-ui/core/Grid';
import MainContainer from './components/MainContainer';
import {getSessionUser, logout} from './api/UserApi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, isAuthenticated: false, isLoading: false };
    this.loadSessionUser = this.loadSessionUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadSessionUser = () => {
    getSessionUser()
    .then(user => this.assignUser(user))
    .catch(error => this.assignUser(null))
  }

  componentDidMount = () => {
    this.loadSessionUser();
  }

  assignUser = (user) => {
    if(user !==  null && user.id !== null){
      this.setUserState(user, true, false) }   
    else
      this.setUserState(null, false, false)
  }

  handleAuthenticationSuccess = () => this.loadSessionUser();

  handleAuthenticationFail = () => this.assignUser( null );

  handleLogout(){
    this.assignUser(null)
    logout();
  }

  setUserState = (user, isAuthenticated, isLoading) =>{
    this.setState(({
      currentUser: user,
      isAuthenticated: isAuthenticated,
      isLoading: isLoading
    }))
  }

  getPageToRender(){
    if(this.state.isAuthenticated)
      return (
        <MainContainer onLogout={this.handleLogout}>
          <TodoList/>
        </MainContainer>);
  
    return <Login onAuthenticationSuccess={this.handleAuthenticationSuccess} 
      onAuthenticationFail={this.handleAuthenticationFail}/>
  }

  render(){
    return (
      <Grid container 
        className="App-container"
        alignItems="center"
        justify="center">
        <Grid item lg={6} className="App-container-item">
          {this.getPageToRender()}
        </Grid>
      </Grid>
  )}
}

export default App;
