import { configureStore } from '@reduxjs/toolkit';
import stockholderReducer from '../features/stockholders/stockholderSlice';

export default configureStore({
  reducer: {
	  stockholder: stockholderReducer,
  },
});
