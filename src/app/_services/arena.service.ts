import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Arena} from '../_models/Arena';

@Injectable({providedIn: 'root'})
export class ArenaService {
    constructor(private http: HttpClient) {
    }

    getAllArena(user: User) {
        return this.http.post<any>('http://localhost:3000/getAllArena', {user});
    }

    createArena(user: User, arena: Arena) {
        return this.http.post<any>('http://localhost:3000/createArena', {user, arena});
    }
}
