import {createSlice} from '@reduxjs/toolkit';

export const clientsEmptyState = {
  list: [],
};

export const clientsSlice = createSlice({
  name: 'Clients',
  initialState: clientsEmptyState,
  reducers: {
    createClients: (state, action) => {
      return action.payload;
    },
    modifyClients: (state, action) => {
      return {...state, ...action.payload};
    },
    resetClients: () => {
      return clientsEmptyState;
    },
  },
});

export const {createClients, modifyClients, resetClients} =
  clientsSlice.actions;
