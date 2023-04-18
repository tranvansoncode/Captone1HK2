package com.example.bemedicalappointment.repository;

import com.example.bemedicalappointment.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IHospitalRepository extends JpaRepository<Hospital,Long> {

    @Modifying
    @Query(value = "DELETE FROM hospital_type WHERE hospital_id = ?1", nativeQuery = true)
    void deleteByHospitalTypes(long hospitalId);
}
