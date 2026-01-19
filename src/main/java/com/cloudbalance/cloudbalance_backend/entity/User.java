package com.cloudbalance.cloudbalance_backend.entity;

import jakarta.persistence.*; //DB related annotations
import lombok.*;

import java.util.Set;


@Entity
@Table(name= "users")  //table name users instead of user
//@Data  //generate getter/setter automatically
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //(used in mysql, AUTO in any DB)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;


    @ManyToMany
    @JoinTable(
            name = "user_accounts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id")
    )
    private Set<Account> accounts;
}
