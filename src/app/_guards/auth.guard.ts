import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../_services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        if (state.url === '/login' && currentUser) {
            this.router.navigate(['/home']);
            return false;
        } else if (state.url === '/login') {
            return true;
        }

<<<<<<< HEAD
        if ((state.url === '/createPlayer' || state.url === '/createTeam') && currentUser && currentUser.isorganizer) {
          return true;
        } else if ((state.url === '/createPlayer' || state.url === '/createTeam') && currentUser && !currentUser.isorganizer) {
=======
        if ((state.url === '/createPlayer' || state.url === '/createTeam' || state.url === '/createArena') && currentUser && currentUser.isorganizer) {
          return true;
        } else if ((state.url === '/createPlayer' || state.url === '/createTeam' || state.url === '/createArena') && currentUser && !currentUser.isorganizer) {
>>>>>>> ae07bf8a53530068c4628c063e1d572432abf496
          this.router.navigate(['/login']);
          return false;
        }

        if (currentUser) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
