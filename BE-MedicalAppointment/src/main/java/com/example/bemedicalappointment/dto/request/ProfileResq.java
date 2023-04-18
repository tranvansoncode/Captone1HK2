package com.example.bemedicalappointment.dto.request;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class ProfileResq {
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
