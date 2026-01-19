package com.cloudbalance.cloudbalance_backend.dto;


import lombok.Data;

@Data
public class AccountResponseDto {

    private Long id;
    private String arn;
    private String accountId;
    private String accountName;

}
