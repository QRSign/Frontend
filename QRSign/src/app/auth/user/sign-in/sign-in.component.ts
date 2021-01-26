import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, TokenPayload } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  // visibility of password
  hide: boolean = true;

  loginForm: FormGroup;

  mail = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  credentials: TokenPayload = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: this.mail,
      password: this.password,
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.credentials = this.loginForm.value;
    this.authService.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
