import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронное действие для регистрации клиента
export const registerClient = createAsyncThunk(
  'client/register',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/clients', clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронное действие для входа клиента
export const loginClient = createAsyncThunk(
  'clients/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/clients', {
        params: {
          email: loginData.email,
          password: loginData.password,
        },
      });

      if (response.data.length > 0) {
        return response.data[0]; // Возвращаем первого найденного пользователя
      } else {
        return rejectWithValue('Пользователь не найден');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронное действие для получения профиля клиента
export const fetchProfile = createAsyncThunk(
    'client/fetchProfile',
    async (clientId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3001/clients/${clientId}`);
        return response.data; // Возвращаем данные профиля
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Асинхронное действие для обновления профиля клиента
export const updateProfile = createAsyncThunk(
    'client/updateProfile',
    async ({ id, profileData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`http://localhost:3001/clients/${id}`, profileData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    logout: (state) => {
      state.client = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(registerClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.client = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = clientSlice.actions;
export default clientSlice.reducer;