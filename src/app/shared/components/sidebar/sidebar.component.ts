import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly authService =inject(AuthService)
  private readonly router =inject(Router)
  iscollapsed = false;
  isprojectopen = true;
  isprojectpopupopen = false;
  ismobilemenuopen = false;
  isloggingout = false;
  logouterror = '';
  logoutdata():void{
      if (this.isloggingout) {
    return;
  }

  this.isloggingout = true;
  this.logouterror = '';
    this.authService.logout().subscribe({
      next:(res)=>{
        console.log(res);
        this.authService.clearauthdata()
          this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.log(err);
           this.isloggingout = false;
      this.logouterror = 'Logout failed, please try again.';
      }
    })
  }
  togglesidebar(): void {
    if (this.iscollapsed) {
      this.iscollapsed = false;
    } else {
      this.iscollapsed = true;
    }

    this.isprojectpopupopen = false;
  }

  toggleproject(): void {
    if (this.isprojectopen) {
      this.isprojectopen = false;
    } else {
      this.isprojectopen = true;
    }
  }

  toggleprojectpopup(): void {
    if (this.isprojectpopupopen) {
      this.isprojectpopupopen = false;
    } else {
      this.isprojectpopupopen = true;
    }
  }

  togglemobilemenu(): void {
    if (this.ismobilemenuopen) {
      this.ismobilemenuopen = false;
    } else {
      this.ismobilemenuopen = true;
    }
  }

  closemobilemenu(): void {
    if (this.ismobilemenuopen) {
      this.ismobilemenuopen = false;
    }
  }

}