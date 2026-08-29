package com.mockinterview.auth.service;

import com.mockinterview.auth.dto.RegisterRequest;
import com.mockinterview.auth.entity.Role;
import com.mockinterview.auth.entity.User;
import com.mockinterview.auth.repository.RoleRepository;
import com.mockinterview.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User register(RegisterRequest request) {

        // 1. Check whether email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }

        // 2. Get default candidate role
        Role candidateRole = roleRepository
                .findByName("ROLE_CANDIDATE")
                .orElseThrow(() ->
                        new IllegalStateException(
                                "ROLE_CANDIDATE not found"
                        )
                );

        // 3. Create user
        User user = new User();

        user.setEmail(request.getEmail());
        user.setPasswordHash(
                passwordEncoder.encode(request.getPassword())
        );

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());

        user.setStatus("ACTIVE");
        user.setEmailVerified(false);

        // 4. Assign default role
        user.setRole(candidateRole);

        // 5. Save user
        return userRepository.save(user);
    }
}