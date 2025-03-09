// src/features/cart/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  discount: 0,
  tip: 0,
  packagingType: 'standard',
  deliveryTime: 'asap',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setTip: (state, action) => {
      state.tip = action.payload;
    },
    setPackagingType: (state, action) => {
      state.packagingType = action.payload;
    },
    setDeliveryTime: (state, action) => {
      state.deliveryTime = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  applyDiscount,  // Экспортируем applyDiscount
  setTip,
  setPackagingType,
  setDeliveryTime,
} = cartSlice.actions;

export default cartSlice.reducer;