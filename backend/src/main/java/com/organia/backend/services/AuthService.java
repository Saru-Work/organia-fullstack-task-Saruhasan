package com.organia.backend.services;

import com.organia.backend.dto.LoginRequest;
import com.organia.backend.entities.User;
import com.organia.backend.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String register(User user) {
        String password = user.getPassword();
        user.setPassword(encoder.encode(user.getPassword()));
        User current_user = userRepository.save(user);
        LoginRequest loginRequest = new LoginRequest(user.getEmail(), password);
        return verify(loginRequest);
    }

    public String verify(LoginRequest user){
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getEmail());
        }else{
            throw new DataRetrievalFailureException("User not found");
        }
    }

}