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
