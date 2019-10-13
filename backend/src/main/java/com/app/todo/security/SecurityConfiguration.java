package com.app.todo.security;

import com.app.todo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void configure( AuthenticationManagerBuilder auth ) throws Exception {
        auth
                .userDetailsService( this.userDetailsService )
                .passwordEncoder( User.PASSWORD_ENCODER );
    }

    @Override
    protected void configure( HttpSecurity http ) throws Exception {
        http
                .authorizeRequests()
                .antMatchers( "*.js" ).permitAll()
                .antMatchers("/api/**").authenticated()
                .and()
                .formLogin()
                .successHandler( ( httpServletRequest, httpServletResponse, authentication ) -> {
                    //do not redirect after successful login
                } ).permitAll()
                .and()
                .csrf().disable()
                .logout().logoutSuccessUrl( "/" );
    }

}
