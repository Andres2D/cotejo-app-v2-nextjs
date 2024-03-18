import { orderRule } from "../constants/player-positions";
import { IFullPlayer } from "../interfaces/Player";

export const sortPlayerPositions = (playersArr: IFullPlayer[]) => {
  return [...playersArr].sort((a, b) => {
    if(orderRule[a.position?.toUpperCase() ?? 'CM'] < orderRule[b.position?.toUpperCase() ?? 'CM']) {
      return -1;
    }

    if(orderRule[a.position?.toUpperCase() ?? 'CM'] > orderRule[b.position?.toUpperCase() ?? 'CM']) {
      return 1;
    }

    return 0;
  });
};
