import { Action, createReducer, on } from '@ngrx/store';
import * as ProfilAction from './profil.action';
import { Profil, ProfilState } from 'src/app/models/profil';

export const initialState: ProfilState = {
  selectedProfil: {
    first_name: '',
    last_name: '',
    mail: '',
    entity_id: '0', // 0 permet de vérifier si profil inexistant
  },
  profils: [],
};

/**
 * Modifie un profil existant
 * @param state
 * @param profil
 */
const editExistingProfil = (
  state: ProfilState,
  profil: Profil
): ProfilState => {
  let arrayProfil = state.profils;
  // On cherche l'index du profil à modifier
  const existingProfil = state.profils.findIndex(
    (el) => el.entity_id === profil.entity_id
  );
  // On ajoute les nouvelles infos du profil à l'index
  arrayProfil = [
    ...arrayProfil.slice(0, existingProfil),
    { ...profil },
    ...arrayProfil.slice(existingProfil + 1),
  ];
  // On retourne à nouveau le tableau de profil
  return { ...state, profils: arrayProfil };
};

/**
 * Supprime un profil existant grâce à son id
 */
const deleteExistingProfil = (state: ProfilState, id: string): ProfilState => {
  let filterArrayProfil = state.profils.filter((el) => el.entity_id !== id);
  return { ...state, profils: filterArrayProfil };
};

const _profilReducer = createReducer(
  initialState,
  on(ProfilAction.chooseProfil, (state, { profil }) => ({
    ...state,
    selectedProfil: profil,
  })),
  on(ProfilAction.resetProfil, (state) => ({
    ...state,
    selectedProfil: initialState.selectedProfil,
  })),
  on(ProfilAction.setAllProfil, (state, { profils }) => ({
    ...state,
    profils: profils,
  })),
  on(ProfilAction.resetAllProfil, (state) => ({ ...initialState })),
  on(ProfilAction.addProfil, (state, { profil }) => ({
    ...state,
    profils: [...state.profils, profil],
  })),
  on(ProfilAction.editProfil, (state, { profil }) => {
    return editExistingProfil(state, profil);
  }),
  on(ProfilAction.deleteProfil, (state, { id }) => {
    return deleteExistingProfil(state, id);
  })
);

export function profilReducer(state: ProfilState | undefined, action: Action) {
  return _profilReducer(state, action);
}
