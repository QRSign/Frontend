import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ProfilState } from 'src/app/models/profil';
import { profilReducer } from './profil/profil.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['profil', 'settings'],
    rehydrate: true,
    storageKeySerializer: (key) => 'qrsign_' + key,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

export interface AppState {
  profil: ProfilState;
}

export const reducers: ActionReducerMap<AppState> = {
  profil: profilReducer,
};
