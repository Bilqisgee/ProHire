import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {io} from "socket.io-client";



const BASE_URL = "http://localhost:5000"


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    socket: null,
};

export const signupUser = createAsyncThunk('/authen/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/authen/signup`, formData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Signup failed");
        }
    }
);

export const loginUser = createAsyncThunk('/authen/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/authen/login`, formData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

export const checkAuth = createAsyncThunk('/authen/checkauth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/authen/checkauth`, {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
                }
            });
            console.log('Authentication check response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Authentication check error:', error);
            return rejectWithValue(error.response?.data || "Authentication check failed");
        }
    }
);


export const logoutUser = createAsyncThunk('/auth/logout',
   async() => {
    const response = await axios.post(`http://localhost:5000/api/authen/logout`, {}, {
        withCredentials: true,
    }
);
    return response.data;
   }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      connectSocket: (state) => {
        if (!state.user || (state.socket && state.socket.connected)) return;
        const socket = io(BASE_URL, {
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });
socket.on('connect', () => {
console.log('Socket connected:', socket.id);
})
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

        state.socket = socket;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
          state.socket.disconnect();
          state.socket = null;
      }
  }
    },
    extraReducers: (builder) => {
      builder
        .addCase(signupUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signupUser.fulfilled, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(signupUser.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log(action);
  
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
          if (action.payload.success) {
            const socket = io(BASE_URL, {
                withCredentials: true,
                autoConnect: true,
            });
            socket.on('connect', () => {
              console.log('Socket connected after login:', socket.id);
          });
            state.socket = socket;
        }
        })
        .addCase(loginUser.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;


          if(action.payload.success && !state.socket){
            const socket = io(BASE_URL, {
                withCredentials: true,
                autoConnect: true,
            });
            
            socket.on('connect', () => {
              console.log('Socket connected after auth check:', socket.id);
            })

            state.socket = socket;
          } 
        })
        .addCase(checkAuth.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;

          if (state.socket) {
            state.socket.disconnect();
            state.socket = null;
        }
        });
    },
  });
  
export const { setUser, connectSocket, disconnectSocket } = authSlice.actions;
export default authSlice.reducer;







