package com.cloudbalance.cloudbalance_backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.cloudbalance.cloudbalance_backend.entity.User;

import java.util.Collection;
import java.util.List;


public class UserDetailsImpl implements UserDetails {
    private final User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }


    public String getName(){
        return user.getFirstName();
    }


    @Override
    public String getUsername() {
        return user.getEmail();
    }


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }

}
