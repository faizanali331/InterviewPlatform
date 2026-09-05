package com.mockinterview.catalog.dto;
import lombok.Getter;
import lombok.Builder;
@Getter
@Builder
public class LevelResponse {
    private Long id;
    private String levelName;
    private Integer levelNumber;
}
