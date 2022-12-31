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
  IconButton,
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
import { EditIcon } from '@chakra-ui/icons';

const AvatarSelector: NextPage = () => {
  const { image } = useSelector((state: RootState) => state.profile).profile;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();
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
    onClose();
    dispatch(profileActions.updateInput({
      prop: 'image',
      value: image
    }));
  };

  return (
    <>
      <div className={styles.avatarContainer} onClick={onOpen}>
        <Avatar
          className={styles.avatar}
          src={image || 'https://bit.ly/broken-link'}
          size="2xl"
        />
        <IconButton
          className={styles.edit}
          colorScheme='transparent'
          size='md'
          aria-label='Edit picture'
          icon={<EditIcon />}
        />
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='85%' className={styles.modal}>
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
