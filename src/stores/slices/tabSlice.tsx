import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabState = {
  selectedTab: string;
};

const initialState: TabState = {
  selectedTab: '',
};

const tabSlice = createSlice({
  name: 'Tab',
  initialState,
  reducers: {
    setTabSelected: (state, action: PayloadAction<string>) => {
      console.log('action: ', action);
      state.selectedTab = action.payload;
    },
  },
});

export const { setTabSelected } = tabSlice.actions;

export default tabSlice;
