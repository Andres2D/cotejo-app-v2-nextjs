import { Rating } from "../interfaces/Rating";
import { Stats } from '../interfaces/Stats';

export const statsMap = (stats: Rating): Stats[] | null => {
  const mappedStats = Object.entries(stats).map(stat => {
    return {
      label: `${stat[0].charAt(0).toUpperCase()}${stat[0].slice(1)}`,
      value: stat[1]
    }
  });

  return mappedStats;
};
