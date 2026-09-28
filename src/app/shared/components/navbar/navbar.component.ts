import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
private readonly authService =inject(AuthService)
username:string=""
userjob:string=""
 initials:string=""
getuserinfodata():void{
  this.authService.getuserinfo().subscribe({
    next:(res)=>{
      console.log(res);
      this.username=res.user_metadata.name
      this.userjob=res.user_metadata.job_title
      this.getinitials()
    },
    error:(err)=>{
console.log(err);

    }
  })
}
  getinitials(): void {
    const name = this.username.trim();

    const names = name.split(' ');

    if (names.length > 1) {
      this.initials = names[0][0] + names[1][0];
    } else {
      this.initials = name.substring(0, 2);
    }

    this.initials = this.initials.toUpperCase();
  }
ngOnInit(): void {
    this.getuserinfodata()
}
}
