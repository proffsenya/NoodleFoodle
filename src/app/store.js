import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/client/clientSlice';
import cartReducer from '../features/cart/cartSlice'; // Используем экспорт по умолчанию

export const store = configureStore({
  reducer: {
    client: clientReducer,
    cart: cartReducer,
  },
});

