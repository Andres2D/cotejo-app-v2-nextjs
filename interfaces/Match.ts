import { IFullPlayer, IPlayerList, IPlayerRequest, ISelectPayload } from './Player';
import { IFullTeam, ITeam } from './Team';

interface base {
  date: string;
  location: string;
}

interface FullTimeDetails {
  fullTime: boolean,
  homeScore: number,
  awayScore: number
}

export interface IMatch extends base, FullTimeDetails {
  home_team: string;
  away_team: string;
};

export interface FullMatch extends base, FullTimeDetails {
  _id: string;
  home_team: ITeam;
  away_team: ITeam;
}

export interface ICreateMatchState {
  home_team_name: string;
  away_team_name: string;
  home_team_shield: string;
  away_team_shield: string;
  home_players: IPlayerList[];
  away_players: IPlayerList[];
  players_number: number;
  current_step: number;
  date: string;
  place: string;
};

export interface ICreateMatchRequest extends base {
  home_team: ITeam;
  away_team: ITeam;
  home_players: IPlayerRequest[];
  away_players: IPlayerRequest[];
}

export interface IFullMatch extends base {
  _id: string;
  home_team: IFullTeam;
  away_team: IFullTeam;
  homeScore: number;
  awayScore: number;
  fullTime: boolean;  
}

export interface IMatchDetailsResponse {
  match: IFullMatch,
  home: IFullPlayer[],
  away: IFullPlayer[],
}
export interface IMatchDetails extends IMatchDetailsResponse {
  playersSelected: ISelectPayload[],
  changePlayerModalActive: boolean
};

export interface MatchesListState {
  matches: FullMatch[],
  selectedMatch?: FullMatch;
}
