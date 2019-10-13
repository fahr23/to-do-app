package com.app.todo.todoitem;

import com.app.todo.items.ToDoMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith( SpringRunner.class )
@SpringBootTest
public class TodoItemMapperTest {

    @Autowired
    private ToDoMapper mapper;

    @Test
    public void shouldMapDtoToEntity(){

    }
}
