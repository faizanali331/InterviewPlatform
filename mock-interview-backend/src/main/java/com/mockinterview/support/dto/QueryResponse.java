package com.mockinterview.support.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class QueryResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String visitorType;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}