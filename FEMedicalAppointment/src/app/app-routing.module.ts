import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './component/auth/login/login.component';
import {HomeComponent} from './component/user/home/home.component';
import {RegisterComponent} from './component/auth/register/register.component';
import {ForgotPasswordComponent} from './component/auth/forgot-password/forgot-password.component';
import {ProfileComponent} from "./component/profile/profile/profile.component";
import {ChangePasswordComponent} from "./component/profile/change-password/change-password.component";
import {HospitalListComponent} from "./component/hospital/hospital-list/hospital-list.component";
import {HospitalCreateComponent} from "./component/hospital/hospital-create/hospital-create.component";
import {HospitalUpdateComponent} from "./component/hospital/hospital-update/hospital-update.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgotpassord',
    component: ForgotPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'hospital',
    component: HospitalListComponent
  },
  {
    path: 'hospital/create',
    component: HospitalCreateComponent
  },
  {
    path: 'hospital/update/:id',
    component: HospitalUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
