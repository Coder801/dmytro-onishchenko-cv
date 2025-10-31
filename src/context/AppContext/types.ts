import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from './actionTypes';

export type Plugin = {
  name: string;
  description: string;
  path: string;
  state: boolean;
  isActive?: boolean;
};

export type AppState = {
  data: Plugin[];
  loading: boolean;
  error: string | null;
};

export type ActionType =
  | { type: typeof FETCH_REQUEST }
  | { type: typeof FETCH_SUCCESS; payload: Plugin[] }
  | { type: typeof FETCH_FAILURE; payload: string };
