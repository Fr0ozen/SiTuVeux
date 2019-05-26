import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../_services/login.service';
import { User } from '../../_models/User';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  currentUser: User;
  navbarCollapsed = true;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
