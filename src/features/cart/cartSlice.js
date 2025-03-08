import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/cart'; // URL для json-server

// Асинхронное действие для загрузки корзины
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Асинхронное действие для добавления товара в корзину
export const addToCart = createAsyncThunk('cart/addToCart', async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
});

// Асинхронное действие для удаления товара из корзины
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Асинхронное действие для обновления количества товара
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }) => {
    const response = await axios.patch(`${API_URL}/${id}`, { quantity });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузка корзины
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Добавление товара в корзину
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Удаление товара из корзины
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // Обновление количества товара
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
        }
      });
  },
});

export default cartSlice.reducer;