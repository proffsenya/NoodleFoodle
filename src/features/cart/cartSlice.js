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
    return { id }; // Возвращаем объект, чтобы в reducer было проще обработать
  });

// Асинхронное действие для обновления количества товара
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }, { rejectWithValue, getState }) => {
    try {
      const item = getState().cart.items.find((item) => item.id === id);
      if (!item) throw new Error('Item not found');

      const updatedItem = { ...item, quantity }; // Обновляем количество

      const response = await axios.put(`${API_URL}/${id}`, updatedItem); // Используем PUT
      return response.data; // Возвращаем обновленный товар
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating item');
    }
  }
);

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
  reducers: {
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
  extraReducers: (builder) => {
    builder
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
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      })
      // Обновление количества товара
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // Обновляем весь объект
        }
      })
  },
});

export const { applyDiscount, setTip, setPackagingType, setDeliveryTime } = cartSlice.actions;
export default cartSlice.reducer;