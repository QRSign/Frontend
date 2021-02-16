import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private API: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  public request(
    method: 'post' | 'get' | 'delete',
    type, // Array
    element?
  ): Observable<any> {
    let base$;
    let params = type.map((param) => '/' + param).join('');
    switch (method) {
      case 'post':
        base$ = this.http.post(`${this.API}${params}`, element);
        break;
      case 'get':
        base$ = this.http.get(`${this.API}${params}`);
        break;
      case 'delete':
        base$ = this.http.delete(`${this.API}${params}`);
        break;
      default:
        return null;
    }

    const request = base$.pipe(map((data) => data));

    return request;
  }
}
