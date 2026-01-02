import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from "./actionTypes";

export type Data = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type AppState = {
  data: Data;
  loading: boolean;
  error: string | null;
};

export type ActionType =
  | { type: typeof FETCH_REQUEST }
  | { type: typeof FETCH_SUCCESS; payload: Plugin[] }
  | { type: typeof FETCH_FAILURE; payload: string };
