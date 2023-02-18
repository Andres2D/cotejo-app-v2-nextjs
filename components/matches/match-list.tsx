import type { NextPage } from 'next';
import { FormControl, FormLabel, IconButton, Image, Input, useDisclosure, useToast } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import styles from './match-list.module.scss';
import Team from './team';
import {
  deleteMatch as deleteMatchService,
  leaveMatch,
  updateMatch
} from '../../services/api-configuration';
import { FullMatch } from '../../interfaces/Match';
import ModalAlert from '../layout/modal-alert';
import LeaveIcon from '../../assets/svg/leave.svg';

interface Props {
  matches: FullMatch[];
}

const MatchList: NextPage<Props> = ({ matches }) => {
  const [matchesList, setMatchesList] = useState<FullMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<FullMatch>();
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure();
  const {
    isOpen: leaveMatchModalIsOpen,
    onOpen: leaveMatchModalOnOpen,
    onClose: leaveMatchModalOnClose,
  } = useDisclosure();
  const {
    isOpen: fulltimeModalIsOpen,
    onOpen: fulltimeModalOnOpen,
    onClose: fulltimeModalOnClose,
  } = useDisclosure();
  const toast = useToast();

  const homeScoreRef = useRef() as MutableRefObject<HTMLInputElement>;
  const awayScoreRef = useRef() as MutableRefObject<HTMLInputElement>;
  

  useEffect(() => {
    setMatchesList(matches);
  }, [matches]);

  const { mutate: mutateDeleteMatch } = useMutation(deleteMatchService, {
    onSuccess: async (response) => {
      if (response.ok) {
        setMatchesList((matches) =>
          matches.filter((match) => match._id !== selectedMatch?._id)
        );
        deleteModalOnClose();
        setSelectedMatch(undefined);
        toast({
          title: 'Delete match',
          description: 'Match deleted.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Delete match',
          description: 'Something went wrong, please try again later.',
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
    },
  });

  const { mutate: mutateLeaveMatch } = useMutation(leaveMatch, {
    onSuccess: async (response) => {
      if (response.ok) {
        setMatchesList((matches) =>
          matches.filter((match) => match._id !== selectedMatch?._id)
        );
        leaveMatchModalOnClose();
        setSelectedMatch(undefined);
        toast({
          title: 'Leave match',
          description: 'You left the match.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Leave match',
          description: 'Something went wrong, please try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        leaveMatchModalOnClose();
        setSelectedMatch(undefined);
      }
    },
    onError: () => {
      // TODO: handle error
    },
  });

  const { mutate: mutateUpdateMatch } = useMutation(updateMatch, {
    onSuccess: async (response) => {
      if (response.ok) {
        fulltimeModalOnClose();
        setSelectedMatch(undefined);
        toast({
          title: 'Match updated',
          description: 'You update the match.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Match updated',
          description: 'Something went wrong, please try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        fulltimeModalOnClose();
        setSelectedMatch(undefined);
      }
    },
    onError: () => {
      // TODO: handle error
    },
  });

  const router = useRouter();

  const goToMatchDetails = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };

  const showDeleteMatchModal = (match: FullMatch) => {
    setSelectedMatch(match);
    deleteModalOnOpen();
  };

  const showLeaveMatchModal = (match: FullMatch) => {
    setSelectedMatch(match);
    leaveMatchModalOnOpen();
  };

  const showFullTimeModal = (match: FullMatch) => {
    setSelectedMatch(match);
    fulltimeModalOnOpen();
  };

  const handleDeleteMatch = () => {
    mutateDeleteMatch(selectedMatch?._id!);
  };

  const handleLeaveMatch = () => {
    mutateLeaveMatch(selectedMatch?._id!);
  };
  
  const handleFulltime = () => {
    if(homeScoreRef.current.value.trim() === '' || awayScoreRef.current.value.trim() === '' ) {
      return;
    }

    const request: FullMatch = {
      ...selectedMatch!,
      fullTime: true,
      homeScore: +homeScoreRef.current.value,
      awayScore: +awayScoreRef.current.value
    };

    mutateUpdateMatch(request);
  };

  const matchesListMap = matchesList.map(
    ({
      _id,
      date,
      location,
      away_team,
      home_team,
      fullTime,
      homeScore,
      awayScore,
    }) => {
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
                fullTime={fullTime}
                isWinner={homeScore > awayScore}
                score={homeScore}
                width={120}
                height={120}
              />

              <div className={styles.containerVS}>
                <Image
                  className={styles.versusIcon}
                  src={'/images/vs-icon.png'}
                  alt="Icon versus"
                  width={55}
                  height={45}
                ></Image>
                <div className={styles.details}>
                  <h2>{date}</h2>
                  <h2>{location}</h2>
                  { 
                    fullTime &&
                    <h2 className={styles.fullTime}>Full-time</h2>
                  }
                </div>
              </div>

              <Team
                name={away_team.name}
                image={away_team.shield}
                fullTime={fullTime}
                isWinner={awayScore > homeScore}
                score={awayScore}
                width={120}
                height={120}
              />
            </div>
          </div>
          <div className={styles.options}>
            <IconButton
              colorScheme="teal"
              size="md"
              mb={2}
              disabled={fullTime}
              aria-label="Edit match"
              icon={<SettingsIcon />}
            />
            <IconButton
              colorScheme="red"
              size="md"
              mb={2}
              aria-label="Deleted match"
              onClick={() =>
                showDeleteMatchModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<DeleteIcon />}
            />
            <IconButton
              colorScheme="linkedin"
              size="md"
              aria-label="Deleted match"
              mb={2}
              disabled={fullTime}
              onClick={() =>
                showLeaveMatchModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<LeaveIcon />}
            />
            <IconButton
              colorScheme="green"
              disabled={fullTime}
              size="md"
              aria-label="Full time"
              onClick={() =>
                showFullTimeModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<CheckCircleIcon />}
            />
          </div>
        </section>
      );
    }
  );

  return (
    <>
      {matchesListMap}
      <ModalAlert
        isOpen={deleteModalIsOpen}
        onClose={deleteModalOnClose}
        onContinue={handleDeleteMatch}
        title="Delete Match"
        description={`Are you sure? You can't undo this action afterwards`}
      />
      <ModalAlert
        isOpen={leaveMatchModalIsOpen}
        onClose={leaveMatchModalOnClose}
        onContinue={handleLeaveMatch}
        title="Leave match"
        description={`Are you sure? You would request to a team mate to add you again afterwards`}
        continueLabel="Leave match"
      />
      <ModalAlert
        isOpen={fulltimeModalIsOpen}
        onClose={fulltimeModalOnClose}
        onContinue={handleFulltime}
        actionColor='green'
        title="Full time - Scores"
        continueLabel="Update"
      >

        <form className={styles.fullTime}>
          <FormControl className={styles.formControl}>
            <Image
              src={selectedMatch?.home_team.shield}
              alt={selectedMatch?.home_team.name}
              width='50px'
              height='50px'
            />
            <FormLabel 
              textAlign={'center'} 
              marginInlineEnd={0}
            >
              {selectedMatch?.home_team.name}
            </FormLabel>
            <Input width={'16'} type='number' ref={homeScoreRef} />
          </FormControl>
          <FormControl className={styles.formControl}>
            <Image
              src={selectedMatch?.away_team.shield}
              alt={selectedMatch?.away_team.name}
              width='50px'
              height='50px'
            />
            <FormLabel
              textAlign={'center'} 
              marginInlineEnd={0}
            >
              {selectedMatch?.away_team.name}
            </FormLabel>
            <Input width={'16'} type='number' ref={awayScoreRef} />
          </FormControl>
        </form>
      </ModalAlert>
    </>
  );
};

export default MatchList;
