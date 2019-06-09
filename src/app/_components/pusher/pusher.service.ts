import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

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

  like( teamNumber, teamScore ) {
    if(teamNumber==0){
      this.http.post('http://localhost:3000/update', {'teamNumber': 0, 'teamScore': teamScore})
      .subscribe(data => {});
    }
    else{
      this.http.post('http://localhost:3000/update', {'teamNumber': 1, 'teamScore': teamScore})
      .subscribe(data => {});
    }
  }
}