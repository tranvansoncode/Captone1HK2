package com.example.bemedicalappointment.controller;

import com.example.bemedicalappointment.dto.reponse.ResponseMessage;
import com.example.bemedicalappointment.dto.request.HospitalResq;
import com.example.bemedicalappointment.model.Hospital;
import com.example.bemedicalappointment.model.Type;
import com.example.bemedicalappointment.service.IHospitalService;
import com.example.bemedicalappointment.service.ITypeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/hospital")
@CrossOrigin(origins = "*")
public class HospitalController {
    @Autowired
    private IHospitalService iHospitalService;
    @Autowired
    private ITypeService iTypeService;
    @GetMapping("getAllHospital")
    public ResponseEntity<?> getAllHospital(){
        if(iHospitalService.getAll().isEmpty()){
            return new ResponseEntity<>(new ResponseMessage("Không có dữ liệu"), HttpStatus.NO_CONTENT);
        }else{
            List<Hospital> hospitals= iHospitalService.getAll();
            return new ResponseEntity<>(hospitals, HttpStatus.OK);
        }
    }
    @GetMapping("getAllHospitalType")
    public ResponseEntity<?> getAllHospitalType(){
        if(iTypeService.getAll().isEmpty()){
            return new ResponseEntity<>(new ResponseMessage("Không có dữ liệu"), HttpStatus.NO_CONTENT);
        }else{
            List<Type> hospitalTypes= iTypeService.getAll();
            return new ResponseEntity<>(hospitalTypes, HttpStatus.OK);
        }
    }
    @PostMapping("createHospital")
    public ResponseEntity<?> createHospital(@Valid @RequestBody HospitalResq hospitalResq){
        Hospital hospital= new Hospital();
        hospital.setName(hospitalResq.getName());
        hospital.setPhone(hospitalResq.getPhone());
        hospital.setEmail(hospitalResq.getEmail());
        hospital.setAddress(hospitalResq.getAddress());
        hospital.setDiscription(hospitalResq.getDiscription());
        hospital.setUrlImg(hospitalResq.getUrlImg());
        Set<Long> longTypes =hospitalResq.getTypes();
        Set<Type> types = new HashSet<>();
        longTypes.forEach(
                type ->{
                    Type getType = iTypeService.findById(type.longValue())
                            .orElseThrow(() -> new RuntimeException("Type không tồn tại"));
                    types.add(getType);
                }
        );
        hospital.setTypes(types);
        iHospitalService.save(hospital);
        return new ResponseEntity<>(new ResponseMessage("Tạo thành công"), HttpStatus.OK);
    }
    @PutMapping("updateHospital")
    public ResponseEntity<?> updateHospital(@Valid @RequestBody HospitalResq hospitalResq, @RequestParam("id") long id){
        if(!iHospitalService.existsById(id)){
            return new ResponseEntity<>(new ResponseMessage("Không tồn tại"), HttpStatus.OK);
        }
        Hospital hospital = iHospitalService.getHospitalById(id).get();
        hospital.setName(hospitalResq.getName());
        hospital.setPhone(hospitalResq.getPhone());
        hospital.setEmail(hospitalResq.getEmail());
        hospital.setAddress(hospitalResq.getAddress());
        hospital.setDiscription(hospitalResq.getDiscription());
        hospital.setUrlImg(hospitalResq.getUrlImg());
        Set<Long> longTypes =hospitalResq.getTypes();
        Set<Type> types = new HashSet<>();
        iHospitalService.removeType(id);
        longTypes.forEach(
                type ->{
                    Type getType = iTypeService.findById(type.longValue())
                            .orElseThrow(() -> new RuntimeException("Type không tồn tại"));
                    types.add(getType);
                }
        );
        hospital.setTypes(types);
        hospital.setTypes(types);
        iHospitalService.save(hospital);
        return new ResponseEntity<>(new ResponseMessage("Update thành công"), HttpStatus.OK);
    }
}
