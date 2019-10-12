import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Login from '../pages/Login';
import TodoList from '../pages/TodoList';


it('renders without crashing', () => {
  	const component = shallow(<App />);
  	expect(component.exists()).toEqual(true);
});

describe('Authentication', () => {

	it('renders login page by default', () => {  	
	  	const component = shallow(<App />);
	  	
	  	expect(component.find(Login).exists()).toEqual(true);
	  	expect(component.find(TodoList).exists()).toEqual(false);
	});

	it('renders todo\'s page when authenticated', () => {
	  	const component = shallow(<App />);
	  	component.setState({isAuthenticated: true})

	  	expect(component.find(TodoList).exists()).toEqual(true);
	  	expect(component.find(Login).exists()).toEqual(false);
	});
});