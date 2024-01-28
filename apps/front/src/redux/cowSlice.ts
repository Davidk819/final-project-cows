// cowSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface CowState {
  id: string;
  enter_date: string;
  num: number;
  status: string;
  stage: number;
  rea_img: string;
}

const initialState: CowState[] = [
  {
    id: '1',
    enter_date: '2022-01-01',
    num: 1,
    status: 'Active',
    stage: 1,
    rea_img: 'image-url',
  },
];

export const cowSlice = createSlice({
  name: 'cow',
  initialState,
  reducers: {
    setTaref: (state, action: PayloadAction<{ num: number; newStatus: string }>) => {
      const { num, newStatus } = action.payload;
      const cowToUpdate = state.find(cow => cow.num === num);

      if (cowToUpdate) {
        // Update the status of the found cow
        cowToUpdate.status = newStatus;
      }
    },
  },
});

export const { setTaref } = cowSlice.actions;

export const selectCows = (state: RootState) => state.cows;

export default cowSlice.reducer;
