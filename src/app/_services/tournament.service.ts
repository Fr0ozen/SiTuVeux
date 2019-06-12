﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Tournament} from '../_models/Tournament';
import {Team} from '../_models/Team';

@Injectable({providedIn: 'root'})
export class TournamentService {
    constructor(private http: HttpClient) {
    }

    createTournament(user: User, tournament: Tournament, teamList: Array<Team>) {
        return this.http.post<any>('http://localhost:3000/createTournament', {user, tournament, teamList});
    }
}