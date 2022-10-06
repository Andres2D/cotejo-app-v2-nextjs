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
  Button
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import styles from './navbar.module.css';

const Navbar: NextPage = () => {

  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  if(!session) {
    return <></>;
  }

  const { image, name } = session?.user;

  return (
    <>
      <div className={styles.container}>
        <Avatar 
          className={styles.avatar}
          name={name} 
          src={image}
          onClick={onOpen}
          ref={btnRef}
        />
      </div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className={styles.dark} />
          <DrawerHeader className={styles.dark}>
            <Avatar 
              className={styles.avatar}
              name={name} 
              src={image}
            />
            <h2>{name}</h2>
          </DrawerHeader>

          <DrawerBody className={styles.menu}>
            <Button 
              className={styles.option} 
              colorScheme='blue' 
              variant='outline'>
              Profile
            </Button>
            <Button 
              className={styles.option}
              colorScheme='red' 
              variant='outline'
              onClick={() => signOut()}>
              Log out
            </Button>
          </DrawerBody>

          <DrawerFooter className={styles.dark}>
            Cotejo App v2 
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
