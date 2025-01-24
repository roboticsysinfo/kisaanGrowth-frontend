import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice'
import shopReducer from "./slices/shopSLice";
import kycRequestsReducer from './slices/kycRequestsSlice';
import farmersReducer from './slices/farmerSlice'
import subCategoryReducer from './slices/subCategorySlice'
import adminReducer from './slices/adminSlice'

const store = configureStore({
  reducer: {
    admins: adminReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    products: productReducer,
    shop: shopReducer,
    kycRequests: kycRequestsReducer,
    farmers: farmersReducer,
  },
});

export default store;
