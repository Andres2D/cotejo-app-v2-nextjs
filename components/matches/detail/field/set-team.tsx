import { EditIcon } from '@chakra-ui/icons';
import { 
  Button, 
  FormControl, 
  FormLabel, 
  IconButton, 
  Image, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent,
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure 
} from '@chakra-ui/react';
import { getAllTeams, getTeamPng } from 'empty-skull';
import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../interfaces/State';
import { matchDetailsActions } from '../../../../store/match-details.slice';
import styles from './set-team.module.scss';
import { updateTeam } from '../../../../services/api-configuration';

interface Props {
  isAway: boolean;
}

const SetTeam: NextPage<Props> = ({isAway}) => {
  const matchDetails = useSelector((state: RootState) => state.matchDetails).match;
  const teamDetail = isAway ? matchDetails.away_team : matchDetails.home_team;

  const nameRef = useRef<HTMLInputElement>(null);
  const teamShieldRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shieldList, setShieldList] = useState(getAllTeams());
  const [shield, setShield] = useState(teamDetail.shield);
  const dispatch = useDispatch();

  const searchShield = () => {
    if(!teamShieldRef?.current?.value) {
      setShieldList(getAllTeams());
      return;
    }

    const shields = getTeamPng(teamShieldRef?.current?.value);
    setShieldList(Array.isArray(shields) ? shields : [shields]);
  }

  const teams = shieldList.map((team) => (
    <Image
      width={70}
      key={team.img}
      height={70}
      src={team.img}
      alt={team.name}
      className={styles.shield}
      title={team.name}
      onClick={() => setShield(team.img)}
    />
  ));

  const updateShield = () => {
    dispatch(matchDetailsActions.updateTeam({
      team: isAway ? 'away_team' : 'home_team',
      setting: {
        name: nameRef?.current?.value || teamDetail.name ,
        shield
      }
    }));
    onClose();
  };

  return (
    <>
      <IconButton
        className={styles.edit}
        colorScheme='transparent'
        size='lg'
        aria-label='Edit team'
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className={styles.modal}>
          <ModalHeader>Edit team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Team name</FormLabel>
              <Input 
                type='text'
                defaultValue={teamDetail.name}
                ref={nameRef}  
              />
            </FormControl>
            <div className={styles.shieldSelector}>
              <FormLabel>Team shield</FormLabel>
              <Image
                width={70}
                height={70}
                src={shield}
                alt={teamDetail.name}
                className={styles.shield}
                title={teamDetail.name}
              />
              <Input 
                placeholder='Search shield' 
                ref={teamShieldRef}
                onChange={searchShield}
              />
              <div className={styles.shields}>
                {teams}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={updateShield}>
              Update
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SetTeam;
