import { 
  Image,
  Heading
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './header.module.scss';

interface Props {
  teamName: string;
  teamShield: string;
  isAway?: boolean;
}

const FieldHeader: NextPage<Props> = ({teamName, teamShield, isAway = false}) => {

  return (
    <header className={`${styles.header} ${isAway ? styles.isAway : ''}`}>
      <Image
        width={70}
        height={70}
        src={teamShield}
        alt={teamName}
        title={teamName}
        m='8px'
      />
      <Heading size='2xl'>{teamName}</Heading>
    </header>
  );
}

export default FieldHeader;
