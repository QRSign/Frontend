import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, TokenPayload } from 'src/app/utils/services/auth.service';
import { MessageService } from 'src/app/utils/services/message.service';
import {
  emailValidator,
  samePassword,
} from 'src/app/utils/services/validator.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  hide: boolean = true;

  loginForm: FormGroup;
  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  mail = new FormControl('', [Validators.required, emailValidator()]);
  password = new FormControl('', [Validators.required]);
  // password_confirmation = new FormControl('', [
  //   Validators.required,
  //   samePassword(this.password),
  // ]);

  credentials: TokenPayload = {
    first_name: '',
    last_name: '',
    mail: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      first_name: this.first_name,
      last_name: this.last_name,
      mail: this.mail,
      password: this.password,
      // password_confirmation: this.password_confirmation,
    });
  }

  getErrorMessage(type: string = 'default'): string {
    return this.messageService.getErrorMessage(type);
  }

  redirect(redirectUrl): void {
    this.router.navigateByUrl(redirectUrl);
  }

  onSubmit(): void {
    this.credentials = this.loginForm.value;
    this.authService.register(this.credentials).subscribe(
      (res) => {
        this.authService.setProfil(res);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
