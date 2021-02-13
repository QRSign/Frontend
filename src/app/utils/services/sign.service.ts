import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

export interface SignPayload {
  last_name: string;
  first_name: string;
  signature: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignService {
  constructor(private requestService: RequestService) {}

  public sign(signature: SignPayload): Observable<any> {
    return this.requestService.request('post', 'signature', signature);
  }
}
