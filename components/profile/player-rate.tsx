import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { mockStats } from '../../mock/stats.mock';
import styles from './player-rate.module.css';

interface Props {
  className?: string;
}

const PlayerRate: NextPage<Props> = (props: Props) => {

  const stats = mockStats.map(({label, value}) => {
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
    <div className={`${styles.stats} ${props.className}`}>
      {stats}
    </div>
  );
}

export default PlayerRate;
