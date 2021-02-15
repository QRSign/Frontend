import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['Noms', 'Prénoms'];
  dataSource = ELEMENT_DATA;
  public qrLink: string =
    'https://material.io/resources/icons/?search=class&style=baseline';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    alert('Hello');
    // setInterval(this.onChange, 3000);
  }
}
