import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    token: string = null;
    isAuthenticated = false;
    errorMessage: string;

    authenticationSubject = new Subject<boolean>();
    errorMessageSubject = new Subject<string>();

    constructor(private http: HttpClient, private router: Router) {

    }


    getAuthenticatedListener() {
        return this.authenticationSubject;
    }

    getErrorMessageListener() {
        return this.errorMessageSubject;
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    getToken() {
        return this.token;
    }

    login(email: string, password: string) {
        this.http.post<any>('http://localhost:3000/api/user/login', { email, password }).subscribe(
            (response) => {
                if (response.token) {
                    this.token = response.token;
                    this.isAuthenticated = true;
                    this.authenticationSubject.next(this.isAuthenticated);
                    this.router.navigate(['/']);
                }
            }, (error) => {
                this.errorMessage = error.error.message;
                this.errorMessageSubject.next(this.errorMessage);
            }
        );

    }

    signup(name: string, email: string, password: string) {
        this.http.post<any>('http://localhost:3000/api/user/signup', { name, email, password }).subscribe(
            (response) => {
                if (response.token) {
                    this.token = response.token;
                    this.isAuthenticated = true;
                    this.authenticationSubject.next(this.isAuthenticated);
                    this.router.navigate(['/']);
                }
            }, (error) => {
                this.errorMessage = error.error.message;
                this.errorMessageSubject.next(this.errorMessage);
            }
        );
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authenticationSubject.next(this.isAuthenticated);
        this.router.navigate(['/login']);
    }
}
