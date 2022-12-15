export const formationKeyMap = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
];

export const formationTypeMap: { [id: string]: string } = {
  t: 'triangle',
  s: 'square',
  f: 'forward',
};

export const formationAlias: { [id: number]: { [key: string]: string } } = {
  4: {
    t: '1 - 3',
    s: '1 - 2 - 1',
    f: '1 - 3',
  },
  5: {
    t: '1 - 3 - 1',
    s: '1 - 2 - 2',
    f: '1 - 1 - 3',
  },
  6: {
    t: '2 - 2 - 1',
    s: '2 - 1 - 2',
    f: '3 - 1 - 1',
  },
  7: {
    t: '3 - 1 - 2',
    s: '3 - 2 - 1',
    f: '3 - 3',
  },
  8: {
    t: '3 - 1 - 3',
    s: '3 - 2 - 2',
    f: '3 - 3 - 1',
  },
  9: {
    t: '3 - 2 - 3',
    s: '3 - 3 - 2',
    f: '2 - 3 - 3',
  },
  10: {
    t: '4 - 4 - 1',
    s: '3 - 4 - 2',
    f: '4 - 3 - 2',
  },
  11: {
    t: '4 - 4 - 2',
    s: '4 - 3 - 3',
    f: '4 - 2 - 4',
  },
};
