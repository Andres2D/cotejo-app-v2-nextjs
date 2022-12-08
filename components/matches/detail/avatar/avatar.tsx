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
import useRequest from "../../../../hooks/use-request";
import { IUpdateTeamPlayerRequest } from "../../../../interfaces/TeamPlayer";

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
  const {
    sendRequest
  } = useRequest();

  const selectPlayerHandler = () => {
    dispatch(matchDetailsActions.selectPlayer({playerId: id, isAway}));

    if(details.playersSelected.length > 0 && details.playersSelected[0].playerId !== id) {

      let request: IUpdateTeamPlayerRequest;

      if(isAway === details.playersSelected[0].isAway) {
        const teamId =  isAway ? details.away[0].team : details.home[0].team;

        request = {
          playerOneId: details.playersSelected[0].playerId,
          playerTwoId: id,
          playerOneTeam: teamId,
          playerTwoTeam: teamId
        };
      } else {
        request = {
          playerOneId: details.playersSelected[0].playerId,
          playerTwoId: id,
          playerOneTeam: !isAway ? details.away[0].team : details.home[0].team,
          playerTwoTeam: isAway ? details.away[0].team : details.home[0].team
        };
      };

      sendRequest({
        url: '/api/team-player',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      }, () => {});
    }
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
