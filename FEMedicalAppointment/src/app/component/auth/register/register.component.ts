import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {dateComparator} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';
import {SignIn} from '../../../model/sign-in';
import {SignUp} from '../../../model/sign-up';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,250}$/)]),
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    password:  new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    otp:  new FormControl(),
  });
  showStatus = 'password';
  signUp: SignUp;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  sendOtp() {
    this.authService.getOtpSignUp(this.signUpForm.value.email).subscribe(data => {
      this.toastr.success('Đã gửi mà thành công');
    }, error => {
      this.toastr.error('Thất bại');
    });
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
    this.signUp = this.signUpForm.value;
    this.authService.signUp(this.signUp).subscribe(data => {
      this.toastr.success('Đã đăng ký thành công');
      this.router.navigate(['/login']);
    }, error => {
      this.toastr.error('Đăng ký thất bại');
    });
  }
}
