export interface ITeamPlayer {
  position: string,
  isCaptain: boolean,
  player: string,
  team: string
};

export interface IUpdateTeamPlayerRequest {
  playerOneId: string;
  playerTwoId: string;
  playerOneTeam: string;
  playerTwoTeam: string;
}
