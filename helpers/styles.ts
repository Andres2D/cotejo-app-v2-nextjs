import { 
  colorSchemas,
} from '../constants/styles';

export const getRandomColorSchema = (): string => {
  const color = colorSchemas[Math.floor(Math.random() * (colorSchemas.length - 1))];
  return color;
}
