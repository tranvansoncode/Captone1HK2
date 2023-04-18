package com.example.bemedicalappointment.service.impl;

import com.example.bemedicalappointment.model.Hospital;
import com.example.bemedicalappointment.model.Type;
import com.example.bemedicalappointment.repository.ITypeRepository;
import com.example.bemedicalappointment.service.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeServiceImpl implements ITypeService {
    @Autowired
    private ITypeRepository iTypeRepository;

    @Override
    public List<Type> getAll() {
        return iTypeRepository.findAll();
    }

    @Override
    public Optional<Type> findById(long id) {
        return iTypeRepository.findById(id);
    }
}
