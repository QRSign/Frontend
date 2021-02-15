import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

export interface CreationCoursPayload {
  title: string;
  user: number;
  start_time: string;
  end_time: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  constructor(private requestService: RequestService) {}

  public create(course: CreationCoursPayload): Observable<any> {
    return this.requestService.request('post', 'qrcode', course);
  }
}
