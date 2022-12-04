interface base {
  email: string;
  name: string;
  password: string;
}

export interface Player extends base {
  nickname: string;
  number: number;
  status: string;
  image: string;
  google: boolean;
  nationality: string;
  position: string;
  _id?: string;
}

export interface IPlayerList {
  _id: string;
  name: string;
  nationality: string;
  position: string;
  image: string;
}

export interface IProfile {
  overall: number;
  position: string;
  flag: string;
  name: string;
  image?: string;
  nationality: string;
}

export interface IPlayerRequest {
  player: string;
  position: string;
  isCaptain: boolean;
}

export interface IStats {
  peace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physical: number;
}

export interface UpdateProfileRequest extends IStats {
  email: string;
  name: string;
  nationality: string;
  position: string;
  overall: number;
}

export interface RegisterPlayerRequest extends base {}

export interface PlayerFixture {
  label: string;
  value: number;
}

export interface IMatchPlayer {
  _id: string,
  nickname: string,
  name: string,
  number: number,
  status: string,
  image: string;
}

export interface IFullPlayer {
  _id: string;
  position: string;
  isCaptain: boolean;
  player: IMatchPlayer;
  team: string;
  overall: number;
}

export interface ISelectPayload {
  playerId: string,
  isAway: boolean
}
