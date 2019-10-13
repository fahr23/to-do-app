package com.app.todo.items;

import org.springframework.stereotype.Component;

@Component
public class ToDoMapper {

    public Todo todoMapper(Todo todo, TodoDTO todoDTO){
        todo.setText( todoDTO.getText() );
        todo.setCompleted( todoDTO.getCompleted());
        return todo;

    }


}
