import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../../service/hospital.service";
import {Hospital} from "../../../model/hospital";

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {
  hospitals : Hospital[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  orderByField: string;
  orderByDirection: boolean;
  searchText = '';
  constructor(private hospitalService:HospitalService) { }

  ngOnInit(): void {
        this.getHospital();
        console.log(this.hospitals);
    }

  getHospital(): void{
    this.hospitalService.getAllHospital().subscribe(data =>{
      this.hospitals = data;
    })

  }
  sort(field: string) {
    if (this.orderByField === field) {
      this.orderByDirection = !this.orderByDirection;
    } else {
      this.orderByField = field;
      this.orderByDirection = true;
    }

    // Sắp xếp các phần tử trong mảng hospitals
    this.hospitals.sort((a, b) => {
      if (a[field] < b[field]) {
        return this.orderByDirection ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.orderByDirection ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
