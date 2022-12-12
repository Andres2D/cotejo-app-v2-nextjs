import { 
  Image,
  Heading
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './header.module.scss';
import RatioStars from '../ratio-stars/ratio-stars';

interface Props {
  teamName: string;
  teamShield: string;
  teamOverall: number;
  isAway?: boolean;
}

const FieldHeader: NextPage<Props> = ({teamName, teamShield, teamOverall, isAway = false}) => {

  return (
    <header className={`${styles.header} `}>
      <section className={`${styles.shield} ${isAway ? styles.isAway : ''}`}>
        <Image
          width={70}
          height={70}
          src={teamShield}
          alt={teamName}
          title={teamName}
          m='8px'
        />
        <Heading size='2xl'>{teamName}</Heading>
      </section>
      <RatioStars average={teamOverall} />
    </header>
  );
}

export default FieldHeader;
