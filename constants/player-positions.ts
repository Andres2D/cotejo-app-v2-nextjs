import { MapOrder, PlayerFixture } from "../interfaces/Player";

export const playerPositions: string[] = [
  'GK',
  'CB',
  'LB',
  'RB',
  'LWB',
  'RWB',
  'SW',
  'DM',
  'CM',
  'AM',
  'LM',
  'RM',
  'CF',
  'S',
  'SS'
];

export const playersFixture: PlayerFixture[] = [
  {
    label: '4 vs 4',
    value: 8
  },
  {
    label: '5 vs 5',
    value: 10
  },
  {
    label: '6 vs 6',
    value: 12
  },
  {
    label: '7 vs 7',
    value: 14
  },
  {
    label: '8 vs 8',
    value: 16
  },
  {
    label: '9 vs 9',
    value: 18
  },
  {
    label: '10 vs 10',
    value: 20
  },
  {
    label: '11 vs 11',
    value: 22
  },
];

export const orderRule: MapOrder = {
  GK: 0,
  LB: 1,
  LM: 2,
  RM: 3,
  RB: 4,
  LF: 5,
  RF: 6,
  CAM: 7,
  CM: 8,
  CMD: 9,
  CF: 10,
  LW: 11,
  RW: 12,
  ST: 13
};
