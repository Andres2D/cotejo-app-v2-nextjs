import { create } from 'apisauce'
import { ICreateMatchRequest } from '../interfaces/Match';
import { UpdateProfileRequest, RegisterPlayerRequest } from '../interfaces/Player';
import { IUpdateTeamPlayerRequest } from '../interfaces/TeamPlayer';

const api = create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const updatePlayer = (request: UpdateProfileRequest) => api.put('/player', request);
export const changePlayer = (request: IUpdateTeamPlayerRequest) => api.put('/team-player', request);
export const registerPlayer = (request: RegisterPlayerRequest) => api.post('/player', request);
export const createMatch = (request: ICreateMatchRequest) => api.post('/match', request);
