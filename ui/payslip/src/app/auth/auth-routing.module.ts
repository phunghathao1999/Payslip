import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './../auth/forgotpassword/forgotpassword.component';
import { NotfoundComponent } from './../auth/forgotpassword/notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';

export const authRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'notfound', component: NotfoundComponent },
    { path: 'profile', component: ProfileComponent },
]