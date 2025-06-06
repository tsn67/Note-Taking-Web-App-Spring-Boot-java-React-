package com.dependancy.note_app_backend.repositories;

import com.dependancy.note_app_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String username);
}