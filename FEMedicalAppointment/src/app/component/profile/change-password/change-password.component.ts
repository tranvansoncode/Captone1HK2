import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Profile} from "../../../model/profile";
import {ProfileService} from "../../../service/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePassword} from "../../../model/change-password";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    newPassword:  new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    reNewPassword:  new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
  });
  changePassword:ChangePassword;
  constructor(private toastrService:ToastrService,
              private profileService:ProfileService) { }

  ngOnInit(): void {

  }


  ngSubmit() {
    this.changePassword = this.changePasswordForm.value;
    this.profileService.changePasswordSave(this.changePassword).subscribe(data =>{
      this.toastrService.success('Cập nhập mật khẩu thành công')
    }, error => {
      this.toastrService.error('Cập nhập mật khẩu không thành công')
    })
  }
  showStatus='password';
  showPassword() {
    // tslint:disable-next-line:triple-equals
    if (this.showStatus == 'password'){
      this.showStatus = 'text';
    }else {
      this.showStatus = 'password';
    }
  }
  showStatus1='password';
  showPassword1() {
    // tslint:disable-next-line:triple-equals
    if (this.showStatus1== 'password'){
      this.showStatus1 = 'text';
    }else {
      this.showStatus1 = 'password';
    }
  }
  showStatus2='password';
  showPassword2() {
    // tslint:disable-next-line:triple-equals
    if (this.showStatus2 == 'password'){
      this.showStatus2 = 'text';
    }else {
      this.showStatus2 = 'password';
    }
  }

}
