package com.app.todo.user;


import com.app.todo.security.AuthenticatedUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/api/user" )
public class UserController {

    @GetMapping
    public User getLoggedUser(@AuthenticatedUser User user){
        return user;
    }


}
