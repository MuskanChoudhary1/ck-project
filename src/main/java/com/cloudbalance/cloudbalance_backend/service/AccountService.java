package com.cloudbalance.cloudbalance_backend.service;


import com.cloudbalance.cloudbalance_backend.dto.AccountRequestDTO;
import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.entity.Account;
import com.cloudbalance.cloudbalance_backend.repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    public AccountService(AccountRepository accountRepository, ModelMapper modelMapper) {
        this.accountRepository = accountRepository;
        this.modelMapper = modelMapper;
    }

    public AccountResponseDto createAccount(AccountRequestDTO accountRequestDTO) {

//        Account account = modelMapper.map(accountRequestDTO, Account.class);
//        Account saved = accountRepository.save(account);
//
//        return modelMapper.map(saved, AccountResponseDto.class);

        if (accountRepository.findByAccountId(accountRequestDTO.getAccountId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "AWS account already exists");
        }


        Account account = new Account();
        account.setArn(accountRequestDTO.getArn());
        account.setAccountId(accountRequestDTO.getAccountId());
        account.setAccountName(accountRequestDTO.getAccountName());

        Account saved = accountRepository.save(account);

        // map manually for response
        AccountResponseDto response = new AccountResponseDto();
        response.setId(saved.getId());
        response.setArn(saved.getArn());
        response.setAccountId(saved.getAccountId());
        response.setAccountName(saved.getAccountName());

        return response;

    }

    public List<AccountResponseDto> getAllAccounts() {
        return accountRepository.findAll().stream().map(acc -> modelMapper.map(acc, AccountResponseDto.class)).toList();
    }
}
