package com.mockinterview.catalog.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CompanyResponse {
    private Long id;
    private String name;
    private String emailDomain;
}