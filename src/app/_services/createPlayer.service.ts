import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../_models/User';
import {Player} from '../_models/Player';

@Injectable({ providedIn: 'root' })
export class CreatePlayerService {
  constructor(private http: HttpClient) {}

  createPlayer(user: User, player: Player) {
    return this.http.post<any>('http://localhost:3000/createPlayer', {user, player});
  }
}
