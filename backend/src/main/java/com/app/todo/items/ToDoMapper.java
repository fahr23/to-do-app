package com.app.todo.items;

import org.springframework.stereotype.Component;

@Component
public class ToDoMapper {

    public Todo todoMapper(Todo todo, TodoDTO todoDTO){
        todo.setTodoText( todoDTO.getText() );
        todo.setIsComplete( todoDTO.getIsCompleted() );
        return todo;

    }


}
