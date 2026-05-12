package com.organia.backend.controllers;
import com.organia.backend.dto.LoginRequest;
import com.organia.backend.entities.User;
import com.organia.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    ResponseEntity<?> registerUser(@RequestBody User user){
        try{
            return new ResponseEntity<>(authService.register(user), HttpStatus.CREATED);
        }catch(DataIntegrityViolationException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email "+ user.getEmail()+ " already exists");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Error");
        }
    }
    @PostMapping("/login")
    ResponseEntity<String> loginUser(@RequestBody LoginRequest user){
        try{
            return new ResponseEntity<>(authService.verify(user), HttpStatus.OK);
        }catch(DataRetrievalFailureException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }
}
