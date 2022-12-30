import { Avatar } from '@chakra-ui/react';
import type { NextPage } from 'next';
// import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../interfaces/State';
// import { profileActions } from '../../../store/profile.slice';
import styles from './avatar-selector.module.scss';

const AvatarSelector: NextPage = () => {

  const { image } = useSelector((state: RootState) => state.profile).profile;
  // const dispatch = useDispatch();

  return (
    <Avatar
      className={styles.avatar}
      src={image || 'https://bit.ly/broken-link'} 
      size='2xl'
    />
  );
};

export default AvatarSelector;
