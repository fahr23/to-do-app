package com.app.todo.items;

import com.app.todo.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends CrudRepository<Todo, Long> {

    List<Todo> findAllByUser(User user);

    Optional<Todo> findByIdAndUser(Long todoId, User user);

    @Transactional
    void deleteByIdAndUser( Long itemId, User user );
}
