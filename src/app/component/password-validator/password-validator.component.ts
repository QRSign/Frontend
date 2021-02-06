import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.scss'],
})
export class PasswordValidatorComponent implements OnInit {
  numberCharRegex = new RegExp('.{8,}');
  letterNumberRegex = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9]).+');
  specialCharRegex = new RegExp('(?=.*[!@#$%&]).+');

  constructor() {}

  ngOnInit(): void {}
}
