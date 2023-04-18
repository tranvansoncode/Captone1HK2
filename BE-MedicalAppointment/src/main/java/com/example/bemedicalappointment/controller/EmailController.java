package com.example.bemedicalappointment.controller;

import com.example.bemedicalappointment.dto.reponse.ResponseMessage;
import com.example.bemedicalappointment.dto.request.SignUpForm;
import com.example.bemedicalappointment.model.User;
import com.example.bemedicalappointment.service.IUserService;
import com.example.bemedicalappointment.utils.EmailService;
import com.example.bemedicalappointment.utils.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {
    @Autowired
    private OTPService otpService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private IUserService iUserService;
    @GetMapping("/getOtpNotExistsByEmail")
    public ResponseEntity<ResponseMessage> getOtpNotExistsByEmail(@RequestParam String email) {
        if (iUserService.existsByEmail(email)==false) {
            int otp = otpService.generateOTP(email);
            String message = "<h3>Otp</h3>"
                    + "<p>Mã OTP để đăng ký tài khoản của bạn là: " + otp + ".</p>"
                    + "<p>Mã OTP có hiệu lực trong thời gian 4 phút.</p>";
            if(emailService.sendEmail(email, "Book a medical appointmeent", message))
                return new ResponseEntity<>(new ResponseMessage(String.valueOf(otp)), HttpStatus.OK);
            return new ResponseEntity<>(new ResponseMessage("Gửi email bị lỗi"), HttpStatus.BAD_REQUEST);
        }
        else return new ResponseEntity<>(new ResponseMessage("Email đã tồn tại trong hệ thống"), HttpStatus.BAD_REQUEST);
    }
    @GetMapping({"/getOtpExistsByEmail"})
    public ResponseEntity<?> getOtpExistsByEmail(@RequestParam String email) {
        if(iUserService.existsByEmail(email)==true){
//            User user= iUserService.findByEmail(email).get();
            int otp = otpService.generateOTP(email);
            String message = "<h3>Otp</h3>"
                    + "<p>Mã OTP để đăng ký tài khoản của bạn là: " + otp + ".</p>"
                    + "<p>Mã OTP có hiệu lực trong thời gian 4 phút.</p>";
            SignUpForm signUpForm = new SignUpForm();
            signUpForm.setEmail(email);
            signUpForm.setOtp(otp);
            if(emailService.sendEmail(email, "Book a medical appointmeent", message))
                return new ResponseEntity<>(signUpForm, HttpStatus.OK);
            return new ResponseEntity<>(new ResponseMessage("Gửi email bị lỗi"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Email không tồn tại"), HttpStatus.BAD_REQUEST);
    }
}
