import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [], 
  messages: [], 
  onlineUsers: [],
  selectedUser: null, 
  isUserLoading: false,
  isMessageLoading: false,
};

// Fetch users
export const getUsers = createAsyncThunk("messages/users", async () => {
  const response = await axios.get(`http://localhost:5000/api/messages/users` , {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }) 
  return response.data;
});

// Fetch messages between two users
export const getMessage = createAsyncThunk(`message/getMessages`, async (userId) => {
  const response = await axios.get(`http://localhost:5000/api/messages/chat/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return response.data;
});

// Send a message
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ selectedUserId, messageData }) => {
    // Include recipient ID in the message data
    const payload = {
      ...messageData,
      receiverId: selectedUserId  // assuming your backend expects this
    };

    const response = await axios.post(
      "http://localhost:5000/api/messages/send",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);


const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // Add reducers if needed (e.g., to set the selected user)
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = [];
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUserLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        
        state.isUserLoading = false;
      })
      .addCase(getMessage.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessageLoading = false;
      })
      .addCase(getMessage.rejected, (state, ) => {
        
        state.isMessageLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setSelectedUser , clearSelectedUser} = messageSlice.actions;
export default messageSlice.reducer;