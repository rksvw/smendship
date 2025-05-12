import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { loginGuard } from './guards/login.guard';
import { NewUserComponent } from './components/new-user/new-user.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
    {path: '', component: IndexComponent},
    {path: 'create-user', component: NewUserComponent, canActivate: [loginGuard]}
];
