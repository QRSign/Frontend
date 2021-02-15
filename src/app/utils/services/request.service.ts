import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private API: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private router: Router) {}

  public request(method: 'post' | 'get', type, element?): Observable<any> {
    let base$;

    if (method === 'post') {
      base$ = this.http.post(`${this.API}/${type}`, element);
    }
    // else {
    //   base$ = this.http.get(`${this.API}/${type}`, {
    //     headers: { Authorization: `Bearer ${this.getToken()}` },
    //   });
    // }

    const request = base$.pipe(map((data) => data));

    return request;
  }
}
