import { IProfile, IStats } from './Player';

export interface IProfileState {
  profile: IProfile;
  stats: IStats;
}

export interface IAvatarsSelection {
  key: string;
  src: string;
  label: string;
}
