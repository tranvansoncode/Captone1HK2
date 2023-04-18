package com.example.bemedicalappointment.service.impl;

import com.example.bemedicalappointment.model.Hospital;
import com.example.bemedicalappointment.repository.IHospitalRepository;
import com.example.bemedicalappointment.service.IHospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class HospitalServiceImpl implements IHospitalService {
    @Autowired
    private IHospitalRepository iHospitalRepository;

    @Override
    public List<Hospital> getAll() {
        return iHospitalRepository.findAll();
    }

    @Override
    public void save(Hospital hospital) {
        iHospitalRepository.save(hospital);
    }

    @Override
    public boolean existsById(long id) {
        return iHospitalRepository.existsById(id);
    }

    public Optional<Hospital> getHospitalById(Long id) {
        return iHospitalRepository.findById(id);
    }

    @Override
    @Transactional
    public void removeType(long id) {
        iHospitalRepository.deleteByHospitalTypes(id);
    }
}
