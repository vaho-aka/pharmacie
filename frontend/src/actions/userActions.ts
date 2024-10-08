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
      // console.log(error.response.data.error);
      dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(userActions.GET_USER_REQUEST());

    // await axios.get('/api/v1/user/logout');
    dispatch(userActions.USER_LOG_OUT());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
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
      dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
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
    dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
  }
};

export const deleteUser =
  (id: string): AppThunk =>
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
      dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
    }
  };

export const updateUserProfile =
  (id: string, username: string, email: string, password?: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `http://localhost/pharmacie/backend/api/user/update.php?id=${id}`,
        {
          username,
          email,
          password,
        },
        config
      );

      dispatch(userActions.GET_USER_SUCCESS(data));
      localStorage.setItem('connectopia-user-info', JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
    }
  };

export const getUserById =
  (id?: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get<User>(
        `http://localhost/pharmacie/backend/api/user/read_single.php?id=${id}`,
        config
      );
      dispatch(userActions.GET_USER_BY_ID(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
    }
  };

export const updateUserProfileAsAdmin =
  (id: string, isAdmin: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `http://localhost/pharmacie/backend/api/user/update.php?id=${id}`,
        {
          isAdmin,
        },
        config
      );

      dispatch(userActions.GET_USER_BY_ID(data));
      localStorage.setItem('connectopia-user-info', JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(userActions.GET_USER_FAIL(error?.response?.data?.error));
    }
  };
