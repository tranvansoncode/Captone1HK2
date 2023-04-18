package com.example.bemedicalappointment.service;


import com.example.bemedicalappointment.model.User;

import java.util.Optional;

public interface IUserService {
    Optional<User> findByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);

    Iterable<User> findUsersByNameContaining(String user_name);
    User save(User user);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);
}
