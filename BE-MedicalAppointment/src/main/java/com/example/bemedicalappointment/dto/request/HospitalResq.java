package com.example.bemedicalappointment.dto.request;

import com.example.bemedicalappointment.model.Type;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class HospitalResq {
    private String name;
    private String email;
    private String phone;
    private String address;
    private String discription;
    private String urlImg;
    private int status;
    private Set<Long> types;
}
