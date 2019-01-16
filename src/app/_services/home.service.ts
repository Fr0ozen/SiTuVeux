﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class HomeService {
    constructor(private http: HttpClient) {}

    test() {
      return this.http.get('http://localhost:3000/users');
    }
}