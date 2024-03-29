import { EditIcon } from '@chakra-ui/icons';
import {
  IconButton,
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
import { useSelector, useDispatch } from 'react-redux';

import { playerPositions } from '../../../constants/player-positions';
import { RootState } from '../../../interfaces/State';
import { profileActions } from '../../../store/profile.slice';
import styles from './position.module.scss';

const Position: NextPage = () => {

  const { position } = useSelector((state: RootState) => state.profile).profile;
  const dispatch = useDispatch();

  const positionRef = useRef<HTMLSelectElement>(null);
  const positions = playerPositions
    .map(pos => <option key={pos} value={pos}>{pos}</option>);

  const updatePosition = () => {
    dispatch(profileActions.updateInput(
      {
        prop: 'position', 
        value: positionRef?.current?.value || ''
      }
    ));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <p className={styles.position}>
          {position}
          <IconButton
            className={styles.edit}
            colorScheme='transparent'
            size='md'
            aria-label='Edit position'
            icon={<EditIcon />}
          />
        </p>
      </PopoverTrigger>
      <PopoverContent w='100%'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Position</PopoverHeader>
        <PopoverBody>
          <Select
            defaultValue={position}
            placeholder="Select option"
            //TODO: review type error
            ref={positionRef}
            onChange={updatePosition}
          >
            {positions}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Position;
