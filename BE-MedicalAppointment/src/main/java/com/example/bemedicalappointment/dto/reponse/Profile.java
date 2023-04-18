package com.example.bemedicalappointment.dto.reponse;

import com.example.bemedicalappointment.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.checkerframework.checker.formatter.qual.Format;
import org.hibernate.annotations.NaturalId;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Data
public class Profile {
    private long id;
    private String name;
    private Date birthday;
    private LocalDate dayOfBirthday;
    private int gender;
    private String address;
    private String phone;
    private String username;
    private String email;
    private String avatar;
}
