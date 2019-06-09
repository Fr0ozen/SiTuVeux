import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../_models/User';
import {Team} from '../_models/Team';
import {Arena} from '../_models/Arena';

@Injectable({ providedIn: 'root' })
export class CreateArenaService {
  constructor(private http: HttpClient) {}

  createArena(user: User, arena: Arena) {
    return this.http.post<any>('http://localhost:3000/createArena', {user, arena});
  }
}
