import { ApiResponse, create } from 'apisauce'
import { ICreateMatchRequest, FullMatch } from '../interfaces/Match';
import { UpdateProfileRequest, RegisterPlayerRequest } from '../interfaces/Player';
import { UpdateTeamRequest } from '../interfaces/Team';
import { IUpdateTeamPlayerRequest, IChangePlayerRequest } from '../interfaces/TeamPlayer';

const api = create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const updatePlayer = (request: UpdateProfileRequest) => api.put('/player', request);
export const registerPlayer = (request: RegisterPlayerRequest) => api.post('/player', request);
export const getPlayers = (query: string) => api.get<any>('/player', { query });

export const changePlayer = (request: IUpdateTeamPlayerRequest | IChangePlayerRequest) => api.put('/team-player', request);
export const leaveMatch = (id: string) => api.delete('/team-player', { idMatch: id });

export const createMatch = (request: ICreateMatchRequest) => api.post('/match', request);
export const updateMatch = (match: FullMatch): Promise<ApiResponse<any, any>> => api.put('/match', match);
export const deleteMatch = (id: string) => api.delete('/match', { id });

export const updateTeam = (request: UpdateTeamRequest) => api.put('/team', request);
