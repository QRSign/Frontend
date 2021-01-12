import { createAction, props } from '@ngrx/store';
import { Profil } from 'src/app/models/profil';

export enum ProfilTypes {
  chooseProfil = '[profil] Met à jour le profil séléctionné',
  resetProfil = '[profil] Remise à zéro du profil séléctioné',
  setAllProfil = '[profil] Met à jour tous les profils',
  resetAllProfil = '[profil] Remise à zéro des profils',
  addProfil = '[profil] Ajoute un profil',
  editProfil = '[profil] Modifie le profil séléctionné',
  deleteProfil = '[profil] Supprime le profil séléctionné',
}

export const chooseProfil = createAction(
  ProfilTypes.chooseProfil,
  props<{ profil: Profil }>()
);

export const setAllProfil = createAction(
  ProfilTypes.setAllProfil,
  props<{ profils: Profil[] }>()
);

export const resetProfil = createAction(ProfilTypes.resetProfil);

export const resetAllProfil = createAction(ProfilTypes.resetProfil);

export const addProfil = createAction(
  ProfilTypes.addProfil,
  props<{ profil: Profil }>()
);

export const editProfil = createAction(
  ProfilTypes.editProfil,
  props<{ profil: Profil }>()
);

export const deleteProfil = createAction(
  ProfilTypes.deleteProfil,
  props<{ id: string }>()
);
