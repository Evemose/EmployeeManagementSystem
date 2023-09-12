package com.ems.core.security;

import com.ems.core.model.entitites.security.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import com.ems.core.repository.UserRepository;

@Service
public class UserDetailsManagerImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsManagerImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> users = userRepository.findByUsername(username);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("User not found for username: " + username);
        } else {
            return new org.springframework.security.core.userdetails.User(users.get(0).getUsername(), users.get(0).getPassword(), Set.of(new SimpleGrantedAuthority(users.get(0).getRole())));
        }
    }
}
