package com.app.todo.user;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos/user")
public class UserController {

    @GetMapping
    public User getLoggedUser(User user){
        return user;
    }


}
