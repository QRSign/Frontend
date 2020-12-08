import { Component, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
})
export class EnterComponent implements OnInit {
  @ViewChild('sPad', { static: true }) signaturePadElement;
  signaturePad: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement.childNodes[0]
    );
  }

  clearPad() {
    this.signaturePad.clear();
  }

  undoPad() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop();
      this.signaturePad.fromData(data);
    }
  }

  savePNG() {
    if (this.signaturePad.isEmpty()) {
      console.log('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.download(dataURL, 'signature.png');
    }
  }

  download(dataURL, filename) {
    if (
      navigator.userAgent.indexOf('Safari') > -1 &&
      navigator.userAgent.indexOf('Chrome') === -1
    ) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}
