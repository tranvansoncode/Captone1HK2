package com.example.bemedicalappointment.service.impl;


import com.example.bemedicalappointment.model.Role;
import com.example.bemedicalappointment.model.RoleName;
import com.example.bemedicalappointment.repository.IRoleRepository;
import com.example.bemedicalappointment.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    IRoleRepository roleRepository;
    @Override
    public Optional<Role> findByName(RoleName name) {
        return roleRepository.findByName(name);
    }
}
