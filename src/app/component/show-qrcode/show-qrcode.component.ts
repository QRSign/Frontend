import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/utils/services/auth.service';
import { MessageService } from 'src/app/utils/services/message.service';
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

  unfoundRoute: boolean = false;
  displayedColumns: string[] = ['Noms', 'Prénoms'];
  public qrLink: string = 'http://localhost:4200/enter/';

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.checkValidRoute();
    this.onChange();
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
      (err) => {
        this.messageService.openSnackBar('Un problème est survenu.', 'error');
      }
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
        }
      );
    });
  }

  getToken(token: string): Observable<any> {
    return this.requestService.request('get', ['qrcode', 'token', token]);
  }
}
