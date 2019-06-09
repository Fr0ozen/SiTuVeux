import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../_models/User';
import {Tournament} from '../_models/Tournament';

@Injectable({ providedIn: 'root' })
export class CreateTournamentService {
  constructor(private http: HttpClient) {}

  getAllArena(user: User) {
    return this.http.post<any>('http://localhost:3000/getAllArena', {user});
  }

  createTournament(user: User, tournament: Tournament) {
    return this.http.post<any>('http://localhost:3000/createTournament', {user, tournament});
  }
}
