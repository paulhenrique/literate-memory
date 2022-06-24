import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pomodoroReducer from '../features/pomodoro/pomodoroSlice';

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
