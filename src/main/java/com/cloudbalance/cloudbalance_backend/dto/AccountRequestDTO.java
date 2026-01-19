package com.cloudbalance.cloudbalance_backend.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AccountRequestDTO {

    @NotBlank(message = "IAM Role ARN is required")
    private String arn;

    @NotBlank(message = "Account ID is required")
    private String accountId;

    @NotBlank(message = "Account name is required")
    private String accountName;
}
