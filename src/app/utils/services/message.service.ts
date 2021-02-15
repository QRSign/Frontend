import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const _defaultErrorMessages = {
  required: () => `Ce champ est obligatoire`,
  mail: () => `Ce format d'email n'est pas valide`,
  password: () =>
    `Le mot de passe doit contenir au moins 8 caractères, 1 lettre et 1 chiffre`,
  password_confirmation: () => `Les mots de passe ne sont pas identiques`,
  default: () => `Ce champ n'est pas valide`,
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  getErrorMessage(typeWanted: string, errorMessages?: any): string {
    errorMessages = { ..._defaultErrorMessages, ...errorMessages };
    let erreur = errorMessages.default();
    for (const type in errorMessages) {
      if (type === typeWanted) {
        erreur = errorMessages[type]();
        break;
      }
    }
    return erreur;
  }
}
