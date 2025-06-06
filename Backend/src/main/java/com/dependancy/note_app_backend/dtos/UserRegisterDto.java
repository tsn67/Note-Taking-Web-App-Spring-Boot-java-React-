package com.dependancy.note_app_backend.dtos;

import com.dependancy.note_app_backend.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserRegisterDto {

    @JsonProperty("username")
    private String name;
    private String password;

    @JsonIgnore
    private User user;
}
