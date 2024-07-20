import { configureStore } from '@reduxjs/toolkit';
import { connectionsReducer } from './features/connections';

export const makeStore = () => configureStore({
  reducer: {
    connections: connectionsReducer
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const store = makeStore();