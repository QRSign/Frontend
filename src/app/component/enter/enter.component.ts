import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { MessageService } from 'src/app/utils/services/message.service';
import { SignPayload, SignService } from 'src/app/utils/services/sign.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
})
export class EnterComponent implements OnInit {
  @ViewChild('error', { static: true }) errorElement;
  @ViewChild('sPad', { static: true }) signaturePadElement;
  signaturePad: any;
  submitButton: string = 'Soumettre';
  title: string = 'Signature';
  hasSigned: boolean = false;

  signForm: FormGroup;

  last_name = new FormControl('', [Validators.required]);
  first_name = new FormControl('', [Validators.required]);

  formInfos: SignPayload = {
    last_name: '',
    first_name: '',
    signature: '',
    token: '',
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private signService: SignService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      last_name: this.last_name,
      first_name: this.first_name,
    });
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
    );
  }

  getErrorMessage(type: string = 'default'): string {
    return this.messageService.getErrorMessage(type);
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

  addSignature(dataURL) {
    const parts = dataURL.split(';base64,');
    this.signForm.value.signature = parts[1];
  }

  toggleError() {
    const error = this.errorElement.nativeElement;
    const parent = error.closest('.custom-button');
    error.style.opacity = 0;
    const vm = this;
    setTimeout(function () {
      vm.submitButton = 'Signature manquante';
      error.style.opacity = 1;
      parent.style.backgroundColor = '#ec6c77';
    }, 300);
    setTimeout(function () {
      error.style.opacity = 0;
      parent.style.backgroundColor = '#3f51b5';
    }, 2000);
    setTimeout(function () {
      vm.submitButton = 'Soumettre';
      error.style.opacity = 1;
    }, 2300);
  }

  getToken(): void {
    this.route.paramMap.subscribe((param) => {
      const token = param.get('token');
      this.formInfos.token = token;
    });
  }

  onSubmit(): void {
    if (this.signaturePad.isEmpty()) {
      this.toggleError();
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.addSignature(dataURL);
      this.formInfos = this.signForm.value;
      this.getToken();
      this.signService.sign(this.formInfos).subscribe(
        (res) => {
          this.hasSigned = true;
        },
        (err) => {
          this.messageService.openSnackBar('Un problème est survenu.', 'error');
        }
      );
    }
  }
}
