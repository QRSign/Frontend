import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SnackbarComponent } from 'src/app/component/snackbar/snackbar.component';

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
export class MessageService implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

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

  /**
   * Ouverture de la snackbar
   * @param message
   * @param classe
   */
  openSnackBar(
    message: string,
    classe: 'success' | 'error',
    duration = 2000,
    action?: string,
    callback?: any
  ) {
    const snackBarRef = this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        action,
        classe,
      },
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
    if (action) {
      const snackBarSubscription = snackBarRef.onAction().subscribe(() => {
        callback();
        snackBarRef.dismiss();
      });
      snackBarRef.afterDismissed().subscribe(() => {
        snackBarSubscription.unsubscribe();
      });
    }
  }
}
