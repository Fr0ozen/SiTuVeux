import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Player} from '../_models/Player';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PlayerService {
    constructor(private http: HttpClient) {
    }

    getAllPlayer(user: User) {
        return this.http.post<any>(environment.restIp + ':3000/getAllPlayer', {user});
    }

    createPlayer(user: User, player: Player) {
        return this.http.post<any>(environment.restIp + ':3000/createPlayer', {user, player});
    }
}
