/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../_models/User';

@Injectable({ providedIn: 'root' })
export class CreateTeamService {
  constructor(private http: HttpClient) {}

  getAllPlayer(user: User) {
    return this.http.post<any>('http://localhost:3000/getAllPlayer', {user});
  }

  createTeam(user: User, name: string, origin: string) {
    return this.http.post<any>('http://localhost:3000/createTeam', {user, 'data': {name, origin}});
  }
}
