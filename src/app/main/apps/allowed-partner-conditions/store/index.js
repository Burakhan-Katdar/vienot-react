import { combineReducers } from '@reduxjs/toolkit';
// import order from './orderSlice';
// import orders from './ordersSlice';
import product from './productSlice';
import products from './competitionsSlice';

const reducer = combineReducers({
  products,
  product,
  // orders,
  // order,
});

export default reducer;
