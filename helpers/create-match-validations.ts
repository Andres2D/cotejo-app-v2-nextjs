import { ICreateMatchRequest } from "../interfaces/Match";
import { IPlayerRequest } from "../interfaces/Player";
import { ITeam } from '../interfaces/Team';

export const fullFormErrors = (request: ICreateMatchRequest, numberOfPlayers: number): (string | null)[] => {
  let errors: (string | null)[] = [];

  errors = [
    playerErrors([...request.home_players, ...request.away_players], numberOfPlayers),
    teamErrors(request.home_team, 'home'),
    teamErrors(request.away_team, 'away')
  ];

  return errors;
};

const playerErrors = (players: IPlayerRequest[], numberOfPlayers: number): string | null => {
  
  if(players.length !== numberOfPlayers) {
    return 'Please fill all the players before creating the match. You could add some partial bots to fill the players list';
  }
  
  return null;
};

const teamErrors = (team: ITeam, teamStatus: string): string | null => {
  if(team.name.trim() === '') {
    return `Please add a name to the ${teamStatus} team`;
  }
  return null;
};
