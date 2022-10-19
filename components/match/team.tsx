import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './team.module.css';
import Image from 'next/image';

interface Props {
  name: string;
  image: string;
  width: number;
  height: number;
}

const Team: NextPage<Props> = ({name, image, width, height}: Props) => {
  return (
    <div>
        <Image
          src={image}
          alt='Team logo'
          width={width}
          height={height}
          className={styles.logoShadow}
        ></Image>
        <div className={styles.nameTeam}>
          <h2>{name}</h2>
        </div>
      </div>
  );
}

export default Team;
