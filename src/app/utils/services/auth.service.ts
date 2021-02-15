import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

// interface TokenResponse {
//   token: string;
// }

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
  private profil;

  constructor(private router: Router, private requestService: RequestService) {}

  mytest;

  public getProfil() {
    return this.profil;
  }

  public getCourses(thisClass, callBack) {
    this.hasCourses(this.profil.id).subscribe(
      (res) => {
        const result = res.filter((course) => course.user == this.profil.id);
        const call = callBack.bind(thisClass);
        call(result);
      },
      (err) => {
        console.error(err);
      }
    );
    return null;
  }

  public hasCourses(id): Observable<any> {
    return this.requestService.request('get', ['qrcodes']);
  }

  public setProfil(profil) {
    this.profil = profil;
  }

  public isLoggedIn(): boolean {
    return this.profil ? true : false;
  }

  public register(profil: TokenPayload): Observable<any> {
    return this.requestService.request('post', ['register'], profil);
  }

  public login(profil: TokenPayload): Observable<any> {
    return this.requestService.request('post', ['login'], profil);
  }

  public logout(): void {
    this.setProfil(undefined);
    this.router.navigateByUrl('/auth');
  }
}
