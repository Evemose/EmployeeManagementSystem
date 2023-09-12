package com.ems.core.controllers;

import com.ems.core.model.entitites.security.User;
import com.ems.core.repository.UserRepository;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class WebSecurityController implements SecurityController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public WebSecurityController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/home")
    public ResponseEntity<?> home() {
        return ResponseEntity.ok().build();
    }

    @Override
    @PostMapping("/authorize")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok().build();
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_ADMIN");
        try {
            userRepository.save(user);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.badRequest().body(String.format("Username already exists : %s", user.getUsername()));
        }
        return ResponseEntity.ok().build();
    }
}
