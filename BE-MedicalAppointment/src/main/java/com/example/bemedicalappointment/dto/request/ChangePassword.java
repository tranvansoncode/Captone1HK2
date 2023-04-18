package com.example.bemedicalappointment.dto.request;

import lombok.Data;

@Data
public class ChangePassword {
    private String password;
    private String newPassword;
    private String reNewPassword;
}
