import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignIn} from '../../../model/sign-in';
import {AuthService} from '../../../service/auth.service';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showStatus = 'password';

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
    password:  new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,250}$/)]),
  });
  private signIn: SignIn;
  private message: string;
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  ngSubmit() {
    this.signIn = this.signInForm.value;
    this.authService.signIn(this.signIn).subscribe(data => {
      this.tokenService.setToken(data.accessToken)
        this.router.navigate(['/']);
        this.toastr.success('Đăng nhập thành công');
      },
      error => {
        this.toastr.error('Đăng nhập thất bại');
        this.message = error.error.message;
      }
    );
  }
  showPassword() {
    // tslint:disable-next-line:triple-equals
      if (this.showStatus == 'password'){
        this.showStatus = 'text';
      }else {
        this.showStatus = 'password';
      }
  }
}
