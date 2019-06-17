import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getAllUser(user: User) {
        return this.http.post<any>(environment.restIp + ':3000/getAllUser', {user});
    }

    isReferee(user: User, idmatch: number) {
        return this.http.post<any>(environment.restIp + ':3000/isReferee', {user, idmatch});
    }
}
