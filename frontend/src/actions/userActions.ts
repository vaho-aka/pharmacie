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
        'http://localhost/pharmacie/backend/api/user/read_login.php',
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
  (userName: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post<User>(
        '/api/v1/user/signup',
        {
          userName,
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
