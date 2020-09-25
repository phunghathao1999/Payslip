import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth-routing.module';
import { MaterialLibraryModule } from '../shared/material/material-library.module';
import { ForgotpasswordComponent } from './../auth/forgotpassword/forgotpassword.component';
import { NotfoundComponent } from './../auth/forgotpassword/notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { InformationComponent } from './profile/information/information.component';
import { PasswordComponent } from './profile/password/password.component';
import { DialogsuccessComponent } from './profile/dialogsuccess/dialogsuccess.component';
import { DialogavatarComponent } from './profile/dialogavatar/dialogavatar.component';


@NgModule({
  declarations: [
    LoginComponent,
    NotfoundComponent,
    ForgotpasswordComponent,
    ProfileComponent,
    InformationComponent,
    PasswordComponent,
    DialogsuccessComponent,
    DialogavatarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MaterialLibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
