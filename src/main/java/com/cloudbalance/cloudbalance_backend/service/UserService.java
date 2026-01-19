package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.UpdateUserRequestDTO;
import com.cloudbalance.cloudbalance_backend.dto.UserRequestDTO;
import com.cloudbalance.cloudbalance_backend.dto.UserResponseDTO;
import com.cloudbalance.cloudbalance_backend.entity.Account;
import com.cloudbalance.cloudbalance_backend.entity.Role;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.exception.UserNotFoundException;
import com.cloudbalance.cloudbalance_backend.repository.AccountRepository;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;

    public UserService(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
    }



//    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
//
//        // Map DTO to entity
//        User user = modelMapper.map(userRequestDTO, User.class);
//
//        // Encode the password
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        // Convert role from String to Enum
//        user.setRole(Role.valueOf(userRequestDTO.getRole()));
//
//        // Only CUSTOMER can have accounts
//        if (Role.CUSTOMER.equals(user.getRole())
//                && userRequestDTO.getAccountIds() != null
//                && !userRequestDTO.getAccountIds().isEmpty()) {
//
//            // Fetch accounts by primary key (id)
//            Set<Account> accounts =
//                    new HashSet<>(accountRepository.findAllById(userRequestDTO.getAccountIds()));
//
//            user.setAccounts(accounts);
//        }
//
//        // Save user
//        User savedUser = userRepository.save(user);
//
//        return modelMapper.map(savedUser, UserResponseDTO.class);
//    }

//    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
//
//        // -------------------------
//        // MANUAL MAPPING
//        // -------------------------
//        User user = new User();
//        user.setFirstName(userRequestDTO.getFirstName());
//        user.setLastName(userRequestDTO.getLastName());
//        user.setEmail(userRequestDTO.getEmail());
//
//        // -------------------------
//        // CONVERT STRING ROLE TO ENUM
//        // -------------------------
//        try {
//            user.setRole(Role.valueOf(userRequestDTO.getRole()));
//        } catch (IllegalArgumentException e) {
//            throw new RuntimeException("Invalid role: " + userRequestDTO.getRole());
//        }
//
//        // -------------------------
//        // ENCODE PASSWORD
//        // -------------------------
//        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
//
//        // -------------------------
//        // ASSIGN ACCOUNTS FOR CUSTOMER
//        // -------------------------
//        if (user.getRole() == Role.CUSTOMER
//                && userRequestDTO.getAccountIds() != null
//                && !userRequestDTO.getAccountIds().isEmpty()) {
//
//            Set<Account> accounts = new HashSet<>(accountRepository.findAllById(userRequestDTO.getAccountIds()));
//
//            if (accounts.size() != userRequestDTO.getAccountIds().size()) {
//                throw new RuntimeException("Some account IDs are invalid");
//            }
//
//            user.setAccounts(accounts);
//        }
//
//        // -------------------------
//        // SAVE USER
//        // -------------------------
//        User savedUser = userRepository.save(user);
//
//        // -------------------------
//        // MAP TO RESPONSE DTO
//        // -------------------------
//        UserResponseDTO responseDTO = new UserResponseDTO();
//        responseDTO.setId(savedUser.getId());
//        responseDTO.setFirstName(savedUser.getFirstName());
//        responseDTO.setLastName(savedUser.getLastName());
//        responseDTO.setEmail(savedUser.getEmail());
//        responseDTO.setRole(savedUser.getRole().name());
//
//        // If CUSTOMER, include account info in response
//        if (savedUser.getRole() == Role.CUSTOMER && savedUser.getAccounts() != null) {
//            Set<Long> accountIds = savedUser.getAccounts().stream()
//                    .map(Account::getId)
//                    .collect(Collectors.toSet());
//            responseDTO.setAccountIds(accountIds);
//        }
//
//        return responseDTO;
//    }
//



    public UserResponseDTO createUser(UserRequestDTO dto) {

        // Duplicate email
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        // Role validation
        try {
            user.setRole(Role.valueOf(dto.getRole()));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid role"
            );
        }

        // CUSTOMER must have accounts
        if (user.getRole() == Role.CUSTOMER &&
                (dto.getAccountIds() == null || dto.getAccountIds().isEmpty())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Customer must have at least one account"
            );
        }

        // non-CUSTOMER must NOT have accounts
        if (user.getRole() != Role.CUSTOMER &&
                dto.getAccountIds() != null &&
                !dto.getAccountIds().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only CUSTOMER can be assigned accounts"
            );
        }

        // Assign accounts
        if (user.getRole() == Role.CUSTOMER) {
            Set<Account> accounts =
                    new HashSet<>(accountRepository.findAllById(dto.getAccountIds()));

            if (accounts.size() != dto.getAccountIds().size()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid account IDs provided"
                );
            }
            user.setAccounts(accounts);
        }

        User saved = userRepository.save(user);
        return modelMapper.map(saved, UserResponseDTO.class);
    }



    public List<UserResponseDTO> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDTO.class))
                .toList();
    }



    public UserResponseDTO getUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->  new UserNotFoundException(id));
//        System.out.println("Fetching user with id: " + id);
//        return modelMapper.map(user, UserResponseDTO.class);
        UserResponseDTO dto = modelMapper.map(user, UserResponseDTO.class);

        if (user.getRole() == Role.CUSTOMER && user.getAccounts() != null) {
            Set<Long> accountIds = user.getAccounts()
                    .stream()
//                    .map(account -> account.getId())
                    .map(Account::getId)
                    .collect(Collectors.toSet());
            dto.setAccountIds(accountIds);
        }

        return dto;
    }






//    public UserResponseDTO updateUser(Long id, UpdateUserRequestDTO updateUserRequestDTO) {
//
//        User existingUser = userRepository.findById(id)
//                .orElseThrow(() -> new UserNotFoundException(id));
//
//        modelMapper.map(updateUserRequestDTO, existingUser);
//
//        User updatedUser = userRepository.save(existingUser);
//
//        return modelMapper.map(updatedUser, UserResponseDTO.class);
//
//    }

    public UserResponseDTO updateUser(Long id, UpdateUserRequestDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));


        if (user.getRole() == Role.ADMIN && !dto.getRole().equals(Role.ADMIN.name())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Admin role cannot be changed"
            );
        }


        // Update basic fields
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());

        Role newRole;
        try {
            newRole = Role.valueOf(dto.getRole());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role");
        }

        // Handle role change
        if (user.getRole() != newRole) {
            user.setRole(newRole);
            if (newRole != Role.CUSTOMER) {
                // Remove all assigned accounts if role changes to ADMIN/READ_ONLY
                user.getAccounts().clear();
            }
        }

        // Assign accounts if CUSTOMER
        if (newRole == Role.CUSTOMER && dto.getAccountIds() != null) {
            Set<Account> accounts = new HashSet<>(accountRepository.findAllById(dto.getAccountIds()));
            if (accounts.size() != dto.getAccountIds().size()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid account IDs");
            }
            user.setAccounts(accounts);
        }

        User saved = userRepository.save(user);

        return modelMapper.map(saved, UserResponseDTO.class);
    }


    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                .orElseThrow(() -> new UserNotFoundException(id));

        userRepository.delete(user);

    }


    public UserResponseDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid token"
                ));

        return getUser(user.getId()); // reuse existing logic (includes accounts)
    }

}
