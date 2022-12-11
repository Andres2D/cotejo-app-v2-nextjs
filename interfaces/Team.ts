export interface ITeam {
  name: string;
  formation: string;
  shield: string;
  showNames?: boolean;
  showStats?: boolean;
}

export interface TeamShield {
  img: string;
  name: string;
}

export interface IFullTeam extends ITeam {
  _id: string;
}
