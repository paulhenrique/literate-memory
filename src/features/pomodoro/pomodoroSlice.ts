import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { v4 as uuid } from 'uuid';

const INITIAL_TIME = 0;
export interface PomodoroState {
  list: {time: number; id: string}[];
  currentTime: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PomodoroState = {
  currentTime: INITIAL_TIME,
  status: 'idle',
  list: [],
};

export const create = createAsyncThunk(
  'pomodoro/create',
  async () => {
    await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(true), 900)
    );
    return true;
  }
);

export const deleteOne = createAsyncThunk(
  'pomodoro/deleteOne',
  async (item: {id: string}) => {
    await new Promise<{id: string}>((resolve) =>
      setTimeout(() => resolve(item), 900)
    );
    return true;
  }
);

export const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    increment: (state) => {
      state.currentTime = ++state.currentTime;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.currentTime += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(create.fulfilled, (state) => {
        state.status = 'idle';
        state.list.push({
          time: state.currentTime,
          id: uuid()
        });
        state.currentTime = INITIAL_TIME;
      })
      .addCase(create.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteOne.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = state.list.filter((item) => item.id !== action.meta.arg.id);
      })
      .addCase(deleteOne.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, incrementByAmount } = pomodoroSlice.actions;

export default pomodoroSlice.reducer;

export interface useSelectorType {
    pomodoro: PomodoroState;
}

export const usePomodoroSelector = () => useSelector(({pomodoro}:useSelectorType) => pomodoro)