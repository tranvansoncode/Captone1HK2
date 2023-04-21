import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {SignIn} from "../model/sign-in";
import {Observable} from "rxjs";
import {JwtResponse} from "../model/jwt-response";
import {Profile} from "../model/profile";
import {ChangePassword} from "../model/change-password";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private API_PROFILE = 'http://localhost:8080/api/profile';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getToken()
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'};
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getProfile(): Observable<any> {
    return this.http.get<any>( this.API_PROFILE,this.httpOptions);
  }

  updateProfile(profile: Profile):  Observable<Profile> {
    return this.http.put<Profile>( this.API_PROFILE+'/update',profile,this.httpOptions);
  }

  changePasswordSave(changePassword: ChangePassword): Observable<ChangePassword> {
    return this.http.put<any>( this.API_PROFILE+'/change-password',changePassword,this.httpOptions);
  }
}
