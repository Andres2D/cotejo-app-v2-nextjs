import { Tag } from '@chakra-ui/react'
import type { NextPage } from 'next';
import { Image } from '@chakra-ui/react';
import styles from './team.module.scss';

interface Props {
  name: string;
  image: string;
  width: number;
  height: number;
}

const Team: NextPage<Props> = ({name, image, width, height}: Props) => {
  return (
    <div className={styles.team}>
      <Image
        src={image}
        alt='Team logo'
        width={width}
        height={height}
        className={styles.logoShadow}
      ></Image>
      <Tag 
        size='lg' 
        variant='solid' 
        colorScheme='clean'
        className={styles.tag}
      >
        {name}
      </Tag>
    </div>
  );
}

export default Team;
