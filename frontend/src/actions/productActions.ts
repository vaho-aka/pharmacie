import axios from 'axios';
import { productActions } from '../Reducers/productReducer';
import { Item } from '../interfaces';
import { AppThunk } from '../store';

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(productActions.GET_PRODUCT_REQUEST());

    const { data } = await axios.get<Item[]>(
      'http://localhost/pharmacie/backend/api/product/read.php'
    );
    dispatch(productActions.GET_PRODUCT_SUCCESS(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(productActions.GET_PRODUCT_FAIL(message));
  }
};

export const getProductById =
  (id?: string, category_id?: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(productActions.GET_PRODUCT_REQUEST());

      const { data } = await axios.get(
        `http://localhost/pharmacie/backend/api/product/read_single.php?id=${id}&category_id=${category_id}`
      );

      dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productActions.GET_PRODUCT_FAIL(message));
    }
  };
