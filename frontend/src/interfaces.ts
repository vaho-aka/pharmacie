export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  token: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Item {
  _id: string;
  name: string;
  price: string;
  categoryName: string;
  categoryId: string;
  description: string;
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

export interface ProductState extends State {
  products: Array<Item>;
  catId: string;
  product: Item;
  message: string;
}

export interface UserState extends State {
  userLoggedIn: User;
  users: User[];
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
