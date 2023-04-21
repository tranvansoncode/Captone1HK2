import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../../service/profile.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {HospitalService} from "../../../service/hospital.service";
import {Hospital} from "../../../model/hospital";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-hospital-create',
  templateUrl: './hospital-create.component.html',
  styleUrls: ['./hospital-create.component.css']
})
export class HospitalCreateComponent implements OnInit {
  hospital : Hospital;
  hospitalTypes: any;
  types = [];
  hospitalForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    discription: new FormControl()
  });
  localUrl: any;
  seletedImage: any;
  constructor(private hospitalService:HospitalService,
              private fireStorage: AngularFireStorage,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getType();
  }
  getType(){
    this.hospitalService.getAllTypes().subscribe(data =>{
        this.hospitalTypes = data;
    })
  }

  updateTypeHospital(event: any, id: number) {
    if(event.target.checked){
      this.types.push(id);
    }
    if (!event.target.checked) {
      const index = this.types.indexOf(id);
      if (index !== -1) {
        this.types.splice(index, 1);
      }
    }
  }
  ngSubmit() {
    if(!this.seletedImage){
      this.hospital = this.hospitalForm.value;
      this.hospital.types = this.types;
      this.hospitalService.createHospital(this.hospital).subscribe(value => {
      })
    }
    this.hospital = this.hospitalForm.value;
    this.hospital.types = this.types;
      const file = this.seletedImage;
      const extension = file.name ? file.name.split('.').pop() : '';
      const filename = `${this.hospital.name}.${extension}`;
      const filePath = `hospital/${filename}`;
      const fileRef = this.fireStorage.ref(`${filePath}`);
      this.fireStorage.upload(filePath, file).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.hospital.urlImg= url;
            this.hospitalService.createHospital(this.hospital).subscribe(value => {

            })
          });
        })
      ).subscribe();
  }


  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      this.seletedImage = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.seletedImage);

      reader.onload = () => {
        this.localUrl = reader.result as string;
      };
    }
    console.log(this.localUrl)
  }
}
