import Api from '../../app/api';
import { calculateOwnership } from '../../app/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveStockholdersAsync = createAsyncThunk('stockHolders/saveStockholders', async (stockHoldersData) => {
	const response = await Api.post('stockholderdata', stockHoldersData);
	return response;
});

export const addStockholderAsync = createAsyncThunk('stockHolders/addStockholder', async () => {
	const response = await Api.addNewStockHolder('stockholderdata');
	return response;
});

export const addStockAsync = createAsyncThunk('stockHolders/addStock', async (ind) => {
	const response = await Api.addNewStock('stockholderdata', ind);
	return { response, ind };
});

export const getStockholderData = createAsyncThunk('stockholders/getStockholderData', async () => {
	const response = await Api.get('stockholderdata');
	return response;
});

export const updateStockRow = createAsyncThunk('stockHolders/updateStocks', async(payload) => {
	payload.row.isEditMode = false;
	const response = await Api.updateStockRow('stockholderdata', payload.row, payload.ind);
	return response;
});

export const stockholderSlice = createSlice({
  name: 'stockholder',
  initialState: {
    stockholders: [],
	ownership: {},
  },
  reducers: {
  },
	extraReducers: {
		// Todo: more data munging. Need to be able to have the totals, as well as the total per user.
		[saveStockholdersAsync.fulfilled]: (state, action) => {
			state.stockholders = state.stockholders.concat(action.payload);
			state.ownership = calculateOwnership(action.payload);
		},
		[getStockholderData.fulfilled]: (state, action) => {
			state.stockholders = state.stockholders.concat(action.payload);
			state.ownership = calculateOwnership(action.payload);
		},
		[addStockholderAsync.fulfilled]: (state, action) => {
			state.stockholders = state.stockholders.concat(action.payload);
			state.ownership = calculateOwnership(state.stockholders);
		},
		[addStockAsync.fulfilled]: (state, action) => {
			state.stockholders[action.payload.ind].stocks.push(action.payload.response);		
		},
		[updateStockRow.fulfilled]: (state, action) => {
			state.stockholders = action.payload;
			state.ownership = calculateOwnership(action.payload);
		}
	}
});

export const selectStockHolders = state => state.stockholder.stockholders;
export const selectOwnership = state => state.stockholder.ownership;

export default stockholderSlice.reducer;

