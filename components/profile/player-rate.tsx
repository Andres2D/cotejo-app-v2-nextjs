import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './player-rate.module.css';
import { Stats } from '../../interfaces/Stats';

interface Props {
  className?: string;
  stats: Stats[];
}

const PlayerRate: NextPage<Props> = ({stats, className}: Props) => {

  const filterStats = stats.filter(a => a.label !== 'Player' && a.label !== 'Overall' )

  const statsMap = filterStats.map(({label, value}) => {
    return (
      <div className={styles.stat} key={label}>
        <h1 className={styles.title}>{label}</h1>
        <Slider aria-label='slider-ex-2' colorScheme='brand' defaultValue={value}>
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
      {statsMap}
    </div>
  );
}

export default PlayerRate;
