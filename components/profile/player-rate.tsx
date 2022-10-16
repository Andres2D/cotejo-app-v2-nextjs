import { 
  Slider, 
  SliderFilledTrack, 
  SliderThumb, 
  SliderTrack 
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './player-rate.module.css';
import { IStats } from '../../interfaces/Player';
import { useState } from 'react';

interface Props {
  className?: string;
  stats: IStats;
  onUpdate: (stat: string, value: number) => void;
}

const PlayerRate: NextPage<Props> = ({stats, className, onUpdate}: Props) => {

  const updateStats = (label: string, value: number) => {
    onUpdate(label, value);
  }

  const statsRates = Object.entries(stats).map(([label, value]) => {
    const title = `${label[0].toUpperCase()}${label.slice(1, label.length)}`;
    return (
      <div className={styles.stat} key={label}>
        <h1 className={styles.title}>{title}</h1>
        <Slider 
          aria-label='slider-ex-2' 
          colorScheme='brand' 
          value={value}
          onChange={(val) => updateStats(label, val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </div>
    )
  });

  return (
    <div className={`${styles.stats} ${className}`}>
      {statsRates}
    </div>
  );
}

export default PlayerRate;
