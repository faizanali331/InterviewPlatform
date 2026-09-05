package com.mockinterview.config;

import com.mockinterview.auth.entity.Role;
import com.mockinterview.auth.entity.User;
import com.mockinterview.auth.repository.RoleRepository;
import com.mockinterview.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Runs on every application startup. Creates exactly one SUPER_ADMIN account
 * the first time the app boots against a fresh database, then does nothing
 * on every subsequent boot. This is the ONLY way a super admin account can
 * ever be created - there is deliberately no API endpoint for it, since
 * granting super admin rights requires an already-existing super admin to
 * authorize it, which is impossible for the very first one.
 */
@Component
@RequiredArgsConstructor
public class SuperAdminSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(SuperAdminSeeder.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${superadmin.email}")
    private String superAdminEmail;

    @Value("${superadmin.password}")
    private String superAdminPassword;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.existsByRole_Name("ROLE_SUPER_ADMIN")) {
            return; // already bootstrapped, nothing to do
        }

        if (superAdminEmail.isBlank() || superAdminPassword.isBlank()) {
            log.warn("No SUPER_ADMIN exists and SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD " +
                    "are not set. Set both environment variables and restart to create one.");
            return;
        }

        Role superAdminRole = roleRepository.findByName("ROLE_SUPER_ADMIN")
                .orElseThrow(() -> new IllegalStateException("ROLE_SUPER_ADMIN not found - check V1 migration"));

        User superAdmin = new User();
        superAdmin.setEmail(superAdminEmail);
        superAdmin.setPasswordHash(passwordEncoder.encode(superAdminPassword));
        superAdmin.setFirstName("Super");
        superAdmin.setLastName("Admin");
        superAdmin.setStatus("ACTIVE");
        superAdmin.setEmailVerified(true);
        superAdmin.setRole(superAdminRole);

        userRepository.save(superAdmin);

        log.info("Bootstrapped initial SUPER_ADMIN account: {}", superAdminEmail);
    }
}