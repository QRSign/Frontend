import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const _defaultErrorMessages = {
  password: () =>
    `Le mot de passe doit contenir au moins une lettre et un chiffre`,
  mail: () => `Le mail est invalide`,
  default: () => `Ce champ contient au moins une erreur`,
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  getErrorMessage(control: AbstractControl, errorMessages?: any): string {
    errorMessages = { ..._defaultErrorMessages, ...errorMessages };
    let erreur = errorMessages.default();

    for (const type in errorMessages) {
      if (type !== 'default' && control.hasError(type)) {
        erreur = errorMessages[type](control.getError(type));
        break;
      }
    }
    return erreur;
  }
}
