import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { loginGuard } from './guards/login.guard';
import { NewUserComponent } from './components/new-user/new-user.component';
import { createUserGuard } from './guards/create-user.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: IndexComponent},
    {path: 'create-user', component: NewUserComponent},
    {path: '**', redirectTo: ''}
];
