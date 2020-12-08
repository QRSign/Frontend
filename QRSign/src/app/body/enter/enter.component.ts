import { Component, OnInit, ViewChild } from '@angular/core';
// import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
})
export class EnterComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas;

  // signaturePad;

  constructor() {}

  ngOnInit(): void {
    // this.signaturePad = new SignaturePad(document.querySelector('#aa'));
    // this.signaturePad = new SignaturePad(this.canvas.nativeElement);
    // console.log('this.signaturePad:', this.signaturePad);
  }
}
