import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import decode from 'jwt-decode';
import * as moment from 'moment';

// export interface JWT {
//   bearer_token: string;
//   exp: number;
//   subject: string;
//   firstName: string;
//   lastName: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentTokenSubject = new BehaviorSubject<string>(
    JSON.parse(localStorage.getItem('id_token'))
  );

  errorMessage: string;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {}

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  getToken() {
    return this.currentTokenSubject.asObservable();
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<any>('authenticate', { email, password })
      .pipe(
        map(res => {
          this.setSession(res);
          this.currentTokenSubject.next(res);
          // return res;
        }),
        catchError(err => {
          this.errorMessage = err.error.message;
          return of(null);
        })
      );
  }

  private setSession(authResult: string) {
    const payload = decode(authResult);
    console.log(payload);

    // This clones the Date object
    // const expiresAt = moment(payload.exp);

    localStorage.setItem('id_token', JSON.stringify(authResult));
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('expires_at', JSON.stringify(payload.exp));
    localStorage.setItem('name', JSON.stringify(payload.name));
    localStorage.setItem('company', JSON.stringify(payload.company));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    localStorage.removeItem('company');

    this.currentTokenSubject.next(null);
    this.router.navigateByUrl('login');
  }

  public isLoggedIn(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return moment().isBefore(moment(expiresAt));
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
