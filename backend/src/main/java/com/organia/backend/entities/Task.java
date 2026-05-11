package com.organia.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="tasks")
@Data
public class Task {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;
}
