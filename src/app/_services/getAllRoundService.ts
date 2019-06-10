import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Round } from '../_models/Round';

@Injectable({ providedIn: 'root' })
export class GetAllRoundService {
  constructor(private http: HttpClient) {}

  getAllRoundsMatch(idmatch: number){
    return this.http.post<any>('http://localhost:3000/getAllRoundsMatch', {idmatch});
  }
}
