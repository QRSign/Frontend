import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '/';

  constructor(private router: Router, private store: Store) {}

  //   login(username: string, password: string): Observable<string> {
  login(username: string, password: string): void {
    let obj = { username, password };
    // return this.httpService.apiRequest('post', 'integration/admin/token', obj).pipe(
    //   // Une fois récupéré l'accessToken, on va chercher le refreshToken
    //   switchMap(
    //     accessToken => this.httpService.apiRequest(
    //       'get',
    //       'user/refreshToken',
    //       {},
    //       { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken }) }
    //     ).pipe(
    //       tap(refreshToken => {
    //         // On récupère ici le success de l'observable pour mettre à jour les données lié à l'authentification
    //         // La gestion de la redirection ou de l'affichage de message d'erreur ne se fait pas ici
    //         this.isLoggedIn = true;
    //         this.setTokens({ accessToken, refreshToken })
    //       }),
    //       map(() => {
    //         // On retourne l'url de redirection au lieu de l'access token
    //         return this.redirectUrl;
    //       })
    //     )
    //   ),
    // )
    this.isLoggedIn = true;
    this.router.navigate([this.redirectUrl]);
  }

  createAccount(
    first_name: string,
    last_name: string,
    mail: string,
    password: string
  ) {
    let obj = { first_name, last_name, mail, password };
    this.isLoggedIn = true;
    this.router.navigate([this.redirectUrl]);
  }

  logout(force = false): void {
    this.isLoggedIn = false;
    // Suppression du local store
    // this.storage.remove(STORAGE_KEY)
    // this.storage.remove("qrsign_app_profil")

    if (force) {
      window.location.href = '/auth';
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
