package com.mockinterview.auth.controller;

import com.mockinterview.auth.dto.*;
import com.mockinterview.auth.entity.User;
import com.mockinterview.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        User user = authService.register(request);

        RegisterResponse response = RegisterResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .status(user.getStatus())
                .emailVerified(user.isEmailVerified())
                .role(user.getRole().getName())
                .build();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        LoginResponse response = authService.login(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
    @PostMapping("/register/interviewer")
    public ResponseEntity<RegisterResponse> registerInterviewer(
            @Valid @RequestBody InterviewerRegisterRequest request
    ) {
        User user = authService.registerInterviewer(request);

        RegisterResponse response = RegisterResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .status(user.getStatus())
                .emailVerified(user.isEmailVerified())
                .role(user.getRole().getName())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}