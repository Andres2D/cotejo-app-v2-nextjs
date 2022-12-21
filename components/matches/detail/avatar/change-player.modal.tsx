import { 
  Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent,
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure 
} from '@chakra-ui/react';
import { NextPage } from 'next';
import styles from './change-player.modal.module.scss';

const ChangePlayerModal: NextPage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal 
      closeOnOverlayClick={false} 
      isOpen={false} 
      onClose={onClose}
      variant={'brand'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change player</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* <Lorem count={2} /> */}
          <p>This works!</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChangePlayerModal;
