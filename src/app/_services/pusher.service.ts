import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Round} from '../_models/Round';
import {environment} from '../../environments/environment';
import {User} from '../_models/User';

declare const Pusher: any;

@Injectable({
    providedIn: 'root'
})
export class PusherService {
    pusher: any;
    channel: any;

    constructor(private http: HttpClient) {
        this.pusher = new Pusher(environment.pusher.key, {
            cluster: environment.pusher.cluster,
            encrypted: true
        });
        this.channel = this.pusher.subscribe('events-channel');
    }

    like(user: User, teamNumber, teamScore, rounds: Round[], idwinningteam) {
        this.http.post('http://localhost:3000/update', {user, teamNumber, rounds, teamScore, idwinningteam}).subscribe();
    }
}
