import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../_models/User';
import {Team} from '../_models/Team';

@Injectable({ providedIn: 'root' })
export class CreateTeamService {
  constructor(private http: HttpClient) {}

  getAllPlayer(user: User) {
    return this.http.post<any>('http://localhost:3000/getAllPlayer', {user});
  }

  createTeam(user: User, team: Team) {
    return this.http.post<any>('http://localhost:3000/createTeam', {user, team});
  }
}
