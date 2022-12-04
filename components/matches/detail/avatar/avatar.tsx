import { RepeatIcon } from "@chakra-ui/icons";
import { 
  Avatar,
  Tag
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../../interfaces/State";
import { matchDetailsActions } from "../../../../store/match-details.slice";
import styles from './avatar.module.scss'; 

interface Props {
  name: string;
  id: string;
  overall: number;
  isAway?: boolean;
  className?: string;
  image?: string;
}

const AvatarMatchLayout: NextPage<Props> = ({id, name, overall, image, className, isAway = false}) => {

  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.matchDetails);

  const selectPlayerHandler = () => {
    dispatch(matchDetailsActions.selectPlayer({playerId: id, isAway}));
  };

  return (
    <div 
      className={`${styles.container} ${className}`}
    >
      <div className={styles.avatarContainer}>
        <Avatar
          size='lg'
          className={styles.avatar}
          name={name} 
          src={image ? image : 'https://bit.ly/tioluwani-kolawole'}
          onClick={selectPlayerHandler}
        />
        { details.playersSelected.some(p => p.playerId === id) && 
          <RepeatIcon 
            w={8} 
            h={8}
            className={styles.changeIcon} /> 
        }
      </div>
      <div className={styles.tagInfo}>
        <Tag className={styles.tag}>{name}</Tag>
        <Tag className={styles.tag}>{overall}</Tag>
      </div>
    </div>
  )
}

export default AvatarMatchLayout;
