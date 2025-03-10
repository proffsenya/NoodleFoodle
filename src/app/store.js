import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import customCartSliceReducer from '../features/cart/customCartSlice';  // Импортируем срез корзины
import clientReducer from '../features/client/clientSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    client: clientReducer,
    customCartSlice: customCartSliceReducer
  },
});