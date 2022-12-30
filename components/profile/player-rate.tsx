import { 
  Slider, 
  SliderFilledTrack, 
  SliderThumb, 
  SliderTrack 
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../store/profile.slice';
import { RootState } from '../../interfaces/State';
import styles from './player-rate.module.scss';
import { calculateAVG } from '../../helpers/stats';

interface Props {
  className?: string;
}

const PlayerRate: NextPage<Props> = ({ className }: Props) => {

  const stats = useSelector((state: RootState) => state.profile).stats;
  const dispatch = useDispatch();

  const updateStats = (label: string, value: number) => {
    dispatch(profileActions.updateInputNumber({
      prop: label,
      value 
    }));
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
