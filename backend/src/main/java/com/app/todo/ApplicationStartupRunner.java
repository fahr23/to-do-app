package com.app.todo;

import com.app.todo.user.User;
import com.app.todo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartupRunner implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run( ApplicationArguments args ) throws Exception {
        createAdminUser();
    }

    private void createAdminUser() {
        User admin = createUser( "admin", "admin" );
        userRepository.save( admin );
    }

    private User createUser( String username, String password ) {
        User user = new User();
        user.setUsername( username );
        user.setPassword( password );
        return user;
    }
}
