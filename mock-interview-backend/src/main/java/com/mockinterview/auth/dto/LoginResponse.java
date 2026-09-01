package com.mockinterview.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {

    private String email;
    private String token;
    private String role;
}