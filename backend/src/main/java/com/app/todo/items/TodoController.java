package com.app.todo.items;

import com.app.todo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private ToDoMapper mapper;

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getTodos(User user) {
        return todoRepository.findAllByUser(user);
    }

    @PostMapping
    public Todo addTodo(User user, @RequestBody TodoDTO todoDTO) {
        Todo todo = new Todo();
        todo.setUser(user);
        return todoRepository.save(mapper.todoMapper(todo, todoDTO));
    }

    @PutMapping("{todoId}")
    public Todo updateTodo(@PathVariable(name = "todoId") Long todoId,
                           User user,
                           @RequestBody TodoDTO todoDTO) {
        Todo todo=todoRepository.findByIdAndUser(todoId, user).orElseThrow(
                NotFoundExceoption::new);

        mapper.todoMapper(todo, todoDTO);
        return todoRepository.save(todo);
    }

    @DeleteMapping("{todoId}")
    public void deleteTodo(User user, @PathVariable(name = "todoId") Long todoId)
    {
        todoRepository.deleteByIdAndUser(todoId, user);
    }

}
