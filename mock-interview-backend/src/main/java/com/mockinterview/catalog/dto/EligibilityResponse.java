
package com.mockinterview.catalog.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EligibilityResponse {
    private Integer candidateLevelNumber;
    private Integer interviewerLevelNumber;
    private boolean eligible;
}