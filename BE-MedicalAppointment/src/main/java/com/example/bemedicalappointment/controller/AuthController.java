package com.example.bemedicalappointment.controller;

import com.example.bemedicalappointment.dto.reponse.JwtResponse;
import com.example.bemedicalappointment.dto.reponse.ResponseMessage;
import com.example.bemedicalappointment.dto.request.ForgotPassword;
import com.example.bemedicalappointment.dto.request.LoginForm;
import com.example.bemedicalappointment.dto.request.SignUpForm;
import com.example.bemedicalappointment.model.Role;
import com.example.bemedicalappointment.model.RoleName;
import com.example.bemedicalappointment.model.User;
import com.example.bemedicalappointment.security.jwt.JwtProvider;
import com.example.bemedicalappointment.security.userprincal.UserPrinciple;
import com.example.bemedicalappointment.service.IUserService;
import com.example.bemedicalappointment.service.impl.RoleServiceImpl;
import com.example.bemedicalappointment.service.impl.UserServiceImpl;
import com.example.bemedicalappointment.utils.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    RoleServiceImpl roleService;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    OTPService otpService;
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(),
            userDetails.getId() , userDetails.getName(), userDetails.getEmail(), userDetails.getAvatar() ,
            userDetails.getAuthorities()
        ));
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Tên tài khoản đã được sử dụng"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Email đã được sử dụng"),
                    HttpStatus.BAD_REQUEST);
        }
        if(otpService.getOtp(signUpRequest.getEmail()) == 0){
            return new ResponseEntity<>(new ResponseMessage("Otp không chính xác"),
                    HttpStatus.BAD_REQUEST);
        }
        if(otpService.getOtp(signUpRequest.getEmail()) == signUpRequest.getOtp()) {

            // Creating user's account
            User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()));
            Set<Role> roles = new HashSet<>();
            Role userRole = roleService.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
            roles.add(userRole);
            user.setRoles(roles);
            user.setCreateUser(LocalDateTime.now());
            userService.save(user);
            otpService.clearOTP(user.getEmail());

            return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);

        }
        return new ResponseEntity<>(new ResponseMessage("Otp không chính xác"), HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/forgot-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ForgotPassword forgotPassword){
        if(userService.existsByEmail(forgotPassword.getEmail())){
            if((otpService.getOtp(forgotPassword.getEmail()) == forgotPassword.getOtp())||(forgotPassword.getOtp()!=0)){
                User user= userService.findByEmail(forgotPassword.getEmail()).get();
                user.setPassword(passwordEncoder.encode(forgotPassword.getPassword()));
                userService.save(user);
                return new ResponseEntity<>(new ResponseMessage("Mật khẩu đã được thay đổi"), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ResponseMessage("Otp không chính xác"), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new ResponseMessage("Email không tồn tại"), HttpStatus.BAD_REQUEST);

    }
}
