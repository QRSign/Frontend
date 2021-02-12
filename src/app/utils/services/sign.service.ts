// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Profil } from '../models/profil';

// interface TokenResponse {
//   token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class SignService {
//   private token: string;
//   private API: string = 'http://127.0.0.1:5000';

//   constructor(private http: HttpClient, private router: Router) {}

//   private saveToken(token: string): void {
//     localStorage.setItem('qrsign-token', token);
//     this.token = token;
//   }

//   private getToken(): string {
//     if (!this.token) {
//       this.token = localStorage.getItem('qrsign-token');
//     }
//     return this.token;
//   }

//   private request(
//     method: 'post',
//     type: 'signature',
//     signature?
//   ): Observable<any> {
//     let base$;
//     base$ = this.http.post(`${this.API}/${type}`, signature);

//     const request = base$.pipe(
//       map((data: TokenResponse) => {
//         if (data.token) {
//           this.saveToken(data.token);
//         }
//         return data;
//       })
//     );

//     return request;
//   }

//   public sign(signature): Observable<any> {
//     return this.request('post', 'signature', signature);
//   }
// }
