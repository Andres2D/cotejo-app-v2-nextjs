import type { NextPage } from 'next';
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from './navbar.module.scss';
import { RootState } from '../../interfaces/State';

const Navbar: NextPage = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { image, name } = useSelector((state: RootState) => state.profile).profile;

  if (!session) {
    return <div className={styles.navbarSpacing}></div>;
  }

  return (
    <>
      <div className={styles.container}>
        <Avatar
          className={styles.avatar}
          src="/images/cotejo-app-ui.png"
          onClick={() => {
            onClose();
            router.push('/menu');
          }}
          bg="green.600"
        />
        <Avatar
          className={styles.avatar}
          src={image || 'https://bit.ly/broken-link'}
          onClick={onOpen}
          ref={btnRef}
        />
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className={styles.dark} />
          <DrawerHeader className={styles.headerMenu}>
            <Avatar
              className={styles.avatarMenu}
              src={image || 'https://bit.ly/broken-link'}
              onClick={() => {
                onClose();
                router.push('/profile');
              }}
              h="80px"
              minW="80px"
            />
            <h2 className={styles.username}>{name}</h2>
          </DrawerHeader>

          <DrawerBody className={styles.columnMenu}>
            <Button
              className={styles.option}
              colorScheme="green"
              variant="outline"
              onClick={() => {
                onClose();
                router.push('/matches');
              }}
            >
              Matches
            </Button>
          </DrawerBody>

          <DrawerFooter className={styles.columnMenu}>
            <p className={styles.dark}>Cotejo App v2 </p>
            <Button
              className={styles.option}
              colorScheme="red"
              variant="outline"
              onClick={() => {
                onClose();
                signOut();
              }}
            >
              Log out
            </Button>
            <p>Version 2.2.2</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
