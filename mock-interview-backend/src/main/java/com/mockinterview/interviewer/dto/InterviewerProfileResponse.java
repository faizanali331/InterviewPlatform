package com.mockinterview.interviewer.dto;

import com.mockinterview.catalog.dto.DomainResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class InterviewerProfileResponse {
    private Long id;
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;

    private Long companyId;
    private String companyName;

    private Long designationId;
    private String designationTitle;
    private Integer levelNumber;
    private String levelName;

    private Integer yearsOfExperience;
    private List<DomainResponse> domains;

    private String verificationStatus;
    private String rejectionReason;
}