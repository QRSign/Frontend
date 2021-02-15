import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  surname: string;
  name: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { surname: 'Dutoit', name: 'Antoine' },
  { surname: 'Fontaine', name: 'Nicolas' },
  { surname: 'Pascqualini', name: 'Lamya' },
];

@Component({
  selector: 'app-show-qrcode',
  templateUrl: './show-qrcode.component.html',
  styleUrls: ['./show-qrcode.component.scss'],
})
export class ShowQrcodeComponent implements OnInit {
  displayedColumns: string[] = ['Noms', 'Prénoms'];
  dataSource = ELEMENT_DATA;
  public myAngularxQrCode: string = null;

  constructor() {
    this.myAngularxQrCode =
      'https://material.io/resources/icons/?search=class&style=baseline';
  }

  ngOnInit(): void {}
}
