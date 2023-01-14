import type { NextPage } from 'next';
import { 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogOverlay, 
  Button, 
  IconButton, 
  Image, 
  useDisclosure 
} from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { MutableRefObject, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './match-list.module.scss';
import Team from './team';
import { FullMatch } from '../../interfaces/Match';

interface Props {
  matches: FullMatch[]
}

const MatchList: NextPage<Props> = ({matches}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const [matchesList, setMatchesList] = useState<FullMatch[]>([]);
  const [deleteMatch, setDeleteMatch] = useState<FullMatch>();

  useEffect(() => {
    setMatchesList(matches);
  }, [matches]);

  const router = useRouter();

  const goToMatchDetails = (matchId: string) => {
    router.push(`/matches/${matchId}`)
  };

  const handleShowConfirmationModal = (match: FullMatch) => {
    setDeleteMatch(match);
    onOpen();
  };

  const handleDeleteMatch = () => {
    setMatchesList(matches => matches.filter(match => match._id !== deleteMatch?._id));
    onClose();
  };

  const matchesListMap = matchesList.map(({_id, date, location, away_team, home_team}) => {
    return (
      <section className={styles.section} key={_id}>
        <div 
          className={styles.container} 
          onClick={() => goToMatchDetails(_id)}
        >
          <div className={styles.matchDetails}>
            <Team
              name={home_team.name}
              image={home_team.shield}
              width={120}
              height={120}
            />

            <div className={styles.containerVS}>
              <Image
                src={'/images/vs-icon.png'}
                alt='Icon versus'
                width={55}
                height={45}
              ></Image>
              <div className={styles.details}>
                <h2>{date}</h2>
                <h2>{location}</h2>
              </div>
            </div>

            <Team
              name={away_team.name}
              image={away_team.shield}
              width={120}
              height={120}
            />
          </div>
        </div>
        <div className={styles.options}>
          <IconButton
            colorScheme='teal'
            size='md'
            mb={2}
            aria-label='Edit match'
            icon={<SettingsIcon />}
          />
          <IconButton
            colorScheme='red'
            size='md'
            aria-label='Deleted match'
            onClick={
              () => handleShowConfirmationModal({_id, date, location, away_team, home_team})
            }
            icon={<DeleteIcon />}
          />
        </div>
      </section>
    )
  });

  return (
    <>
      {matchesListMap}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {`${deleteMatch?.home_team?.name} vs ${deleteMatch?.away_team?.name}`}
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure? You can't undo this action afterwards`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteMatch} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MatchList;
