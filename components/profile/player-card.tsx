import { useRef, useState } from 'react';
import type { NextPage } from 'next';
import { getFlagSvg, getAllFlags } from 'empty-skull';
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
  Input
} from '@chakra-ui/react';
import Image from 'next/image';
import styles from './player-card.module.scss';
import { IProfile, IStats } from '../../interfaces/Player';
import Position from './player-card/position';

interface Props {
  className: string;
  profile: IProfile;
  stats: IStats;
  onUpdate: (field: string, value: string) => void;
}

interface IEventFile {
  target: {
    files: any[];
    value: null;
  }
}

const PlayerCard: NextPage<Props> = ({profile, className, onUpdate, stats}: Props) => {

  const flagRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const [flagsList, setFlagsList] = useState(getAllFlags());
  const inputRef = useRef(null);

  const { 
    overall,
    flag,
    image,
    name,
    position,
    nationality
  } = profile;
  
  const {
    peace,
    shooting,
    defense,
    dribbling,
    passing,
    physical,
  } = stats;

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

  const flags = flagsList.map((country: any) => (
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
      setFlagsList(getAllFlags);
      return;
    }

    const flags = getFlagSvg(flagRef?.current?.value);
    setFlagsList(Array.isArray(flags) ? flags : [flags]);
  }

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleFileChange = (event: IEventFile) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.overall}>
          <h1 className={styles.title}>{overall}</h1>
          <Position position={position} />
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
                    src={flag || getAllFlags()[0].flag}
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
          src={image || 'https://bit.ly/broken-link'} 
          size='2xl'
          onClick={handleClick}
        />
        <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
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
