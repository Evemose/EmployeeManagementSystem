package com.ems.core.controllers;

import com.ems.core.model.entitites.security.User;
import org.springframework.http.ResponseEntity;

public interface SecurityController {
    ResponseEntity<?> login();

    ResponseEntity<?> register(User user);
}
