import { Component, OnInit } from '@angular/core';
import { HospitalService } from "../../../service/hospital.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { ToastrService } from "ngx-toastr";
import { Hospital } from "../../../model/hospital";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-hospital-update',
  templateUrl: './hospital-update.component.html',
  styleUrls: ['./hospital-update.component.css']
})
export class HospitalUpdateComponent implements OnInit{
  hospital : Hospital;
  dataHospitalTypes: any;
  hospitalForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    discription: new FormControl(),
    status: new FormControl()
  });
  localUrl: any;
  seletedImage: any;
  id: number;
  typeObects: any = [];
  typeMap = new Map;
  constructor(private hospitalService:HospitalService,
              private fireStorage: AngularFireStorage,
              private toastrService:ToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit() :void{
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.getHospitalById();
    this.getType();

  }
  ngSubmit() : void{
    console.log(this.hospitalForm.status);
    this.hospital= this.hospitalForm.value;
    let types = Array.from(this.typeMap.keys());
    for (let item of types){
      if (this.typeMap.get(item)==false){
        this.typeMap.delete(item)
      }
    }
    types = Array.from(this.typeMap.keys());
    this.hospital.types = types;
    console.log(this.hospital.status)
    // if (!this.seletedImage) {
    //   this.hospitalService.updateHospital(this.hospital,this.id).subscribe(data => {
    //     this.toastrService.success('Cập nhật thông tin thành công');
    //   }, error => {
    //     this.toastrService.error('Cập nhật thất bại');
    //   });
    //   return;
    // }

    const file = this.seletedImage;
    const extension = file.name ? file.name.split('.').pop() : '';
    const filename = `${this.hospital.name}.${extension}`;
    const filePath = `hospital/${filename}`;
    this.fireStorage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => {
        const fileRef = this.fireStorage.ref(filePath);
        fileRef.getDownloadURL().subscribe(url => {
          if (url && url.length > 0) {
            this.hospital.urlImg = url;
          }
          this.hospitalService.updateHospital(this.hospital, this.id).subscribe(data => {
            this.toastrService.success('Cập nhật thông tin thành công');
          }, error => {
            console.log(error);
            this.toastrService.error('Cập nhật thất bại');
          });
        });
      })
    ).subscribe();
  }


  onChangeFile(event: any): void {
    if (event.target.files.length > 0) {
      this.seletedImage = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.seletedImage);

      reader.onload = () => {
        this.localUrl = reader.result as string;
      };
    }
  }
  getHospitalById():void{
    this.hospitalService.getHospital(this.id).subscribe(value => {
      this.hospital = value;
      this.typeObects = value.types;
      for (let i of value.types){
        this.typeMap.set(i.id,true);
      }
    })
  }
  getType(): void{
    this.hospitalService.getAllTypes().subscribe(data =>{
      this.dataHospitalTypes = data;
    })
  }

  isChecked(id: any) {
    if (this.typeMap.get(id)==true){
      return true;
    }
    return false;
  }

  toggleCheckbox(id: any) {
    const isChecked = this.typeMap.get(id);
    this.typeMap.set(id, !isChecked);

  }
}
