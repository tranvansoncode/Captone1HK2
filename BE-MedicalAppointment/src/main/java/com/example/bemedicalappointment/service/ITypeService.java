package com.example.bemedicalappointment.service;

import com.example.bemedicalappointment.model.Hospital;
import com.example.bemedicalappointment.model.Type;

import java.util.List;
import java.util.Optional;

public interface ITypeService {
    List<Type> getAll();

    Optional<Type> findById(long id);
}
