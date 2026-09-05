-- ============================================================
-- V3: Interviewer Profile (sections 7, 8, 14)
-- ============================================================

CREATE TABLE interviewer_profiles (
    id BIGINT NOT NULL AUTO_INCREMENT,

    user_id BIGINT NOT NULL,
    company_id BIGINT,
    designation_id BIGINT NOT NULL,

    years_of_experience INT NOT NULL,

    verification_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    rejection_reason VARCHAR(500),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_interviewer_profiles_user UNIQUE (user_id),

    CONSTRAINT fk_interviewer_profiles_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT fk_interviewer_profiles_company
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,

    CONSTRAINT fk_interviewer_profiles_designation
        FOREIGN KEY (designation_id) REFERENCES designations(id) ON DELETE RESTRICT
);

CREATE INDEX idx_interviewer_profiles_verification_status ON interviewer_profiles(verification_status);

CREATE TABLE interviewer_profile_domains (
    interviewer_profile_id BIGINT NOT NULL,
    domain_id BIGINT NOT NULL,

    PRIMARY KEY (interviewer_profile_id, domain_id),

    CONSTRAINT fk_ipd_profile
        FOREIGN KEY (interviewer_profile_id) REFERENCES interviewer_profiles(id) ON DELETE CASCADE,

    CONSTRAINT fk_ipd_domain
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
);