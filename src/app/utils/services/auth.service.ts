import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from './request.service';

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
  private API: string = 'http://127.0.0.1:5000';
  private logged: boolean = false;
  private profil;

  constructor(
    private http: HttpClient,
    private router: Router,
    private requestService: RequestService
  ) {}

  // private saveToken(token: string): void {
  //   localStorage.setItem('qrsign-token', token);
  //   this.token = token;
  // }

  // private getToken(): string {
  //   if (!this.token) {
  //     this.token = localStorage.getItem('qrsign-token');
  //   }
  //   return this.token;
  // }

  public getProfil() {
    return this.profil;
  }

  public setProfil(profil) {
    this.profil = profil;
  }

  public isLoggedIn(): boolean {
    // return this.profil ? this.profil.exp > Date.now() / 1000 : false;
    return this.profil ? true : false;
  }

  public register(profil: TokenPayload): Observable<any> {
    return this.requestService.request('post', 'register', profil);
  }

  public login(profil: TokenPayload): Observable<any> {
    return this.requestService.request('post', 'login', profil);
  }

  public logout(): void {
    // window.localStorage.removeItem('qrsign-token');
    this.router.navigateByUrl('/auth');
  }
}
