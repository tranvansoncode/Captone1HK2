package com.example.bemedicalappointment.repository;

import com.example.bemedicalappointment.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.lang.model.element.TypeElement;

@Repository
public interface ITypeRepository extends JpaRepository<Type,Long> {
}
