import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';

@Injectable({providedIn: 'root'})
export class RoundService {
    constructor(private http: HttpClient) {
    }

    getAllRoundsMatch(user: User, idmatch: number) {
        return this.http.post<any>('http://localhost:3000/getAllRoundsMatch', {user, idmatch});
    }
}
