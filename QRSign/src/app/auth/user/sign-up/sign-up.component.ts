import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';
import { passwordValidator } from 'src/app/utils/services/validator.service';

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
  mail = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, passwordValidator()]);
  // password_confimation = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      first_name: this.first_name,
      last_name: this.last_name,
      mail: this.mail,
      password: this.password,
    });
  }

  redirect(redirectUrl): void {
    this.router.navigateByUrl(redirectUrl);
  }

  onSubmit(): void {
    // const { first_name, last_name, mail, password } = this.loginForm.value;
    // this.authService.createAccount(first_name, last_name, mail, password);
    console.log("onSubmit");
  }
}
