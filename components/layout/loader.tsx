
import type { NextPage } from 'next';
import { SpinnerIcon } from '@chakra-ui/icons';

import styles from './loader.module.scss';

interface Props {
  text?: string;
}

const Loader: NextPage<Props> = ({text = 'Loading'}) => {

  return (
    <div className={styles.loader}>
      <SpinnerIcon className={styles.icon} />
      <h2>{text}</h2>
    </div>
  )
    
};

export default Loader;
