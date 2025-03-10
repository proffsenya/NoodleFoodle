// features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/cart'; // URL для корзины

// Асинхронное действие для загрузки корзины
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Асинхронное действие для добавления товара в корзину
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
  }
);

// Асинхронное действие для удаления товара из корзины
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Асинхронное действие для обновления количества товара в корзине
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }) => {
    const response = await axios.patch(`${API_URL}/${id}`, { quantity });
    return response.data;
  }
);

// Создаем срез (slice) для корзины
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    discount: 0, // Добавляем скидку в начальное состояние
    tip: 0, // Добавляем чаевые в начальное состояние
    packagingType: 'standard', // Тип упаковки
    deliveryTime: null, // Время доставки
  },
  reducers: {
    // Редюсер для применения скидки
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
    // Редюсер для установки чаевых
    setTip: (state, action) => {
      state.tip = action.payload;
    },
    // Редюсер для установки типа упаковки
    setPackagingType: (state, action) => {
      state.packagingType = action.payload;
    },
    // Редюсер для установки времени доставки
    setDeliveryTime: (state, action) => {
      state.deliveryTime = action.payload;
    },
  },
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
      // Удаление товара из корзины
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // Обновление количества товара
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      });
  },
});

// Экспортируем редюсеры и действия
export const { applyDiscount, setTip, setPackagingType, setDeliveryTime } = cartSlice.actions;

export default cartSlice.reducer;