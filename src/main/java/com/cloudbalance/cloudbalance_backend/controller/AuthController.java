package com.cloudbalance.cloudbalance_backend.controller;


import com.cloudbalance.cloudbalance_backend.dto.LoginRequest;
import com.cloudbalance.cloudbalance_backend.dto.LoginResponse;
import com.cloudbalance.cloudbalance_backend.security.CustomUserDetailsService;
import com.cloudbalance.cloudbalance_backend.security.JwtUtil;
import com.cloudbalance.cloudbalance_backend.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.kerberos.KerberosKey;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
//    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

//        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails);

//        String name = userDetails.getUsername();\

        String name = userDetails.getName();
        System.out.println(name);

        String role = userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

        return new LoginResponse(token,role,name);
    }
}

