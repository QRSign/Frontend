import { Injectable } from '@angular/core';
import { Profil } from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public logIn(profil: Profil) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logOut() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
