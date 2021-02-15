import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RequestService } from 'src/app/utils/services/request.service';

export interface PeriodicElement {
  last_name: string;
  first_name: string;
}

@Component({
  selector: 'app-show-qrcode',
  templateUrl: './show-qrcode.component.html',
  styleUrls: ['./show-qrcode.component.scss'],
})
export class ShowQrcodeComponent implements OnInit {
  token;
  students;

  unfoundRoute: boolean = false;
  displayedColumns: string[] = ['Noms', 'Prénoms'];
  public qrLink: string =
    'https://material.io/resources/icons/?search=class&style=baseline';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.checkValidRoute();
    this.onChange();
  }

  onChange(): void {
    const vm = this;
    setInterval(() => vm.getStudents(), 1000);
  }

  getStudents(): void {
    this.hasStudents(this.token).subscribe(
      (res) => {
        this.students = res;
      },
      (err) => console.log(err)
    );
  }

  hasStudents(token: string): Observable<any> {
    return this.requestService.request('get', ['signature', 'qrcode', token]);
  }

  checkValidRoute(): void {
    this.route.paramMap.subscribe((param) => {
      const token = param.get('token');
      this.getToken(token).subscribe(
        (res) => {
          this.token = token;
        },
        (err) => {
          this.unfoundRoute = true;
          console.error(err);
        }
      );
    });
  }

  getToken(token: string): Observable<any> {
    return this.requestService.request('get', ['qrcode', 'token', token]);
  }
}
