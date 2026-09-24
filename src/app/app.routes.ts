import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    {path:'auth',component:AuthComponent,title:"sign up page"},
    {path:'login',component:LoginComponent,title:"login page"}
];
