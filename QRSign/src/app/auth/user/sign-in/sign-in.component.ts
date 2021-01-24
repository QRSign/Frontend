import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  hide: boolean = true;

  loginForm: FormGroup;
  mail = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: this.mail,
      password: this.password,
    });
  }

  redirect(redirectUrl): void {
    this.router.navigateByUrl(redirectUrl);
  }

  onSubmit(): void {
    // const { mail, password } = this.loginForm.value;
    // this.authService.login(mail, password);
    console.log("onSubmit");
  }
}
