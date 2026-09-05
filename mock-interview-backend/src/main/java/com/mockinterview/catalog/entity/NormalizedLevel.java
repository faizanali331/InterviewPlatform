package com.mockinterview.catalog.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "normalized_levels",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_levels_number", columnNames = "level_number"),
                @UniqueConstraint(name = "uk_levels_name", columnNames = "level_name")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class NormalizedLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level_number", nullable = false)
    private Integer levelNumber;

    @Column(name = "level_name", nullable = false, length = 100)
    private String levelName;
}