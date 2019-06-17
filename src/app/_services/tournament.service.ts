import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Tournament} from '../_models/Tournament';
import {Team} from '../_models/Team';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TournamentService {
    constructor(private http: HttpClient) {
    }

    createTournament(user: User, tournament: Tournament, matchList: Array<any>) {
        return this.http.post<any>(environment.restIp + ':3000/createTournament', {user, tournament, matchList});
    }

    getBracketByTournament(id: number) {
        return this.http.post<any>(environment.restIp + ':3000/getBracketByTournamentId', {id});
    }

    getAllTournamentForGrid() {
        return this.http.get<any>(environment.restIp + ':3000/getAllTournamentForGrid');
    }
}
