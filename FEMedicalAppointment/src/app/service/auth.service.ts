import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';
import {SignIn} from '../model/sign-in';
import {Observable} from 'rxjs';
import {JwtResponse} from '../model/jwt-response';
import {SignUp} from '../model/sign-up';
import {ForgotPassword} from '../model/forgot-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_AUTH = 'http://localhost:8080/api/auth';
  // tslint:disable-next-line:variable-name
  private API_SENDMAIl = 'http://localhost:8080/api/email';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getToken()
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'};
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  signIn(signIn: SignIn): Observable<JwtResponse> {
    return this.http.post<JwtResponse>( this.API_AUTH + '/signin', signIn);
  }
  getOtpSignUp(email: string): Observable<any> {
    return this.http.get<any>(this.API_SENDMAIl + '/getOtpNotExistsByEmail?email=' + email);
  }

  signUp(signUp: SignUp): Observable<any> {
    return this.http.post<any>(this.API_AUTH + '/signup', signUp);
  }

  forgotPassword(forgotPassword: ForgotPassword): Observable<any>  {
    return this.http.put<any>(this.API_AUTH + '/forgot-password', forgotPassword);
  }

  getOtpForgot(email): Observable<any>  {
    return this.http.get<any>(this.API_SENDMAIl + '/getOtpExistsByEmail?email=' + email);
  }
}
