import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';

@Injectable({providedIn: 'root'})
export class MatchService {
    constructor(private http: HttpClient) {
    }

    getLiveMatches(user: User) {
        return this.http.post<any>('http://localhost:3000/getLiveMatches', {user});
    }

    getAllMatchStartedForGrid() {
        return this.http.get<any>('http://localhost:3000/getAllMatchStartedForGrid');
    }
}
