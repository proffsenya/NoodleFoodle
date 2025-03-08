import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/clients';

// Асинхронные действия
export const registerClient = createAsyncThunk(
  'client/register',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginClient = createAsyncThunk(
  'client/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      const client = response.data.find(
        (c) => c.email === credentials.email && c.password === credentials.password
      );
      if (client) {
        localStorage.setItem('isAuthenticated', 'true');
        return client;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'client/fetchProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'client/updateProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, profileData);
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
    isAuthenticated: false,
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
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
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
        state.isAuthenticated = true;
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
        state.isAuthenticated = true;
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
export default clientSlice.reducer; // Экспорт по умолчанию