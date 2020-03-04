import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  errorMessage: string;

  constructor(private http: HttpClient) {}

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>('users', user);
  }
}
