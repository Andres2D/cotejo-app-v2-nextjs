import { useRef, useState } from 'react';
import type { NextPage } from 'next';
import { 
  Avatar, 
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Select,
  Input
} from '@chakra-ui/react';
import Image from 'next/image';
import styles from './player-card.module.css';
import { IProfile } from '../../interfaces/Player';
import { playerPositions } from '../../constants/player-positions';
import countriesFlag from '../../constants/countries-flags';

interface Props {
  className: string;
  profile: IProfile;
  onUpdate: (field: string, value: string) => void;
}

const PlayerCard: NextPage<Props> = ({profile, className, onUpdate}: Props) => {

  const positionRef = useRef<HTMLSelectElement>();
  const flagRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const [flagsList, setFlagsList] = useState(countriesFlag);

  const { 
    overall,
    flag,
    image,
    peace,
    shooting,
    defense,
    dribbling,
    name,
    passing,
    physical,
    position,
    nationality
  } = profile;

  const updatePosition = () => {
    if(!positionRef.current?.value) {
      return;
    }
    onUpdate('position', positionRef.current?.value);
  }

  const updateFlag = (country: string) => {
    if(!country) {
      return;
    }
    onUpdate('nationality', country);
  };

  const updateName = () => {
    if(!nameRef.current?.value) {
      return;
    }
    onUpdate('name', nameRef.current?.value);
  };

  const positions = playerPositions.map(pos => <option key={pos} value={pos}>{pos}</option>);

  const flags = flagsList.map(country => (
    <Image
      width={70}
      key={country.name}
      height={50}
      src={country.flag}
      alt={nationality}
      className={styles.flag}
      title={country.name}
      onClick={() => updateFlag(country.name)}
    />
  ));

  const searchFlag = () => {
    if(!flagRef?.current?.value) {
      setFlagsList([...countriesFlag]);
      return;
    }

    setFlagsList([...countriesFlag]
      .filter(fl => fl.name.toLowerCase().includes(flagRef?.current?.value?.toLowerCase() || '')));
  }

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.overall}>
          <h1 className={styles.title}>{overall}</h1>
          <Popover>
            <PopoverTrigger>
              <p className={styles.position}>{position}</p>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Position</PopoverHeader>
              <PopoverBody>
                <Select 
                  defaultValue={position}
                  placeholder='Select option'
                  ref={positionRef}
                  onChange={updatePosition}
                >
                  {positions}
                </Select>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider}/>
          <Popover>
            <PopoverTrigger>
              <div>
                <Image
                    width={70}
                    height={50}
                    src={flag}
                    alt={nationality}
                    className={styles.flag}
                  />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Country</PopoverHeader>
              <PopoverBody>
                <Input 
                  placeholder='Basic usage' 
                  ref={flagRef}
                  onChange={searchFlag}
                />
                <div className={styles.flags}>
                  {flags}
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider} />
        </div>
        <Avatar
          className={styles.avatar} 
          name={name}
          src={image} 
          size='2xl'
        />
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
                defaultValue={profile.name}
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
