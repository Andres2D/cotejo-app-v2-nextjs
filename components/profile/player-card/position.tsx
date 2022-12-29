import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRef } from 'react';

import { playerPositions } from '../../../constants/player-positions';
import styles from './position.module.scss';

interface Props {
  position: string;
}

const Position: NextPage<Props> = ({position}) => {

  const positionRef = useRef<HTMLSelectElement>();
  const positions = playerPositions
    .map(pos => <option key={pos} value={pos}>{pos}</option>);

  return (
    <Popover>
      <PopoverTrigger>
        <p className={styles.position}>{position}</p>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Position</PopoverHeader>
        <PopoverBody>
          <Select
            defaultValue={position}
            placeholder="Select option"
            ref={positionRef}
            // onChange={updatePosition}
          >
            {positions}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Position;
