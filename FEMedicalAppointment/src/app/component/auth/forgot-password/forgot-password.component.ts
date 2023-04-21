import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForgotPassword} from '../../../model/forgot-password';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  showStatus = 'password';
  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    password:  new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    otp: new FormControl()
  });
  forgotPassword: ForgotPassword;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showPassword() {
    // tslint:disable-next-line:triple-equals
    if (this.showStatus == 'password'){
      this.showStatus = 'text';
    }else {
      this.showStatus = 'password';
    }
  }

  ngSubmit() {
    this.forgotPassword = this.forgotForm.value;
    console.log(this.forgotForm.value);
    this.authService.forgotPassword(this.forgotPassword).subscribe(data => {
      this.toastr.success('Mật khẩu đã được thay đổi');
      this.router.navigate(['/login']);
    }, error => {
      this.toastr.error('Thất bại');
    });
  }

  sendOtp() {
    console.log(this.forgotForm.value.email);
    this.authService.getOtpForgot(this.forgotForm.value.email).subscribe(data => {
      this.toastr.success('Đã gửi mà thành công');
    }, error => {
      this.toastr.error('Thất bại');
    });
  }
}
