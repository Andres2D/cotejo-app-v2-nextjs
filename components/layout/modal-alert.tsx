import { 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogOverlay, 
  Button
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { MutableRefObject, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  title?: string;
  description?: string;
  cancelLabel?: string;
  continueLabel?: string;
  actionColor?: string;
  children?: JSX.Element;
}

const ModalAlert: NextPage<Props> = (
  {
    isOpen, 
    onClose, 
    onContinue,
    title = 'Delete',
    description,
    cancelLabel = 'Cancel',
    continueLabel = 'Delete',
    actionColor = 'red',
    children
  }) => {

  const cancelRef = useRef() as MutableRefObject<HTMLButtonElement>;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            { description }
            { children }
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              { cancelLabel }
            </Button>
            <Button colorScheme={actionColor} onClick={onContinue} ml={3}>
              { continueLabel }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ModalAlert;
