package com.organia.backend.controllers;

import com.organia.backend.dto.LoginRequest;
import com.organia.backend.entities.User;
import com.organia.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    ResponseEntity<User> registerUser(@RequestBody User user){
        return new ResponseEntity<>(authService.register(user), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    ResponseEntity<String> loginUser(@RequestBody LoginRequest user){
        return new ResponseEntity<>(authService.verify(user), HttpStatus.OK);
    }
}
