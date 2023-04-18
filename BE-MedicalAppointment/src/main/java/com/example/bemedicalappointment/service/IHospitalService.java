package com.example.bemedicalappointment.service;

import com.example.bemedicalappointment.model.Hospital;

import java.util.List;
import java.util.Optional;

public interface IHospitalService {
    List<Hospital> getAll();

    void save(Hospital hospital);

    boolean existsById(long id);

    Optional<Hospital> getHospitalById(Long id);

    void removeType(long id);
}
