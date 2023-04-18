package com.example.bemedicalappointment.dto.request;

import lombok.Data;

@Data
public class ForgotPassword {
    private String email;
    private String password;
    private int otp;
}
