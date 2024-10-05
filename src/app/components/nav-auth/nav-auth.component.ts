import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css'
})
export class NavAuthComponent {
  public _AuthenticationService=inject(AuthenticationService);


}
