package com.dependancy.note_app_backend.controllers;

import com.dependancy.note_app_backend.dtos.UserRegisterDto;
import com.dependancy.note_app_backend.entities.User;
import com.dependancy.note_app_backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public String getHealth() {
        return "OK";
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@RequestBody UserRegisterDto userRegisterDto) {
        var user = userRepository.findByName(userRegisterDto.getName());
        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            response.put("error", "User already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        var newUser = new User();
        newUser.setName(userRegisterDto.getName());
        newUser.setPassword(userRegisterDto.getPassword());
        userRepository.save(newUser);
        response.put("username", newUser.getName());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserRegisterDto userRegisterDto) {
        var user = userRepository.findByName(userRegisterDto.getName());
        Map<String, Object> response = new HashMap<>();
        if (user == null) {
            response.put("error", "User does not exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        if (!user.getPassword().equals(userRegisterDto.getPassword())) {
            response.put("error", "Invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        response.put("username", user.getName());
        response.put("id", user.getId());
        return ResponseEntity.ok(response);
    }
}
