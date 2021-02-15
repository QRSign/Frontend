import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

const customEmailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const customPasswordPattern: RegExp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return customEmailPattern.test(control.value)
      ? null
      : { value: control.value };
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return customPasswordPattern.test(control.value)
      ? null
      : { value: control.value };
  };
}

export function samePassword(password: FormControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value === password.value ? null : { value: control.value };
  };
}
