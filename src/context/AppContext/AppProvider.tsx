import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { FETCH_FAILURE, FETCH_SUCCESS } from './actionTypes';
import { appReducer } from './reducer';
import { initialState } from './state';
import { ActionType, AppState } from './types';

const AppContext = createContext<
  { state: AppState; dispatch: Dispatch<ActionType> } | undefined
>(undefined);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const initPluginList = async () => {
      try {
        dispatch({
          type: FETCH_SUCCESS,
          payload: [],
        });
      } catch (error: unknown) {
        console.error('Failed to fetch data:', error);
        dispatch({ type: FETCH_FAILURE, payload: String(error) });
      }
    };

    initPluginList();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const useAppSelector = <T,>(selector: (state: AppState) => T): T => {
  const { state } = useAppContext();
  return selector(state);
};

export { AppProvider, useAppContext, useAppSelector };
