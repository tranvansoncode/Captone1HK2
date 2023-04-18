package com.example.bemedicalappointment.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String discription;
    private String urlImg;
    private int status;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "hospital_type" ,
            joinColumns = @JoinColumn(name = "hospital_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id"))
    @JsonManagedReference
    private Set<Type> types = new HashSet<>();
}
