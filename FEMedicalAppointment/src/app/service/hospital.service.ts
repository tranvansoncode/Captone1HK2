import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";
import {Hospital} from "../model/hospital";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private API_PROFILE = 'http://localhost:8080/api/hospital';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getToken()
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'};
  constructor(private http: HttpClient, private tokenService: TokenService) { }
  getAllHospital(): Observable<any> {
    return this.http.get<any>( this.API_PROFILE+'/getAllHospital',this.httpOptions);
  }

  getAllTypes() {
    return this.http.get<any>( this.API_PROFILE+'/getAllHospitalType',this.httpOptions);
  }

  createHospital(hospital: Hospital) {
    return this.http.post<any>( this.API_PROFILE+'/createHospital',hospital,this.httpOptions);
  }
  getHospital(id:number) {
    return this.http.get<any>( this.API_PROFILE+`/getHospital?id=${id}`,this.httpOptions);
  }

  updateHospital(hospital: Hospital,id:number) {
    return this.http.put<any>( this.API_PROFILE+`/updateHospital?id=${id}`,hospital,this.httpOptions);
  }
}
