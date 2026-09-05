package com.mockinterview.catalog.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DomainResponse {
    private Long id;
    private String name;
    private String category;
}