import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProfilState } from 'src/app/models/profil';

const _selectProfil = createFeatureSelector<AppState, ProfilState>('profil');

/**
 * Nom du profil selectionné
 * @return string
 */
export const selectProfilName = createSelector(
  _selectProfil,
  (state: ProfilState) =>
    state.selectedProfil.first_name + ' ' + state.selectedProfil.last_name
);

/**
 * Id du profil selectionné
 * @return string
 */
export const selectProfilId = createSelector(
  _selectProfil,
  (state: ProfilState) => state.selectedProfil.entity_id
);

/**
 * Il y a un profil selectionné ?
 * @return boolean
 */
export const selectHasProfil = createSelector(
  _selectProfil,
  (state: ProfilState) => state.selectedProfil.entity_id !== '0'
);

/**
 * Tout les profil
 * @return Profil[]
 */
export const selectProfilGetAll = createSelector(
  _selectProfil,
  (state: ProfilState) => state.profils
);

/**
 * Profil de l'id selectionné
 * @return Profil
 */
export const selectProfilById = createSelector(
  _selectProfil,
  (state: ProfilState, id: string) => {
    const profil = state.profils.find((elem) => elem.entity_id == id);
    if (profil) return profil;
    throw 'Aucun profil trouvé';
  }
);
