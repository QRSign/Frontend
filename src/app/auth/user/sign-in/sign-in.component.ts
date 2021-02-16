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

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  // visibility of password
  hide: boolean = true;

  loginForm: FormGroup;

  mail = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  credentials: TokenPayload = {
    mail: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: this.mail,
      password: this.password,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getErrorMessage(type: string = 'default'): string {
    return this.messageService.getErrorMessage(type);
  }

  onSubmit(): void {
    this.credentials = this.loginForm.value;
    this.subscriptions.push(
      this.authService.login(this.credentials).subscribe(
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
