package com.cloudbalance.cloudbalance_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "accounts")
//@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String arn;

    @Column(nullable = false, unique = true)
    private String accountId;

    @Column(nullable = false)
    private String accountName;


    @ManyToMany(mappedBy = "accounts")
    private Set<User> users;


}
