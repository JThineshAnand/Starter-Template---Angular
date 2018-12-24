import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  Authenticated: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.getIsAuthenticated();
    this.Authenticated = this.auth.getAuthenticatedListener().subscribe(
      (value: boolean) => {
        this.isAuthenticated = value;
      }
    );

  }
  logout() {
    this.auth.logout();
  }


}
