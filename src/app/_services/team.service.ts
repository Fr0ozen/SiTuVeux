import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Team} from '../_models/Team';

@Injectable({providedIn: 'root'})
export class TeamService {
    constructor(private http: HttpClient) {
    }

    getAllTeam(user: User) {
        return this.http.post<any>('http://localhost:3000/getAllTeam', {user});
    }

    createTeam(user: User, team: Team) {
        return this.http.post<any>('http://localhost:3000/createTeam', {user, team});
    }
}
