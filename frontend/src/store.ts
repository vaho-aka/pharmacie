import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

// * @Reducers
import cartReducer from './Reducers/cartReducer.ts';
import userReducer from './Reducers/userReducer.ts';
import productReducer from './Reducers/productReducer.ts';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    product: productReducer,
  },
  devTools: true,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
