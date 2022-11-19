import { 
  colorSchemas,
  // colorLevels
} from '../constants/styles';

export const getRandomColorSchema = (): string => {
  const color = colorSchemas[Math.floor(Math.random() * (colorSchemas.length - 1))];
  // const level = colorLevels[Math.floor(Math.random() * (colorLevels.length - 1))];
  return color;
}
