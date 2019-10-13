import React, {Component} from 'react';
import CheckboxList from '../components/todolist/CheckboxList';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {getTodos, addTodo, deleteTodo} from '../api/TodoApi';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: {}, error: null };
    this.loadTodos = this.loadTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  loadTodos(){
    getTodos().then(response => {
        let formattedTodos = this.convertToObjects(response);
        this.setState({todos: formattedTodos});
      })
    .catch(error => {
        this.setState({error: "Unable to retrieve todo's"});
      }
    );
  }

  convertToObjects(response){
    let todos = {};
    response.map( item => {
      return todos[item.id] = this.createTodo(item.text, item.completed, item.lastUpdate);
    } )
    return todos;
  }

  componentWillMount() {
    this.loadTodos();
  }

  createTodo(text, completed, lastUpdate){
    return {text: (text==null ? '' : text), completed, lastUpdate};
  }

  handleItemDelete = itemId => event => {
    deleteTodo(itemId).then(response => {
      let updated = { ...this.state.todos }
      delete updated[itemId];
      this.updateTodosState(updated);
    })
  }

  handleItemUpdate = (item, itemId) => () => {
    let updated = { ...this.state.todos }
    updated[itemId] = item;
    this.updateTodosState(updated);
  }

  handleAddTodo(){
    addTodo(this.createTodo())
      .then(response => {
        this.addTodoToState(response);
      });
  }

  addTodoToState(newTodo){
    let updated = { ...this.state.todos }
    updated[newTodo.id] = this.createBlankTodo(newTodo.text, newTodo.completed, newTodo.lastUpdate)
    this.updateTodosState(updated);
  }

  updateTodosState(updatedTodos){
    this.setState({
        todos: updatedTodos
      })
  }
  createBlankTodo = () => this.createTodo('',false,new Date());

  render() {
    return (
      <div className="TodoList_container">

        <Typography variant="display1" gutterBottom>
          To do
        </Typography>
        <Divider />

        {this.renderCheckboxList(this.state.todos)}

        <Button variant="fab"
            color="primary"
            aria-label="add"
            className="TodoList_button_add"
            onClick={this.handleAddTodo}>
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }

  renderCheckboxList = items => {

    if(items !== null && Object.keys(items).length > 0)
      return (
      <CheckboxList items={items}
        toggleField="completed"
        textField="text"
        onItemDelete={this.handleItemDelete}
        onItemUpdate={this.handleItemUpdate}/>)
    return <p>You don't have any Todo items. Add some.</p>;
  }
}

export default TodoList;
