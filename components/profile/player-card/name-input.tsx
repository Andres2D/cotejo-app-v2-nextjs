import { EditIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../interfaces/State';
import { profileActions } from '../../../store/profile.slice';
import styles from './name-input.module.scss';

const NameInput: NextPage = () => {

  const { name } = useSelector((state: RootState) => state.profile).profile;
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>();

  const updateName = () => {
    if(!nameRef.current?.value) {
      return;
    }
    dispatch(profileActions.updateInput({
      prop: 'name',
      value: nameRef.current.value
    }));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <h2 className={styles.title}>
          {name}
          <IconButton
            className={styles.edit}
            colorScheme='transparent'
            size='md'
            aria-label='Edit name'
            icon={<EditIcon />}
          />
        </h2>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Name</PopoverHeader>
        <PopoverBody>
          <Input 
            placeholder='Basic usage'
            defaultValue={name}
            ref={nameRef}
            onChange={updateName}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NameInput;
