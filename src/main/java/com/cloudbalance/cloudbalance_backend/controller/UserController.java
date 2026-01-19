package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.UpdateUserRequestDTO;
import com.cloudbalance.cloudbalance_backend.dto.UserRequestDTO;
import com.cloudbalance.cloudbalance_backend.dto.UserResponseDTO;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import com.cloudbalance.cloudbalance_backend.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService){
        this.userService = userService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public UserResponseDTO createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        return userService.createUser(userRequestDTO);
    }



    @PreAuthorize("hasAnyRole('ADMIN','READ_ONLY')")
    @GetMapping
    public List<UserResponseDTO> getAllUSers() {
        return userService.getAllUsers();
    }



    @PreAuthorize("hasAnyRole('ADMIN','READ_ONLY')")
    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id) {
//        System.out.println("CONTROLLER HIT with id = " + id);;
        return userService.getUser(id);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequestDTO updateUserRequestDTO) {
        return userService.updateUser(id, updateUserRequestDTO);
    }

//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/me")
    public UserResponseDTO getMe(Authentication authentication) {
        String email = authentication.getName();
        return userService.getCurrentUser(email);
    }








}
