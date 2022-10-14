export interface Player {
  email: string;
  password: string;
  nickname: string;
  name: string;
  number: number;
  status: string;
  image: string;
  google: boolean;
  nationality: string;
  position: string;
  _id?: string;
}

export interface IProfile {
  overall: number;
  position: string;
  flag: string;
  name: string;
  peace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physical: number;
  image?: string;
  nationality: string;
}
