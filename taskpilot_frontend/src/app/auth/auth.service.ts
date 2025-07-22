import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
/**
 * AuthService
 * Handles authentication actions: login and register.
 * Communicates with backend API.
 */
export class AuthService {
  private API_BASE = '/auth';

  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  /**
   * Authenticates a user and retrieves JWT token.
   * @param username User's username
   * @param password User's password
   */
  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(`${this.API_BASE}/login`, body.toString(), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUBLIC_INTERFACE
  /**
   * Registers a new user.
   * @param username New user's username
   * @param email New user's email address
   * @param password New user's password
   */
  register(username: string, email: string, password: string): Observable<any> {
    const payload = { username, email, password };
    return this.http.post(`${this.API_BASE}/register`, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handles HTTP errors.
   */
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error || 'Server error');
  }
}
