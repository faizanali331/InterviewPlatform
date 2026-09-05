-- ============================================================
-- V2: Catalog (Companies, Normalized Levels, Designations, Domains)
-- ============================================================

CREATE TABLE normalized_levels (
    id BIGINT NOT NULL AUTO_INCREMENT,
    level_number INT NOT NULL,
    level_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_levels_number UNIQUE (level_number),
    CONSTRAINT uk_levels_name UNIQUE (level_name)
);

CREATE TABLE companies (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email_domain VARCHAR(150),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uk_companies_name UNIQUE (name)
);

CREATE TABLE designations (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    company_id BIGINT,
    normalized_level_id BIGINT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_designations_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
    CONSTRAINT fk_designations_level FOREIGN KEY (normalized_level_id) REFERENCES normalized_levels(id) ON DELETE RESTRICT
);

CREATE INDEX idx_designations_company_id ON designations(company_id);
CREATE INDEX idx_designations_level_id ON designations(normalized_level_id);

CREATE TABLE domains (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    CONSTRAINT uk_domains_name UNIQUE (name)
);

CREATE INDEX idx_domains_category ON domains(category);

-- Seed: normalized levels (white paper section 11)
INSERT INTO normalized_levels (level_number, level_name) VALUES
    (1, 'Junior'),
    (2, 'Software Engineer'),
    (3, 'Senior Software Engineer'),
    (4, 'Lead / Staff'),
    (5, 'Principal'),
    (6, 'Engineering Manager'),
    (7, 'Senior Engineering Manager'),
    (8, 'Director');

-- Seed: companies (section 5.2)
INSERT INTO companies (name, email_domain) VALUES
    ('Amazon', 'amazon.com'),
    ('Microsoft', 'microsoft.com'),
    ('Google', 'google.com'),
    ('Cognizant', 'cognizant.com'),
    ('Infosys', 'infosys.com'),
    ('TCS', 'tcs.com'),
    ('Accenture', 'accenture.com'),
    ('Wipro', 'wipro.com'),
    ('Capgemini', 'capgemini.com');

-- Seed: generic designations (usable regardless of employer)
INSERT INTO designations (title, company_id, normalized_level_id) VALUES
    ('Software Engineer', NULL, (SELECT id FROM normalized_levels WHERE level_number = 2)),
    ('Senior Software Engineer', NULL, (SELECT id FROM normalized_levels WHERE level_number = 3)),
    ('Lead Engineer', NULL, (SELECT id FROM normalized_levels WHERE level_number = 4)),
    ('Staff Engineer', NULL, (SELECT id FROM normalized_levels WHERE level_number = 4)),
    ('Principal Engineer', NULL, (SELECT id FROM normalized_levels WHERE level_number = 5)),
    ('Engineering Manager', NULL, (SELECT id FROM normalized_levels WHERE level_number = 6));

-- Seed: Amazon-specific designations (section 7 worked example)
INSERT INTO designations (title, company_id, normalized_level_id) VALUES
    ('SDE-1', (SELECT id FROM companies WHERE name = 'Amazon'), (SELECT id FROM normalized_levels WHERE level_number = 2)),
    ('SDE-2', (SELECT id FROM companies WHERE name = 'Amazon'), (SELECT id FROM normalized_levels WHERE level_number = 3)),
    ('SDE-3', (SELECT id FROM companies WHERE name = 'Amazon'), (SELECT id FROM normalized_levels WHERE level_number = 4)),
    ('Staff Engineer', (SELECT id FROM companies WHERE name = 'Amazon'), (SELECT id FROM normalized_levels WHERE level_number = 4)),
    ('Principal Engineer', (SELECT id FROM companies WHERE name = 'Amazon'), (SELECT id FROM normalized_levels WHERE level_number = 5));

-- Seed: domains (section 13)
INSERT INTO domains (name, category) VALUES
    ('Java', 'Backend'), ('Spring Boot', 'Backend'), ('Node.js', 'Backend'),
    ('Python', 'Backend'), ('REST API', 'Backend'), ('Microservices', 'Backend'),
    ('React', 'Frontend'), ('Angular', 'Frontend'), ('JavaScript', 'Frontend'),
    ('TypeScript', 'Frontend'), ('HTML/CSS', 'Frontend'),
    ('Solidity', 'Blockchain'), ('Ethereum', 'Blockchain'), ('Smart Contracts', 'Blockchain'),
    ('Web3', 'Blockchain'), ('DeFi', 'Blockchain'),
    ('Machine Learning', 'AI'), ('Deep Learning', 'AI'), ('Generative AI', 'AI'), ('LLM', 'AI'),
    ('AWS', 'Cloud'), ('Azure', 'Cloud'), ('GCP', 'Cloud'), ('Docker', 'Cloud'),
    ('Kubernetes', 'Cloud'), ('DevOps', 'Cloud'),
    ('SQL', 'Data'), ('PostgreSQL', 'Data'), ('MySQL', 'Data'), ('Data Engineering', 'Data'),
    ('System Design', 'General'), ('Behavioral Interview', 'General'),
    ('Leadership', 'General'), ('Communication', 'General');