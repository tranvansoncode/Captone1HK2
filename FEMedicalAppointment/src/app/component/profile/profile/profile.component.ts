import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "../../../service/profile.service";
import {Profile} from "../../../model/profile";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment';
import {pipe} from "rxjs";
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    name: new FormControl(),
    gender: new FormControl(),
    dayOfBirthday: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    avatar: new FormControl()
  })
  seletedImage: any;
  localUrl: string | ArrayBuffer;
  profile: Profile;
  constructor(private profileService:ProfileService,
              private fireStorage: AngularFireStorage,
              private toastrService:ToastrService) { }


  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(): void{
      this.profileService.getProfile().subscribe(data =>{
        this.profile = data;
      })
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
  }
  ngSubmit() {
    if (!this.seletedImage) {
      this.profileService.updateProfile(this.profile).subscribe(data => {
        window.location.reload();
        this.toastrService.success('Cập nhật thông tin thành công');
      }, error => {
        this.toastrService.error('Cập nhật thất bại');
      });
      return;
    }

    const file = this.seletedImage;
    const extension = file.name ? file.name.split('.').pop() : '';
    const filename = `${this.profile.id}.${extension}`;
    const fileRef = this.fireStorage.ref(filename);
    const filePath = `avatar/${filename}`;
    this.fireStorage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url && url.length > 0) {
            this.profile.avatar = url;
          }
          this.profileService.updateProfile(this.profile).subscribe(data => {
            window.location.reload();
            this.toastrService.success('Cập nhật thông tin thành công');
          }, error => {
            this.toastrService.error('Cập nhật thất bại');
          });
        });
      })
    ).subscribe();
  }
}
