package com.cloudbalance.cloudbalance_backend.repository;


import com.cloudbalance.cloudbalance_backend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountId(String accountId);

}
