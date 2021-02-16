import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/utils/services/auth.service';
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
  course;
  prof;

  unfoundRoute: boolean = false;
  displayedColumns: string[] = ['Noms', 'Prénoms'];
  public qrLink: string = 'http://localhost:4200/enter/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkValidRoute();
    this.onChange();
    this.prof = this.authService.getProfil();
  }

  onChange(): void {
    const vm = this;
    setInterval(() => vm.getStudents(), 5000);
  }

  getStudents(): void {
    this.hasStudents(this.token).subscribe(
      (res) => {
        this.students = res;
      },
      (err) => console.error(err)
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
          this.qrLink += token;
          this.course = res;
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
