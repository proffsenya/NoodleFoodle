import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/client/clientSlice'; // Используем экспорт по умолчанию

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});