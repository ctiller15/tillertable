import Api from '../../app/api';
import { calculateOwnership } from '../../app/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveStockholdersAsync = createAsyncThunk('stockHolders/saveStockholders', async (stockHoldersData) => {
	const response = await Api.post('stockholderdata', stockHoldersData);
	return response;
});

export const stockholderSlice = createSlice({
  name: 'stockholder',
  initialState: {
    stockholders: [],
	ownership: {},
  },
  reducers: {
	
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
		state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
	extraReducers: {
		// Todo: more data munging. Need to be able to have the totals, as well as the total per user.
		[saveStockholdersAsync.fulfilled]: (state, action) => {
			console.log(action);
			state.stockholders = state.stockholders.concat(action.payload);
			state.ownership = calculateOwnership(action.payload);
		}
	}
});

//export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};*/


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;
export const selectStockHolders = state => state.stockholder.stockholders;
export const selectOwnership = state => state.stockholder.ownership;

export default stockholderSlice.reducer;

