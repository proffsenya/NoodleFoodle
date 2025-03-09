import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'; // Импортируем срез корзины
import clientReducer from '../features/client/clientSlice'; // Импортируем срез клиента

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    client: clientReducer,
  },
});