import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getAllUser(user: User) {
        return this.http.post<any>('http://localhost:3000/getAllUser', {user});
    }

    isReferee(user: User, idmatch: number) {
        return this.http.post<any>('http://localhost:3000/isReferee', {user, idmatch});
    }
}
