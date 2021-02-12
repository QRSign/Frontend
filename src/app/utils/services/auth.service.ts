import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profil } from '../models/profil';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  mail: string;
  password: string;
  first_name?: string;
  last_name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private API: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('qrsign-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('qrsign-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('qrsign-token');
    this.router.navigateByUrl('/auth');
  }

  public getProfil(): Profil {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const profil = this.getProfil();
    // return profil ? profil.exp > Date.now() / 1000 : false;
    return true;
  }

  private request(
    method: 'post' | 'get',
    type: 'login' | 'register' | 'profile',
    profil?: TokenPayload
  ): Observable<any> {
    let base$;

    if (method === 'post') {
      base$ = this.http.post(`${this.API}/${type}`, profil);
    } else {
      base$ = this.http.get(`${this.API}/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }

    const request = base$.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(profil: TokenPayload): Observable<any> {
    return this.request('post', 'register', profil);
  }

  public login(profil: TokenPayload): Observable<any> {
    return this.request('post', 'login', profil);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }
}
