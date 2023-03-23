import {configureStore} from '@reduxjs/toolkit';
import {clientsSlice} from './states/clients';

const Store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
  },
});

export default Store;
