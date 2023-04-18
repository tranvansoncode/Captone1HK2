package com.example.bemedicalappointment.controller;

import com.example.bemedicalappointment.dto.reponse.Profile;
import com.example.bemedicalappointment.dto.reponse.ResponseMessage;
import com.example.bemedicalappointment.dto.request.ChangePassword;
import com.example.bemedicalappointment.dto.request.LoginForm;
import com.example.bemedicalappointment.dto.request.ProfileResq;
import com.example.bemedicalappointment.model.User;
import com.example.bemedicalappointment.security.userprincal.UserPrinciple;
import com.example.bemedicalappointment.service.impl.UserServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @GetMapping()
    public ResponseEntity<?> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userService.findById(id).get();
        Profile profile= new Profile();
        BeanUtils.copyProperties(user, profile);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ProfileResq profile){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userService.findById(id).get();
        user.setName(profile.getName());
        user.setGender(profile.getGender());
        user.setDayOfBirthday(profile.getDayOfBirthday());
        user.setPhone(profile.getPhone());
        user.setAddress(profile.getAddress());
        user.setAvatar(profile.getAvatar());
        userService.save(user);
        return new ResponseEntity<>(new ResponseMessage("Cập nhật thành công"), HttpStatus.OK);
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> update(@Valid @RequestBody ChangePassword changePassword){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userService.findById(id).get();
        if(!changePassword.getNewPassword().equals(changePassword.getReNewPassword())){
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu không khớp"), HttpStatus.BAD_REQUEST);
        }
        if(!passwordEncoder.matches(changePassword.getPassword(), user.getPassword())){
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu không chính xác"), HttpStatus.BAD_REQUEST);
        }
        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        userService.save(user);
        return new ResponseEntity<>(new ResponseMessage("Đổi mật khẩu thành công"), HttpStatus.OK);
    }

}
