import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice'
import shopReducer from "./slices/shopSLice";
import kycRequestsReducer from './slices/kycRequestsSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    shop: shopReducer,
    kycRequests: kycRequestsReducer
  },
});

export default store;
