import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';

@Injectable({providedIn: 'root'})
export class MatchService {
    constructor(private http: HttpClient) {
    }

    getAllMatchStartedForGrid() {
        return this.http.get<any>('http://localhost:3000/getAllMatchStartedForGrid');
    }

    getMatchById(idmatch: number) {
        return this.http.post<any>('http://localhost:3000/getMatchById', {idmatch});
    }

    getAllMatchRefereeForGrid(user: User) {
        return this.http.post<any>('http://localhost:3000/getAllMatchRefereeForGrid', {user});
    }

    startMatch(user: User, idmatch: number) {
        return this.http.post<any>('http://localhost:3000/startMatch', {user, idmatch});
    }
}
