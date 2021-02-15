import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RequestService } from 'src/app/utils/services/request.service';

export interface PeriodicElement {
  last_name: string;
  first_name: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { last_name: 'Dutoit', first_name: 'Antoine' },
  { last_name: 'Fontaine', first_name: 'Nicolas' },
  { last_name: 'Pascqualini', first_name: 'Lamya' },
];

@Component({
  selector: 'app-show-qrcode',
  templateUrl: './show-qrcode.component.html',
  styleUrls: ['./show-qrcode.component.scss'],
})
export class ShowQrcodeComponent implements OnInit {
  subscriptions: Subscription[] = [];

  unfoundRoute: boolean = false;
  displayedColumns: string[] = ['Noms', 'Prénoms'];
  dataSource = ELEMENT_DATA;
  public qrLink: string =
    'https://material.io/resources/icons/?search=class&style=baseline';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.checkValidRoute();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  checkValidRoute(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe((param) => {
        const token = param.get('token');
        this.getToken(token).subscribe(
          (res) => {
            this.unfoundRoute = true;
          },
          (err) => {
            this.router.navigateByUrl('/');
            console.error(err);
          }
        );
      })
    );
  }

  getToken(token: string): Observable<any> {
    return this.requestService.request('get', ['qrcode', 'token', token]);
  }
}
