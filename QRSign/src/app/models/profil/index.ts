export interface ProfilState {
  selectedProfil: Profil;
  profils: Profil[];
}

export interface Profil {
  first_name: string;
  last_name: string;
  mail: string;
  entity_id: string;
}
