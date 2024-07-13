export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Item {
  _id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  countInStock: number;
  createdAt: string;
  onSale: boolean;
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

export interface UserState extends State {
  userLoggedIn: User;
}

export interface loginType {
  email: string;
  password: string;
}

export interface registerType extends loginType {
  username: string;
}

export interface CartItem {
  product: Item;
  amount: number;
}

export interface CartState {
  items: CartItem[];
  shippingAddress: ShippingAddressType;
  showCart: boolean;
  totalAmount: number;
}
