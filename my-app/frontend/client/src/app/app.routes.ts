import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
    {path: '', component: IndexComponent}
];
