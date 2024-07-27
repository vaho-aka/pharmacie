import axios from 'axios';
import { productActions } from '../Reducers/productReducer';
import { Item } from '../interfaces';
import { AppThunk } from '../store';

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(productActions.GET_PRODUCT_REQUEST());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get<Item[]>(
      'http://localhost/pharmacie/backend/api/product/read.php',
      config
    );
    dispatch(productActions.GET_PRODUCT_SUCCESS(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(productActions.GET_PRODUCT_FAIL(error?.response?.data?.error));
  }
};

export const getProductById =
  (id?: string, category_id?: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(productActions.GET_PRODUCT_REQUEST());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `http://localhost/pharmacie/backend/api/product/read_single.php?id=${id}&category_id=${category_id}`,
        config
      );

      dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(productActions.GET_PRODUCT_FAIL(error?.response?.data?.error));
    }
  };

export const updateProduct =
  (
    id: string,
    name: string,
    price: string,
    onSale: number,
    description: string,
    countInStock: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(productActions.GET_PRODUCT_REQUEST());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `http://localhost/pharmacie/backend/api/product/update.php?id=${id}`,
        { name, price, onSale, description, countInStock },
        config
      );

      dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(productActions.GET_PRODUCT_FAIL(error?.response?.data?.error));
    }
  };
