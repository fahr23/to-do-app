package com.app.todo.items;

import com.app.todo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

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
    private Boolean completed = false;
    private String text;
    private ZonedDateTime lastUpdate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(updatable = false)
    private User user;

    @PreUpdate
    @PrePersist
    public void preUpdate() {
        lastUpdate = Instant.now().atZone( ZoneId.systemDefault() );
    }


}
