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
  PopoverTrigger,
  Select,
} from '@chakra-ui/react';
import { getAllFlags, getFlagSvg } from 'empty-skull';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../interfaces/State';
import { profileActions } from '../../../store/profile.slice';
import styles from './nationality.module.scss';

const Nationality: NextPage = () => {

  const [flagsList, setFlagsList] = useState(getAllFlags());
  const { flag, nationality } = useSelector((state: RootState) => state.profile).profile;
  const dispatch = useDispatch();

  const flagRef = useRef<HTMLInputElement>();

  const flags = flagsList.map((country: any) => (
    <Image
      width={70}
      key={country.name}
      height={50}
      src={country.flag}
      alt={nationality}
      className={styles.flag}
      title={country.name}
      onClick={() => updateFlag(country.name)}
    />
  ));

  const updateFlag = (country: string) => {
    if(!country) {
      return;
    }

    dispatch(profileActions.updateInput({
      prop: 'nationality',
      value: country
    }));

    dispatch(profileActions.updateInput({
      prop: 'flag',
      value: getFlagSvg(country, true)?.flag
    }));
  };

  const searchFlag = () => {
    if(!flagRef?.current?.value) {
      setFlagsList(getAllFlags);
      return;
    }

    const flags = getFlagSvg(flagRef?.current?.value);
    setFlagsList(Array.isArray(flags) ? flags : [flags]);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className={styles.container}>
          <Image
            width={70}
            height={50}
            src={flag || getAllFlags()[0].flag}
            alt={nationality}
            className={styles.flag}
          />
          <IconButton
            className={styles.edit}
            colorScheme='transparent'
            size='md'
            aria-label='Edit flag'
            icon={<EditIcon />}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Country</PopoverHeader>
        <PopoverBody>
          <Input
            placeholder='Basic usage' 
            ref={flagRef}
            onChange={searchFlag}
          />
          <div className={styles.flags}>
            {flags}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Nationality;
