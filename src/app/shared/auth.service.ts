import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly http = inject(HttpClient);

  /**
   * Requests an authorization token using the provided user credentials.
   *
   * @param userId - The user ID or client ID for authentication.
   * @param userSecret - The user secret or client secret for authentication.
   * @returns An Observable that, when subscribed to, will send a POST request to retrieve the token.
   */
  private requestToken(userId: string, userSecret: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referrer-Policy': 'no-referrer'
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', userId)
      .set('client_secret', userSecret)
      .set('scope', 'api');

    return this.http.post(Config.tokenUrl, body.toString(), { headers });
  }

  /**
   * Request token from the authorization endpoint and save it to local storage only if it's valid.
   * @param userId - The user ID or client ID for authentication.
   * @param userSecret - The user secret or client secret for authentication.
   */
  handleTokenRequest(userId: string, userSecret: string) {
    this.requestToken(userId, userSecret).subscribe({
      next: data => {
        // Token is valid only if it includes required data.
        if (data.access_token && data.expires_in)
          // Store the access token for a live time of local storage (infinite).
          this.storeTokens(data.access_token, data.expires_in)
      }
    })
  }

  /**
   * Stores the given authentication token in the local storage.
   *
   * @param token - The authentication token to be stored.
   * @param expiresIn - The time in seconds till token expires.
   */
  storeTokens(token: string, expiresIn: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiresIn', expiresIn);
  }

  /**
   * Retrive auth token from local storage.
   */
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
