import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
private readonly authService = inject(AuthService)
private readonly fb =inject(FormBuilder)
private readonly router =inject(Router)
isloading = false;
apierror = '';
showpassword = false;
signupform:FormGroup=this.fb.group({
name:["",[ Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(
          /^(?!.* {2})[A-Za-z\u00C0-\u024F\u0600-\u06FF]+(?: [A-Za-z\u00C0-\u024F\u0600-\u06FF]+)*$/,
        )]],
email:["",[Validators.required,Validators.email]],
password:["",[Validators.required,Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]+$/,
        )]],
confirmpassword:["",[Validators.required]],
jobtitle:[""]
},{validators:[this.confrimpassword]});

confrimpassword(group:AbstractControl){
const password= group.get('password')?.value
const confirmpassword=group.get('confirmpassword')?.value
 if (confirmpassword && password !== confirmpassword) {
    return { mismatch: true };
  }
else{
  return null
}
}

signupsubmit(): void {
  if (this.signupform.invalid) {
    this.signupform.markAllAsTouched();
    return;
  }
  this.isloading = true;
  this.apierror = '';
  const formdata = this.signupform.value;

  const signupdata = {
    email: formdata.email,
    password: formdata.password,
    data: {
      name: formdata.name,
      job_title: formdata.jobtitle,
    },
  };

  console.log(signupdata);

  this.authService.signup(signupdata).subscribe({
    next: (res) => {
      console.log(res);
      this.isloading = false;

      this.router.navigate(['/login']);
    },

    error: (err) => {
      console.log(err);
      this.isloading = false;

      this.apierror = err.error?.message || 'Something went wrong. Please try again.';
    },
  });
}
}
