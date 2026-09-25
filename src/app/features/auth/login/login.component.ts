import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
private readonly authService = inject(AuthService)
private readonly fb =inject(FormBuilder)
private readonly router =inject(Router)
private readonly cookieService =inject(CookieService)
loginerror = '';
showpassword = false;
loginform:FormGroup=this.fb.group({
email:["",[Validators.required,Validators.email]],
password:["",[Validators.required]],
rememberme:[false]
});
loginsubmit(): void {
  if (this.loginform.invalid) {
    this.loginform.markAllAsTouched();
    return;
  }
 this.loginerror = '';
  const logindata = {
    email: this.loginform.value.email,
    password: this.loginform.value.password,
  };

  this.authService.login(logindata).subscribe({
    next: (res) => {
      console.log(res);
      //store rememberme value in this constant from loginform
      const remember=this.loginform.value.rememberme
      if (remember===true) {
        //expiredate start count from now
        const expiredate=new Date()
        //make expiredate after 1 month from from date setted
        expiredate.setMonth(expiredate.getMonth()+1)
        //set access_token + expiredate and refresh_token + expiredate
        this.cookieService.set('access_token',res.access_token,expiredate)
      this.cookieService.set('refresh_token',res.refresh_token,expiredate)
        this.cookieService.set('expires_at', res.expires_at, expiredate);
         
      }
      else{
        //set access_token  and refresh_token 
      this.cookieService.set('access_token',res.access_token)
      this.cookieService.set('refresh_token',res.refresh_token)
        this.cookieService.set('expires_at', res.expires_at);
        
      }

     
      this.router.navigate(['/project']);
    },

    error: (err) => {
      console.log(err);
      this.loginerror = 'Invalid email or password.';
    },
  });
}
}
