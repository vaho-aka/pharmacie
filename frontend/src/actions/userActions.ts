import axios from 'axios';
import { User } from '../interfaces';
import { AppThunk } from '../store';
import { userActions } from '../Reducers/userReducer';

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post<User>(
        'http://localhost/pharmacie/backend/api/user/log_in.php',
        {
          email,
          password,
        },
        config
      );
      dispatch(userActions.GET_USER_SUCCESS(data));
      localStorage.setItem('medicare-user-info', JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(userActions.GET_USER_REQUEST());

    await axios.get('/api/v1/user/logout');
    dispatch(userActions.USER_LOG_OUT());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(userActions.GET_USER_FAIL(message));
  }
};

export const register =
  (username: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post<User>(
        'http://localhost/pharmacie/backend/api/user/sign_up.php',
        {
          username,
          email,
          password,
        },
        config
      );
      dispatch(userActions.GET_USER_SUCCESS(data));
      localStorage.setItem('medicare-user-info', JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };

export const getAllUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(userActions.GET_USER_REQUEST());

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get<User[]>(
      'http://localhost/pharmacie/backend/api/user/read.php',
      config
    );
    dispatch(userActions.GET_ALL_USERS(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(userActions.GET_USER_FAIL(message));
  }
};

export const deleteUser =
  (id?: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.delete<string>(
        `http://localhost/pharmacie/backend/api/user/delete.php?id=${id}`,
        config
      );
      dispatch(userActions.DELETE_USER_SUCCESS(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };
