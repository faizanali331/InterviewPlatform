package com.mockinterview.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegisterResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String status;
    private boolean emailVerified;
    private String role;
}