import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { RequestService } from './request.service';

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

  constructor(
    private router: Router,
    private requestService: RequestService,
    private messageService: MessageService
  ) {}

  public getProfil() {
    return this.profil;
  }

  public getCourses(thisClass, callBack) {
    this.hasCourses(this.profil.id).subscribe(
      (res) => {
        const result = res.filter((course) => course.user.id == this.profil.id);
        const call = callBack.bind(thisClass);
        call(result);
      },
      (err) => {
        this.messageService.openSnackBar('Un problème est survenu.', 'error');
      }
    );
    return null;
  }

  public deleteCourse(thisClass, callBack, id) {
    this.deleteOneCourse(id).subscribe(
      (res) => {
        const call = callBack.bind(thisClass);
        call(id);
        this.messageService.openSnackBar(
          'Cours supprimé avec succés.',
          'error'
        );
      },
      (err) => {
        this.messageService.openSnackBar(err.error.message, 'error');
      }
    );
  }

  public deleteOneCourse(id): Observable<any> {
    return this.requestService.request('delete', ['qrcode', id]);
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
