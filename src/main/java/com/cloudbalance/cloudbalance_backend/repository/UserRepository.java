
package com.cloudbalance.cloudbalance_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cloudbalance.cloudbalance_backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User>findByEmail(String email);

    boolean existsByEmail(String email);
}



//jpaRepository -> automatically get(DB operatns)
// save() -> insert
// findById() -> slct by id
// findAll() -> slct all
// deleteById() -> dlt
// existById() -> chck if row exist
// count() -> totalrows

//Optional -> used for safe null handling