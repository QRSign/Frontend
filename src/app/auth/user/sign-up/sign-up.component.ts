import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, TokenPayload } from 'src/app/utils/services/auth.service';
import { MessageService } from 'src/app/utils/services/message.service';
import {
  emailValidator,
  samePassword,
  passwordValidator,
} from 'src/app/utils/services/validator.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  hide: boolean = true;

  loginForm: FormGroup;
  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  mail = new FormControl('', [Validators.required, emailValidator()]);
  password = new FormControl('', [Validators.required, passwordValidator()]);
  password_confirmation = new FormControl('', [
    Validators.required,
    samePassword(this.password),
  ]);

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
      password_confirmation: this.password_confirmation,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getErrorMessage(type: string = 'default'): string {
    return this.messageService.getErrorMessage(type);
  }

  redirect(redirectUrl): void {
    this.router.navigateByUrl(redirectUrl);
  }

  onSubmit(): void {
    this.credentials = this.loginForm.value;
    this.subscriptions.push(
      this.authService.register(this.credentials).subscribe(
        (res) => {
          this.authService.setProfil(res);
          this.router.navigateByUrl('/');
        },
        (err) => {
          this.messageService.openSnackBar(err.error.message, 'error');
        }
      )
    );
  }
}
