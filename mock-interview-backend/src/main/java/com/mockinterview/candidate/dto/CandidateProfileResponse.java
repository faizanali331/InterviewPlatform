package com.mockinterview.candidate.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CandidateProfileResponse {
    private Long id;
    private Long userId;
    private Long designationId;
    private String designationTitle;
    private Integer levelNumber;
    private String levelName;
}