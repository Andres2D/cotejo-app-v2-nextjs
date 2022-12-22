import { create } from 'apisauce'
import { UpdateProfileRequest } from '../interfaces/Player';

const api = create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const updatePlayer = (request: UpdateProfileRequest) => api.put('/player', request);
