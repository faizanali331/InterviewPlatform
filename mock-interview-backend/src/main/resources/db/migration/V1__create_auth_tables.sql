-- ============================================================
-- V1: Authentication Foundation
-- ============================================================

-- ============================================================
-- ROLES
-- ============================================================

CREATE TABLE roles (
    id BIGINT NOT NULL AUTO_INCREMENT,

    name VARCHAR(50) NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT uk_roles_name UNIQUE (name)
);

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,

    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),

    phone VARCHAR(20),

    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    role_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_users_email
        UNIQUE (email),

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX idx_users_role_id
    ON users(role_id);

-- ============================================================
-- REFRESH TOKENS
-- ============================================================

CREATE TABLE refresh_tokens (
    id BIGINT NOT NULL AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    token_hash VARCHAR(255) NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    revoked BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_refresh_tokens_hash
        UNIQUE (token_hash),

    CONSTRAINT fk_refresh_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_refresh_tokens_user_id
    ON refresh_tokens(user_id);

-- ============================================================
-- INITIAL ROLES
-- ============================================================

INSERT INTO roles (name) VALUES
    ('ROLE_CANDIDATE'),
    ('ROLE_INTERVIEWER'),
    ('ROLE_ADMIN'),
    ('ROLE_SUPER_ADMIN');