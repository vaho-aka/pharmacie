import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductState, Item } from '../interfaces';

const initialState: ProductState = {
  products: [],
  product: {
    _id: '',
    name: '',
    price: '',
    category: '',
    countInStock: 0,
    createdAt: '',
    imageUrl: '',
    onSale: false,
  },
  message: '',
  loading: false,
  error: '',
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    GET_PRODUCT_REQUEST(state) {
      state.loading = true;
    },
    GET_PRODUCT_SUCCESS(state, action: PayloadAction<Item[]>) {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    },
    GET_PRODCUT_BY_ID_SUCCESS(state, action: PayloadAction<Item>) {
      state.loading = false;
      state.product = action.payload;
      state.error = '';
    },
    GET_PRODUCT_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productActions = productReducer.actions;
export default productReducer.reducer;
