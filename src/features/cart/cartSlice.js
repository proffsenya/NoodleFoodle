import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/cart';

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

// Асинхронное действие для обновления количества товара в корзине
export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({ id, quantity }) => {
  const response = await axios.patch(`${API_URL}/${id}`, { quantity });
  return response.data;
});

// Асинхронное действие для удаления товара из корзины
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Асинхронное действие для применения скидки
export const applyDiscount = createAsyncThunk('cart/applyDiscount', async (discountAmount) => {
  return discountAmount;
});

// Асинхронное действие для установки чаевых
export const setTip = createAsyncThunk('cart/setTip', async (tip) => {
  return tip;
});

// Асинхронное действие для установки типа упаковки
export const setPackagingType = createAsyncThunk('cart/setPackagingType', async (packagingType) => {
  return packagingType;
});

// Асинхронное действие для установки времени доставки
export const setDeliveryTime = createAsyncThunk('cart/setDeliveryTime', async (deliveryTime) => {
  return deliveryTime;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    discount: 0,
    tip: 0,
    packagingType: 'standard',
    deliveryTime: 'asap',
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
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      })

      // Обновление количества товара
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })

      // Удаление товара из корзины
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      // Применение скидки
      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
      })

      // Установка чаевых
      .addCase(setTip.fulfilled, (state, action) => {
        state.tip = action.payload;
      })

      // Установка типа упаковки
      .addCase(setPackagingType.fulfilled, (state, action) => {
        state.packagingType = action.payload;
      })

      // Установка времени доставки
      .addCase(setDeliveryTime.fulfilled, (state, action) => {
        state.deliveryTime = action.payload;
      });
  },
});

export default cartSlice.reducer;