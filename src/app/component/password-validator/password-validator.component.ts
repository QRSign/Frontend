import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.scss'],
})
export class PasswordValidatorComponent implements OnInit {
  numberCharRegex = new RegExp('.{8,}');
  letterNumberRegex = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9]).+');

  private _onChange: string;
  @Input() set onChange(value: string) {
    this._onChange = value;
  }

  constructor() {}

  ngOnInit(): void {}

  checkNbreChar(): boolean {
    return this.numberCharRegex.test(this._onChange);
  }

  checkWantedChar(): boolean {
    return this.letterNumberRegex.test(this._onChange);
  }
}
