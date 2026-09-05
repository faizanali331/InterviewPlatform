package com.mockinterview.catalog.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "domains",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_domains_name", columnNames = "name")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false)
    private boolean active = true;
}