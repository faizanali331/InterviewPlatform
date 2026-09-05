package com.mockinterview.catalog.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DesignationResponse {
    private Long id;
    private String title;
    private Long companyId;
    private String companyName;
    private Integer levelNumber;
    private String levelName;
}