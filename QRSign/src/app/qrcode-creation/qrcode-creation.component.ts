import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode-creation',
  templateUrl: './qrcode-creation.component.html',
  styleUrls: ['./qrcode-creation.component.scss'],
  template: `<input type="datetime-local" [value]="date" 
          (change)="date=$event.target.value" /> {{date}}` 
})
export class QrcodeCreationComponent implements OnInit {
  date: string;
  constructor() {
    this.date = new Date().toISOString().slice(0, 16);
   }

  ngOnInit(): void {
  }

}
