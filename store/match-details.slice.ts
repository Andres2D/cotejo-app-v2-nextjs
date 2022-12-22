import { 
  createSlice, 
  PayloadAction, 
  CaseReducer, 
  current
} from '@reduxjs/toolkit';
import { sortPlayerPositions } from '../helpers/positions';
import { IMatchDetails } from '../interfaces/Match';
import { IPlayerList, ISelectPayload } from '../interfaces/Player';
import { SettingOption, TeamCondition } from '../types/match';

interface IPayload {
  input: TeamCondition,
  value: string
}

interface IPayloadSetting {
  team: TeamCondition,
  setting: SettingOption,
  value: boolean
}

const initialState: IMatchDetails = {
  match: {
    _id: '',
    home_team: {
      _id: '',
      formation: 't',
      name: '',
      shield: '',
      showNames: true,
      showStats: true,
    },
    away_team: {
      _id: '',
      formation: 't',
      name: '',
      shield: '',
      showNames: true,
      showStats: true,
    },
    date: '',
    location: '',
  },
  home: [],
  away: [],
  playersSelected: [],
  changePlayerModalActive: false
};

const setMatchState: CaseReducer<IMatchDetails, PayloadAction<IMatchDetails>> = 
  (state: IMatchDetails, action: PayloadAction<IMatchDetails>) => {
    const { match, away, home } = action.payload;

    state.match = match;
    state.match.home_team.showNames = true;
    state.match.home_team.showStats = true;
    state.match.away_team.showNames = true;
    state.match.away_team.showStats = true;
    state.home = sortPlayerPositions(home);
    state.away = sortPlayerPositions(away);
}

const updateInput: CaseReducer<IMatchDetails, PayloadAction<IPayload>> = 
  (state: IMatchDetails, action: PayloadAction<IPayload>) => {
  const { input, value } = action.payload;
  if(input === 'home_team') {
    state.match.home_team.formation = value;
  }else{
    state.match.away_team.formation = value;
  }
}

const selectPlayer: CaseReducer<IMatchDetails, PayloadAction<ISelectPayload>> = 
  (state: IMatchDetails, action: PayloadAction<ISelectPayload>) => {

  if(state.playersSelected.find(p => p.playerId === action.payload.playerId)){
    state.playersSelected = [];
    return;
  }

  state.playersSelected.push(action.payload);

  if(state.playersSelected.length > 1 ) {
    const [first, second] = state.playersSelected;
    const firstPlayer = state[first.isAway ? 'away' : 'home'].filter(p => p.player._id === first.playerId)[0];
    const secondPlayer = state[second.isAway ? 'away' : 'home'].filter(p => p.player._id === second.playerId)[0];

    state.home = state.home.map(p => {
      return p.player._id === first.playerId 
        ? { ...secondPlayer, position: firstPlayer.position, team: firstPlayer.team } 
        : (
          p.player._id === second.playerId 
            ? { ...firstPlayer, position: secondPlayer.position, team: secondPlayer.team } 
            : p
        );
    });

    state.away = state.away.map(p => {
      return p.player._id === first.playerId 
        ? { ...secondPlayer, position: firstPlayer.position, team: firstPlayer.team } 
        : (
          p.player._id === second.playerId 
            ? { ...firstPlayer, position: secondPlayer.position, team: secondPlayer.team } 
            : p
        );
    });
    
    state.playersSelected = [];
  }
};

const updateInterfaceSettings: CaseReducer<IMatchDetails, PayloadAction<IPayloadSetting>> = 
  (state: IMatchDetails, action: PayloadAction<IPayloadSetting>) => {
  const { team, setting, value } = action.payload;
  state.match[team][setting] = value;
}

const toggleChangePlayerModal: CaseReducer<IMatchDetails> = 
(state: IMatchDetails) => {
  state.changePlayerModalActive = !state.changePlayerModalActive;
};

const replacePlayer: CaseReducer<IMatchDetails, PayloadAction<IPlayerList>> = 
(state: IMatchDetails, action: PayloadAction<IPlayerList>) => {

  const isAway = state.playersSelected[0].isAway;
  const teamType = isAway ? 'away' : 'home';

  console.log(current(state[teamType][state[teamType].findIndex(p => p.player._id === state.playersSelected[0].playerId)].player));
  
  state[teamType][state[teamType].findIndex(p => p.player._id === state.playersSelected[0].playerId)].player.image = action.payload.image;
  state[teamType][state[teamType].findIndex(p => p.player._id === state.playersSelected[0].playerId)].player.name = action.payload.name;
  state[teamType][state[teamType].findIndex(p => p.player._id === state.playersSelected[0].playerId)].overall = action.payload?.overall || 50;
  state[teamType][state[teamType].findIndex(p => p.player._id === state.playersSelected[0].playerId)].player._id = action.payload._id;
  state.playersSelected = [];
};

const matchDetailSlice = createSlice({
  name: 'matchDetails',
  initialState,
  reducers: {
    setMatchState,
    updateInput,
    selectPlayer,
    updateInterfaceSettings,
    toggleChangePlayerModal,
    replacePlayer
  }
});

export const matchDetailsActions = matchDetailSlice.actions;
export default matchDetailSlice.reducer;
