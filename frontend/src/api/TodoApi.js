import {doRequest, doRequestWithBody, doDeleteRequest} from './BaseApi'

const TODO_PATH = "/api/todos";

export const getTodos = () => {
     return doRequest(TODO_PATH)
    .then(response => response.json());
}

export const addTodo = (todo) => {
	return doRequestWithBody(TODO_PATH, 'post', todo)
    .then(response => response.json());
}

export const updateTodo = (todo, id) => {
	return doRequestWithBody(TODO_PATH + "/" + id, 'put', todo)
    .then(response => response.json());
}

export const deleteTodo = (todoId) => {	
    return doDeleteRequest(TODO_PATH + "/" + todoId);
}