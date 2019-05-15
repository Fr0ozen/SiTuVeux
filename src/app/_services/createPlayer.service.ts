/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../_models/User';

@Injectable({ providedIn: 'root' })
export class CreatePlayerService {
  constructor(private http: HttpClient) {}

  createPlayer(user: User, fname: string, lname: string, pseudo: string, level: number, origin: string, sex: number) {
    return this.http.post<any>('http://localhost:3000/createPlayer', {'user': user, 'data': {fname, lname, pseudo, level, origin, sex}}).pipe();
  }
}
