import { RepeatIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { NextPage } from "next";
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { RootState } from "../../../../interfaces/State";
import { matchDetailsActions } from "../../../../store/match-details.slice";
import styles from './avatar.module.scss';
import { IUpdateTeamPlayerRequest } from "../../../../interfaces/TeamPlayer";
import { changePlayer } from "../../../../services/api-configuration";

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
  //TODO: handle error and loading states
  const { mutate } = useMutation(changePlayer);
  const details = useSelector((state: RootState) => state.matchDetails);

  const showNamesOption = isAway 
    ? details.match.away_team.showNames 
    : details.match.home_team.showNames;
  
  const showStatsOption = isAway 
    ? details.match.away_team.showStats 
    : details.match.home_team.showStats;

  const changePlayerHandler = () => {
    dispatch(matchDetailsActions.toggleChangePlayerModal());
  };

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

      mutate(request);
    }
  };

  return (
    <div 
      className={`${styles.container} ${className}`}
    >
      <div className={styles.avatarContainer}>
        <Avatar
          size='lg'
          name={name}
          className={styles.avatar}
          src={image ? image : 'https://bit.ly/tioluwani-kolawole'}
          onClick={selectPlayerHandler}
        />
        { details.playersSelected.some(p => p.playerId === id) && 
          <div>
            <RepeatIcon 
              w={8} 
              h={8}
              color={'gray.50'}
              className={styles.changeIcon} />
            <EditIcon 
              w={7} 
              h={7}
              color={'gray.50'}
              focusable
              onClick={changePlayerHandler}
              className={styles.replaceIcon} />
          </div>
        }
        {
          showNamesOption &&  
          <h5 className={styles.playerName}>{name}</h5>
        }
        {
          showStatsOption &&
          <h5 className={styles.playerOverall}>{overall}</h5>
        }
      </div>
    </div>
  )
}

export default AvatarMatchLayout;
