export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface Item {
  _id: string;
  name: string;
  price: string;
  brand: string;
  category: string;
  imageUrl: string;
}

export interface ShippingAddressType {
  address: string;
  city: string;
  neighbour: string;
  paymentMethod: string;
  phoneNumber: string;
}

export interface State {
  loading: boolean;
  error: string;
}

export interface loginType {
  email: string;
  password: string;
}

export interface registerType extends loginType {
  username: string;
}
