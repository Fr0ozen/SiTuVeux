import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {LoginService} from '../_services/login.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        if (state.url === '/login' && currentUser) {
            this.router.navigate(['/tournaments']);
            return false;
        } else if (state.url === '/login') {
            return true;
        }

        if ((state.url === '/createPlayer' || state.url === '/createTeam' || state.url === '/createArena' || state.url === '/createTournament' || state.url === '/manageMatch') && currentUser && currentUser.isorganizer) {
            return true;
        } else if ((state.url === '/createPlayer' || state.url === '/createTeam' || state.url === '/createArena' || state.url === '/createTournament') && currentUser && !currentUser.isorganizer) {
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
