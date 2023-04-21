import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/auth/login/login.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './component/user/home/home.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotPasswordComponent } from './component/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './component/profile/profile/profile.component';
import { ChangePasswordComponent } from './component/profile/change-password/change-password.component';
import { HospitalCreateComponent } from './component/hospital/hospital-create/hospital-create.component';
import { HospitalListComponent } from './component/hospital/hospital-list/hospital-list.component';
import { HospitalUpdateComponent } from './component/hospital/hospital-update/hospital-update.component';
import {NgxPaginationModule} from "ngx-pagination";
import {OrderModule} from "ngx-order-pipe";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ChangePasswordComponent,
    HospitalCreateComponent,
    HospitalListComponent,
    HospitalUpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireStorageModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
