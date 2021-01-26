import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

const customEmailPattern: RegExp = /^.*@lacatholille.fr$/;

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return customEmailPattern.test(control.value)
      ? null
      : { value: control.value };
  };
}

export function samePassword(password: FormControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value === password.value ? null : { value: control.value };
  };
}
