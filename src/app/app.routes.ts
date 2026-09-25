import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectComponent } from './features/tasks/project/project.component';
import { ForgetpasswordComponent } from './features/auth/forgetpassword/forgetpassword.component';

export const routes: Routes = [
    {path:'auth',component:AuthComponent,title:"sign up page"},
    {path:'login',component:LoginComponent,title:"login page"},
    {path:'forget',component:ForgetpasswordComponent,title:"forget password page"},
    {path:'project',component:ProjectComponent,title:"project page"}
];
