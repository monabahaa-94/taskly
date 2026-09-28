import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';


@Component({
  selector: 'app-authenticatedlayout',
  imports: [RouterOutlet,NavbarComponent,SidebarComponent],
  templateUrl: './authenticatedlayout.component.html',
  styleUrl: './authenticatedlayout.component.css',
})
export class AuthenticatedlayoutComponent {

}
