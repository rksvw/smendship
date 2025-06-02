import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent, canActivate: [authGuard]},
    {path: 'signup', component: SignupComponent, canActivate: [authGuard]}
];
