package com.app.todo.items;

import com.app.todo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;


@Entity
@Getter
@Setter
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean isComplete=false;
    private String todoText;
    private ZonedDateTime updateTime;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(updatable = false)
    private User user;

    @PreUpdate
    @PrePersist
    public void preUpdate() {
        updateTime = Instant.now().atZone( ZoneId.systemDefault() );
    }


}
