package com.cloudbalance.cloudbalance_backend.dto;


import lombok.Data;

import java.util.Set;

@Data
public class UserResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    private Set<Long> accountIds;


}

