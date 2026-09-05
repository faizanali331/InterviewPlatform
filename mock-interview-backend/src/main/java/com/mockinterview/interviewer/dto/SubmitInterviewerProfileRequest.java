package com.mockinterview.interviewer.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SubmitInterviewerProfileRequest {

    // Nullable: an interviewer whose employer isn't in the curated list yet
    // can still submit using a generic designation (see catalog module).
    private Long companyId;

    @NotNull(message = "designationId is required")
    private Long designationId;

    @NotNull(message = "yearsOfExperience is required")
    @Min(value = 0, message = "yearsOfExperience cannot be negative")
    private Integer yearsOfExperience;

    @NotEmpty(message = "At least one domain must be selected")
    private Set<Long> domainIds;
}