import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from './actionTypes';
import { AppState } from './types';
import { ActionType } from './types';

export const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
