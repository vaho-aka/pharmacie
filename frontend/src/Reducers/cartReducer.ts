import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState, ShippingAddressType } from '../interfaces';

const cartFromStorage: CartState = localStorage.getItem('electroshop-user-cart')
  ? JSON.parse(localStorage.getItem('electroshop-user-cart') || '')
  : {
      items: [],
      shippingAddress: {
        address: '',
        city: '',
        neighbour: '',
        paymentMethod: '',
        phoneNumber: '',
      },
      showCart: false,
      showModal: false,
      totalAmount: 0,
    };

const initialState: CartState = cartFromStorage;

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_ITEM(state, action: PayloadAction<CartItem>) {
      const price = +action.payload.product.price.split(' ').join('');

      const itemIndex = state.items.findIndex(
        ({ product }) => product._id === action.payload.product._id
      );

      const existItem = state.items[itemIndex];

      if (!existItem) {
        state.totalAmount += price * action.payload.amount;
        state.items = [...state.items, action.payload];
      } else {
        state.totalAmount -= price * existItem.amount;

        const amountFree = existItem.product.countInStock - existItem.amount;

        const amount =
          existItem.product.countInStock >=
          existItem.amount + action.payload.amount
            ? existItem.amount + action.payload.amount
            : existItem.amount + amountFree;

        const updateItem = {
          ...action.payload,
          amount,
        };

        state.totalAmount += price * updateItem.amount;
        state.items[itemIndex] = updateItem;
      }
      localStorage.setItem('medicare-user-cart', JSON.stringify(state));
    },
    REMOVE_ITEM(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        ({ product }) => product._id === action.payload
      );

      const itemToRemove = state.items[itemIndex];

      const price = +itemToRemove.product.price.split(' ').join('');
      state.totalAmount -= price;

      const updatedItem = {
        ...itemToRemove,
        amount: itemToRemove.amount - 1,
      };

      let updatedItems: Array<CartItem>;

      if (updatedItem.amount < 1) {
        state.items = state.items.filter(
          ({ product }) => product._id !== updatedItem.product._id
        );
        // state.totalAmount -= price;
      } else {
        updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;

        state.items = updatedItems;
      }

      if (state.items.length <= 0)
        localStorage.removeItem('medicare-user-cart');
    },
    SHOW_CART(state) {
      state.showCart = !state.showCart;
    },
    SHOW_MODAL(state) {
      state.showModal = !state.showModal;
    },
    ADD_SHIPPING_ADDRESS(state, action: PayloadAction<ShippingAddressType>) {
      state.shippingAddress = action.payload;
      localStorage.setItem('electroshop-user-cart', JSON.stringify(state));
    },
    RESET_CART_AND_SHIPPING_ADDRESS(state) {
      state.shippingAddress = {
        address: '',
        city: '',
        neighbour: '',
        paymentMethod: '',
        phoneNumber: '',
      };
      state.items = [];
    },
  },
});

export const cartActions = cartReducer.actions;
export default cartReducer.reducer;
