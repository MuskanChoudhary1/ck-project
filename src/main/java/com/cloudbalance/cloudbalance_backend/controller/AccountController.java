package com.cloudbalance.cloudbalance_backend.controller;


import com.cloudbalance.cloudbalance_backend.dto.AccountRequestDTO;
import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','READ_ONLY')")
    @GetMapping
    public List<AccountResponseDto> getAllAccounts() {
        return accountService.getAllAccounts();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createAccount(@Valid @RequestBody AccountRequestDTO accountRequestDTO){
        return ResponseEntity.ok(accountService.createAccount(accountRequestDTO));
    }



}
