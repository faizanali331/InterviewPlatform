package com.mockinterview.candidate.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetCandidateProfileRequest {

    @NotNull(message = "designationId is required")
    private Long designationId;
}