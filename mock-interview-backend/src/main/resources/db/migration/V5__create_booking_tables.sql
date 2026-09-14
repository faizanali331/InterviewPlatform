CREATE TABLE availability_slots (
    id BIGINT NOT NULL AUTO_INCREMENT,

    interviewer_profile_id BIGINT NOT NULL,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    booked BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_availability_slots_interviewer
        FOREIGN KEY (interviewer_profile_id) REFERENCES interviewer_profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_availability_slots_interviewer ON availability_slots(interviewer_profile_id);
CREATE INDEX idx_availability_slots_booked ON availability_slots(booked);

CREATE TABLE bookings (
    id BIGINT NOT NULL AUTO_INCREMENT,

    candidate_id BIGINT NOT NULL,
    interviewer_profile_id BIGINT NOT NULL,
    availability_slot_id BIGINT NOT NULL,
    domain_id BIGINT NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_bookings_slot UNIQUE (availability_slot_id),

    CONSTRAINT fk_bookings_candidate
        FOREIGN KEY (candidate_id) REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT fk_bookings_interviewer
        FOREIGN KEY (interviewer_profile_id) REFERENCES interviewer_profiles(id) ON DELETE RESTRICT,

    CONSTRAINT fk_bookings_slot
        FOREIGN KEY (availability_slot_id) REFERENCES availability_slots(id) ON DELETE RESTRICT,

    CONSTRAINT fk_bookings_domain
        FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE RESTRICT
);

CREATE INDEX idx_bookings_candidate ON bookings(candidate_id);
CREATE INDEX idx_bookings_interviewer ON bookings(interviewer_profile_id);