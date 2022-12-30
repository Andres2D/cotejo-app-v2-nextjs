import { useRef } from 'react';
import type { NextPage } from 'next';
import { 
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input
} from '@chakra-ui/react';
import styles from './player-card.module.scss';
import Position from './player-card/position';
import { useSelector } from 'react-redux';
import { RootState } from '../../interfaces/State';
import Nationality from './player-card/nationality';
import AvatarSelector from './player-card/avatar-selector';

interface Props {
  className: string;
}

const PlayerCard: NextPage<Props> = ({ className }: Props) => {

  const nameRef = useRef<HTMLInputElement>();
  const profileState = useSelector((state: RootState) => state.profile);

  const { 
    overall,
    name,
  } = profileState?.profile;
  
  const {
    peace,
    shooting,
    defense,
    dribbling,
    passing,
    physical,
  } = profileState.stats;

  const updateName = () => {
    if(!nameRef.current?.value) {
      return;
    }
    // onUpdate('name', nameRef.current?.value);
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.overall}>
          <h1 className={styles.title}>{overall}</h1>
          <Position />
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider}/>
          <Nationality />
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider} />
        </div>
        <AvatarSelector />
      </div>
      <div className={styles.cardBody}>
        <Popover>
          <PopoverTrigger>
            <h2 className={styles.title}>{name}</h2>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Name</PopoverHeader>
            <PopoverBody>
              <Input 
                placeholder='Basic usage'
                defaultValue={name}
                ref={nameRef}
                onChange={updateName}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Divider
          borderColor={'darks.50'}
          border='1px'
          w='280px'
          className={styles.divider} 
        />
        <div className={styles.rating}>
          <div className={styles.score}>
            <div className={styles.rate}>
              <h2>{peace}</h2>
              <h2>PAC</h2>
            </div>
            <div className={styles.rate}>
              <h2>{shooting}</h2>
              <h2>SHO</h2>
            </div>
            <div className={styles.rate}>
              <h2>{passing}</h2>
              <h2>PAS</h2>
            </div>
          </div>
          <Divider
            borderColor={'darks.50'}
            border='1px'
            h='170px'
            orientation='vertical'
            className={styles.divider} 
          />
          <div className={styles.score}>
            <div className={styles.rate}>
              <h2>{dribbling}</h2>
              <h2>DRB</h2>
            </div>
            <div className={styles.rate}>
              <h2>{defense}</h2>
              <h2>DEF</h2>
            </div>
            <div className={styles.rate}>
              <h2>{physical}</h2>
              <h2>PHY</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
