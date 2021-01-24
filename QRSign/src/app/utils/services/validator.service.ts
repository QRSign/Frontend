import { AbstractControl, ValidatorFn } from '@angular/forms';

const customEmailPattern: RegExp = /^[0-9]$/;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return customEmailPattern.test(control.value)
      ? null
      : { customPassword: true };
  };
}
