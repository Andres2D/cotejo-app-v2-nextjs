import { IPlayerList } from './Player';
import { ITeam } from './Team';

interface base {
  date: string;
  location: string;
}

export interface IMatch extends base {
  home_team: string;
  away_team: string;
};

export interface FullMatch extends base {
  _id: string;
  home_team: ITeam;
  away_team: ITeam;
}

export interface ICreateMatchState {
  home_team_name: string;
  away_team_name: string;
  home_team_shield: string;
  away_team_shield: string;
  home_players: IPlayerList[],
  away_players: IPlayerList[]
  // current_step: number;
};
