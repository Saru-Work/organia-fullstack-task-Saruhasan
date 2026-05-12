package com.organia.backend.config;

import com.organia.backend.services.JwtService;
import com.organia.backend.services.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        System.out.println("Auth Header: " + authHeader); // DEBUG 1
        String token = null;
        String username = null;

        // 1. Check if the header contains a Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtService.extractUserName(token);
            System.out.println("Extracted Username: " + username); // DEBUG 2
        }

        // 2. If we have a username and the user is not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);

            // 3. Validate token and set the SecurityContext
            if (jwtService.validateToken(token, userDetails)) {
                System.out.println("Token is valid! Setting SecurityContext..."); // DEBUG 3
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // This makes 'authentication' available in your Controller!
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }else{
                System.out.println("Token Validation FAILED."); // DEBUG 4
            }
        }

        // 4. Continue with the next filter
        filterChain.doFilter(request, response);
    }
}