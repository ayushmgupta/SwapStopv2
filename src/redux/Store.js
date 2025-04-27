import {configureStore} from '@reduxjs/toolkit';
import PostReducer from './PostSlice';
import WishListReducer from './WishListSlice';

export const Store = configureStore({
  reducer: {
    post: PostReducer,
    wishlist: WishListReducer,
  },
});
