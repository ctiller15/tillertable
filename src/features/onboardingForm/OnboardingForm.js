import { FormControl, Select, MenuItem, TextField, InputLabel, Button, Box } from '@material-ui/core'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveStockholdersAsync } from '../stockholders/stockholderSlice';
import { StockFormSection } from './StockFormSection';
import { useHistory } from 'react-router-dom';

export const OnboardingForm = (props) => {
	const stock = {
		title: '',
		count: 0,
		value: 0,
		date: '',
	}

	const emptyRow = {
		name: '',
		role: '',
		stocks: [{...stock}]
	}

	const dispatch = useDispatch();

	const generateEmptyRow = () => {
		return {
			name: '',
			role: '',
			stocks: [{...stock}]
		}
	}

	const [rows, updateRows] = useState([emptyRow]);

	const history = useHistory();

	const addInvestorRow = () => {
		const tempRows = [...rows];
		tempRows.push(generateEmptyRow());
		updateRows(tempRows);
	}

	const removeStockHolder = (e, ind) => {
		e.preventDefault();
		
		const newArr = [...rows];
		newArr.splice(ind, 1);

		updateRows(newArr);
	}

	const removeStock = (e, ind, stockInd) => {
		e.preventDefault();

		const newArr = [...rows];
		newArr[ind].stocks.splice(stockInd, 1);

		updateRows(newArr);
	}

	const addStockRow = (e, ind) => {
		e.preventDefault();
		const newArr = [...rows];
		const tempStocks = [...newArr[ind].stocks]
		tempStocks.push({...stock});

		newArr[ind].stocks = tempStocks;
		updateRows(newArr);
	}

	const updateName = (e, row, ind) => {
		e.preventDefault();
		row.name = e.target.value;
		let tempRows = [...rows];

		tempRows[ind] = row;

		updateRows(tempRows);
	}

	const updateRole = (e, row, ind) => {
		row.role = e.target.value;
		let tempRows = [...rows];
		tempRows[ind] = row;

		updateRows(tempRows);
	}

	// Easy refactor for all of these. Can rewrite to just be one function that modifies a given property.
	// Consider if time permits.

	const updateStockTitle = (e, rowInd, stockInd) => {
		let tempRows = [...rows];
		tempRows[rowInd].stocks[stockInd].title = e.target.value;
		updateRows(tempRows);
	}

	const updateStockCount = (e, rowInd, stockInd) => {
		let tempRows = [...rows];
		tempRows[rowInd].stocks[stockInd].count = e.target.value;
		updateRows(tempRows);
	}

	const updateStockValue = (e, rowInd, stockInd) => {
		let tempRows = [...rows];
		tempRows[rowInd].stocks[stockInd].value = e.target.value;
		updateRows(tempRows);
	}

	const updateStockDate = (e, rowInd, stockInd) => {
		let tempRows = [...rows];
		tempRows[rowInd].stocks[stockInd].date = e.target.value;
		updateRows(tempRows);
	}

	const rowsDisplay = () => {
		return rows.map((row, ind) => {
			return (
				<Box
					component="li"
					key={`stockholder-${ind}`}
					display="flex"
					flexDirection="row"
					justifyContent="center"
				>
					<FormControl>
						<TextField
							id={`stockholder-name${ind}`}
							label="name"
							name={`stockholder-name${ind}`}
							value={row.name}
							onChange={(e) => updateName(e, row, ind)}
						/>
					</FormControl>

					<FormControl>
						<InputLabel>Role</InputLabel>
						<Select
							name={`role${ind}`}
							value={row.role}
							onChange={(e) => updateRole(e, row, ind)}
						>
							<MenuItem value="founder">Founder</MenuItem>
							<MenuItem value="investor">Investor</MenuItem>
							<MenuItem value="employee">Employee</MenuItem>
						</Select>
					</FormControl>
					<Box 
						component="ul"
						display="flex"
						flexDirection="column"
					>
						<h2>Stock details</h2>
						{
							row.stocks.map((stockUnit, stockInd) => {
								return <StockFormSection 
									key={`stock-${ind}-${stockInd}`}	
									ind={ind}
										stockInd={stockInd}
										stockUnit={stockUnit}
										removeStock={removeStock}
										updateStockDate={updateStockDate}
										updateStockTitle={updateStockTitle}
										updateStockCount={updateStockCount}
										updateStockValue={updateStockValue}
									/>
							})
						}
						<Button
							onClick={(e) => addStockRow(e, ind)}
						>Add stock</Button>
					</Box>
					<Button onClick={(e) => removeStockHolder(e, ind)}>Remove StockHolder</Button>
				</Box>
			)
			});
		}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData(e.target);
		for(let item of data.entries()){
			console.log(item);
		}

		await dispatch(saveStockholdersAsync(rows));

		history.push('/dashboard');
	}

	return (


		<Box 
			component="form"
			onSubmit={handleSubmit}
			display="flex"
			flexDirection="column">
			{/*Note, none of the fields as of right now have any custom validation.

				The following is still needed:
				- Numeric validation for stock count.
				- Numeric validation with decimals for stock value
			*/}
			<ul>
				{rowsDisplay()}
			</ul>
			<Button onClick={addInvestorRow}>Add StockHolder</Button>
			<Button
				type="submit"
				value="Submit"
			>Sign up</Button>
		</Box>
	)
}
