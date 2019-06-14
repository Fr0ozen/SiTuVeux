import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../_models/User';

@Injectable({providedIn: 'root'})
export class LoginService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/createToken', {username, password})
            .pipe(map(data => {
                const user: User = new User();

                if (data && data.user && data.token) {
                    user.id = data.user.id;
                    user.username = data.user.username;
                    user.lname = data.user.lname;
                    user.fname = data.user.fname;
                    user.nationality = data.user.nationality;
                    user.age = data.user.age;
                    user.isorganizer = data.user.isorganizer;
                    user.token = data.token;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
