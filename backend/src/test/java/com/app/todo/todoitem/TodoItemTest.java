package com.app.todo.todoitem;

import com.app.todo.exceptions.TodoItemNotFoundException;
import com.app.todo.items.*;
import com.app.todo.user.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith( MockitoJUnitRunner.class )
@SpringBootTest
public class TodoItemTest {

    private static final String USER = "test_user";
    private static final String PASS = "test_pass";

    @InjectMocks
    private TodoController controller;

    @Mock
    private TodoRepository repository;

    @Mock
    private ToDoMapper mapper;

    @Captor
    private ArgumentCaptor<Todo> itemArgumentCaptor;

    @Before
    public void before(){
        doCallRealMethod().when( mapper ).todoMapper( any(),any() );
    }

    @Test
    public void shouldSetAuthenticatedUserToTodoItem() {
        controller.addTodo( createSimpleUser(), createTodoDTO( "Test", false ) );
        verify( repository ).save( itemArgumentCaptor.capture() );
        assertNotNull( itemArgumentCaptor.getValue().getUser() );
        assertEquals( USER, itemArgumentCaptor.getValue().getUser().getUsername() );
    }

    @Test
    public void shouldUpdateTodoItemValues() {
        String newText = "new text";
        String oldText = "old text";
        Long itemId = 1l;
        User user = createSimpleUser();

        doReturn( Optional.of( createTodoItem( oldText, true ) ) )
                .when( repository ).findByIdAndUser( itemId, user );

        controller.updateTodo( itemId, user, createTodoDTO(  newText, false ) );

        verify( repository ).save( itemArgumentCaptor.capture() );

        assertEquals( newText, itemArgumentCaptor.getValue().getText() );
    }

    @Test(expected = NotFoundExceoption.class )
    public void shouldNotUpdateOtherUsersTodoItems() {
        controller.updateTodo( 2l, createSimpleUser(), createTodoDTO(  "text", false ) );
    }

    private TodoDTO createTodoDTO( String text, boolean completed ) {
        TodoDTO item = new TodoDTO();
        item.setText( text );
        item.setCompleted( completed );
        return item;
    }
    private Todo createTodoItem( String text, boolean completed ) {
        Todo item = new Todo();
        item.setText( text );
        item.setCompleted( completed );
        return item;
    }

    private User createSimpleUser() {
        User user = new User();
        user.setUsername( USER );
        user.setPassword( PASS );
        return user;
    }
}
