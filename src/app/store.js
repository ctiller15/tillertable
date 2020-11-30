import { configureStore } from '@reduxjs/toolkit';
import stockholderReducer from '../features/stockholders/stockholderSlice';
import userReducer from '../features/users/userSlice'

export default configureStore({
  reducer: {
	  stockholder: stockholderReducer,
	  user: userReducer,
  },
});
