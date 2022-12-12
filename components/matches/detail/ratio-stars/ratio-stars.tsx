import type { NextPage } from 'next';
import styles from './ratio-stars.module.scss';

interface Props {
  average: number;
}

const RatioStars: NextPage<Props> = ({ average }) => {
  return (
    <div className={styles.ratio}>
      {[20, 40, 60, 80, 99].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.star} ${
            star < average ? styles.filled : styles.notFilled
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
};
export default RatioStars;
