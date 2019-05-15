import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../_services/login.service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser && currentUser.token) {
          const headers = new HttpHeaders({
            'x-access-token': currentUser.token
          });

          request = request.clone({headers});
        }

        return next.handle(request);
    }
}
