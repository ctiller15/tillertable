import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		loggedIn: false
	},
	reducers: {
		logUserIn: (state) => {
			state.loggedIn = true
		},
		logUserOut: (state) => {
			state.loggedIn = false
		}
	},
});

export const { logUserIn, logUserOut } = userSlice.actions;

export const loggedIn = state => state.user.loggedIn;

export default userSlice.reducer;
