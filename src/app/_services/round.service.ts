import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class RoundService {
    constructor(private http: HttpClient) {
    }

    getMatchScore(user: User, idmatch: number) {
        return this.http.post<any>(environment.restIp + ':3000/getMatchScore', {user, idmatch});
    }
}
