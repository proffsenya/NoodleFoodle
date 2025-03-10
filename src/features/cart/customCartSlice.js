// features/cart/customCartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/customCart'; // URL для кастомной корзины

// Асинхронное действие для добавления кастомного блюда в корзину
export const addCustomProductToCart = createAsyncThunk(
  'customCart/addCustomProductToCart',
  async (customProduct) => {
    const response = await axios.post(API_URL, customProduct);
    return response.data;
  }
);

// Асинхронное действие для удаления кастомного блюда из корзины
export const removeCustomProductFromCart = createAsyncThunk(
  'customCart/removeCustomProductFromCart',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const customCartSlice = createSlice({
  name: 'customCart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Добавление кастомного блюда в корзину
      .addCase(addCustomProductToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Удаление кастомного блюда из корзины
      .addCase(removeCustomProductFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default customCartSlice.reducer;