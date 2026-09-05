package com.mockinterview.admin.controller;

import com.mockinterview.admin.dto.CreateAdminRequest;
import com.mockinterview.auth.dto.RegisterResponse;
import com.mockinterview.auth.entity.User;
import com.mockinterview.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AuthService authService;

    /**
     * White paper section 6.4: Super Admin manages Admins. This endpoint has
     * NO permitAll rule in SecurityConfig - it falls under .anyRequest().authenticated(),
     * and @PreAuthorize adds the role check on top. A candidate or interviewer
     * JWT gets a 403 here; only a token carrying ROLE_SUPER_ADMIN gets through.
     */
    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<RegisterResponse> createAdmin(@Valid @RequestBody CreateAdminRequest request) {
        User user = authService.createAdmin(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhone()
        );

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