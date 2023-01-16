import type { NextPage } from 'next';
import {
  IconButton, 
  Image, 
  useDisclosure, 
  useToast
} from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import styles from './match-list.module.scss';
import Team from './team';
import { deleteMatch as deleteMatchService, leftMatch  } from '../../services/api-configuration';
import { FullMatch } from '../../interfaces/Match';
import ModalAlert from '../layout/modal-alert';
import LeftIcon from '../../assets/svg/left.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../interfaces/State';

interface Props {
  matches: FullMatch[]
}

const MatchList: NextPage<Props> = ({matches}) => {

  const [matchesList, setMatchesList] = useState<FullMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<FullMatch>();
  const { 
    isOpen: deleteModalIsOpen, 
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose 
  } = useDisclosure();
  const { 
    isOpen: leftMatchModalIsOpen, 
    onOpen: leftMatchModalOnOpen,
    onClose: leftMatchModalOnClose 
  } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setMatchesList(matches);
  }, [matches]);

  const { mutate: mutateDeleteMatch } = useMutation(deleteMatchService, {
    onSuccess: async (response) => {
      if(response.ok) {
        setMatchesList(matches => matches.filter(match => match._id !== selectedMatch?._id));
        deleteModalOnClose();
        setSelectedMatch(undefined);
        toast({
          title: 'Delete match',
          description: "Match deleted.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Delete match',
          description: "Something went wrong, please try again later.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        deleteModalOnClose();
        setSelectedMatch(undefined);
      }
    },
    onError: () => {
      // TODO: handle error
    }
  });

  const { mutate: mutateLeftMatch } = useMutation(leftMatch, {
    onSuccess: async (response) => {
      if(response.ok) {
        setMatchesList(matches => matches.filter(match => match._id !== selectedMatch?._id));
        leftMatchModalOnClose();
        setSelectedMatch(undefined);
        toast({
          title: 'Left match',
          description: "You left the match.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Left match',
          description: "Something went wrong, please try again later.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        leftMatchModalOnClose();
        setSelectedMatch(undefined);
      }
    },
    onError: () => {
      // TODO: handle error
    }
  });

  const router = useRouter();

  const goToMatchDetails = (matchId: string) => {
    router.push(`/matches/${matchId}`)
  };

  const showDeleteMatchModal = (match: FullMatch) => {
    setSelectedMatch(match);
    deleteModalOnOpen();
  };

  const showLeftMatchModal = (match: FullMatch) => {
    setSelectedMatch(match);
    leftMatchModalOnOpen();
  };

  const handleDeleteMatch = () => {
    mutateDeleteMatch(selectedMatch?._id!);
  };
  
  const handleLeftMatch = () => {
    console.log(selectedMatch?._id);
    mutateLeftMatch(selectedMatch?._id!);
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
            mb={2}
            aria-label='Deleted match'
            onClick={
              () => showDeleteMatchModal({_id, date, location, away_team, home_team})
            }
            icon={<DeleteIcon />}
          />
          <IconButton
            colorScheme='linkedin'
            size='md'
            aria-label='Deleted match'
            onClick={
              () => showLeftMatchModal({_id, date, location, away_team, home_team})
            }
            icon={<LeftIcon />}
          />
        </div>
      </section>
    )
  });

  return (
    <>
      {matchesListMap}
      <ModalAlert 
        isOpen={deleteModalIsOpen} 
        onClose={deleteModalOnClose} 
        onContinue={handleDeleteMatch}
        title='Delete Match'
        description={`Are you sure? You can't undo this action afterwards`}
      />
      <ModalAlert 
        isOpen={leftMatchModalIsOpen} 
        onClose={leftMatchModalOnClose}
        onContinue={handleLeftMatch}
        title='Left match'
        description={`Are you sure? You would request to a team mate to add you again afterwards`}
        continueLabel='Left match'
      />
    </>
  );
};

export default MatchList;
