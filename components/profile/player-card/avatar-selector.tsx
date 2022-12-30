import {
  Avatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
// import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../interfaces/State';
import { profileActions } from '../../../store/profile.slice';
import styles from './avatar-selector.module.scss';
import { IAvatarsSelection } from '../../../interfaces/Profile';
import { avatarsCollection } from '../../../constants/avatars';
import { useSession } from 'next-auth/react';

const AvatarSelector: NextPage = () => {
  const { image } = useSelector((state: RootState) => state.profile).profile;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();
  console.log(session);
  const dispatch = useDispatch();

  let googleAvatar: IAvatarsSelection | null = null;

  if(session.data?.user?.image){
     googleAvatar = {
      key: 'avGoogle',
      src: session.data?.user?.image || '',
      label: 'Google'
    };
  };

  const avatarsMap = googleAvatar ? [ googleAvatar, ...avatarsCollection] : avatarsCollection;

  const availableAvatars = avatarsMap.map(({ key, label, src }) => {
    return (
      <div className={styles.container} key={key}>
        <Avatar
          className={styles.avatarList}
          src={src || 'https://bit.ly/broken-link'}
          size="xl"
          onClick={() => changeAvatarHandler(src)}
        />
        <Heading as='h4' size='md'>
          {label}
        </Heading>
      </div>
    )
  });

  const changeAvatarHandler = (image: string) => {
    dispatch(profileActions.updateInput({
      prop: 'image',
      value: image
    }));
  };

  return (
    <>
      <Avatar
        className={styles.avatar}
        src={image || 'https://bit.ly/broken-link'}
        size="2xl"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avatar selection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.avatars}>
              {availableAvatars}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarSelector;
