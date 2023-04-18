package com.example.bemedicalappointment.utils;

public interface EmailService {
    boolean sendEmail(String to, String subject, String message);
}