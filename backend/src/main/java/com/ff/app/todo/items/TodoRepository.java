package com.ff.app.todo.items;

import com.ff.app.todo.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends CrudRepository<Todo, Long> {

    List<Todo> findAllByUser(User user);

    Optional<Todo> findByIdAndUser(Long todoId, User user);

    @Override
    void deleteById(Long todoId);

}
