import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../interfaces';

const userInfoFromStorage: User = localStorage.getItem('medicare-user-info')
  ? JSON.parse(localStorage.getItem('medicare-user-info') || '')
  : {
      id: '',
      username: '',
      email: '',
      password: '',
      createdAt: '',
      token: '',
      isAdmin: false,
    };

const initialState: UserState = {
  userLoggedIn: userInfoFromStorage,
  users: [],
  message: '',
  loading: false,
  error: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    GET_USER_REQUEST(state) {
      state.loading = true;
    },
    GET_USER_SUCCESS(state, action: PayloadAction<User>) {
      state.loading = false;
      state.userLoggedIn = action.payload;
      state.error = '';
    },
    DELETE_USER_SUCCESS(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
    GET_ALL_USERS(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    },
    GET_USER_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    USER_LOG_OUT(state) {
      state.loading = false;
      state.userLoggedIn = {
        id: '',
        username: '',
        createdAt: '',
        password: '',
        email: '',
        isAdmin: false,
        token: '',
      };

      localStorage.removeItem('electroshop-user-info');
    },
  },
});

export const userActions = userReducer.actions;
export default userReducer.reducer;
