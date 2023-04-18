package com.example.bemedicalappointment.service;



import com.example.bemedicalappointment.model.Role;
import com.example.bemedicalappointment.model.RoleName;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(RoleName name);
}
