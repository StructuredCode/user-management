import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Config } from '../../../config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = Config.apiUrl;
  
  /** User data-subject. Flow of succesfully newly added users. */
  userAddedSubject = new Subject<User>();
  
  /** Stores all users loaded from API. */
  users = signal<User[]>([]);
  
  /**
   * Get all users from database.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  /**
   * Add user to database.
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/users', user)
  }
}
