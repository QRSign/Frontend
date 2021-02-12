import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
// import { SignService } from 'src/app/utils/services/sign.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
})
export class EnterComponent implements OnInit {
  @ViewChild('sPad', { static: true }) signaturePadElement;
  signaturePad: any;

  signForm: FormGroup;

  nom = new FormControl('Mortelier', [Validators.required]);
  prenom = new FormControl('Antoine', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    // private signService: SignService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      nom: this.nom,
      prenom: this.prenom,
    });
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
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
      // this.onSubmit();
    }
  }

  // onSubmit(): void {
  //   this.signService.sign(this.signForm.value).subscribe(
  //     (res) => {
  //       this.router.navigateByUrl('/');
  //     },
  //     (err) => {
  //       console.error(err);
  //     }
  //   );
  // }

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
      // Download l'image
      // a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    this.signForm.value.signature = parts[1];
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
