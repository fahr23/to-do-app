import React from 'react';
import Logo from '../components/Logo';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './MainContainer.css';

const MainContainer = props => {
	return (
	<div>
		<div className="MainContainer_header">
		  <Logo className="MainContainer_logo"/>
		  <Button size="small" className="MainContainer_logout"
		    onClick={props.onLogout}>LOGOUT</Button>
		</div>

		<div className="MainContainer_body">
			<Paper className="MainContainer_container" elevation={6} >
		 	
		 		{props.children}
			
			</Paper>
		</div>  
	</div>
	)
}
export default MainContainer;