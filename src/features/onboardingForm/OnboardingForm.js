import { FormControl, Select, MenuItem, TextField, InputLabel, Button, Box, Accordion, AccordionSummary, AccordionDetails, Grid, IconButton } from '@material-ui/core'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveStockholdersAsync } from '../stockholders/stockholderSlice';
import { logUserIn } from '../users/userSlice';
import { StockFormSection } from './StockFormSection';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		background: 'rgb(237, 96, 100)',
		borderRadius: '2px'
	},
});


export const OnboardingForm = (props) => {
	const buttonClasses = useStyles();
	
	// move these in a separate class. They're reused in at least three different places.
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

	// Not sure what I was thinking. Refactor all of these.
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
					<Grid 
						item 
						md={6} 
						component={Accordion} 
						id={`stockholder-accordion-${ind}`}>
						<Grid 
							container 
							component={AccordionSummary}
							expandIcon={<ExpandMoreIcon />}>
							<Grid 
								item 
								component={FormControl} 
								md={4}>
								<TextField
									id={`stockholder-name${ind}`}
									label="name"
									name={`stockholder-name${ind}`}
									value={row.name}
									onClick={(event) => event.stopPropagation()}
									onFocus={(event) => event.stopPropagation()}
									onChange={(e) => updateName(e, row, ind)}
								/>
							</Grid>

							<Grid item component={FormControl} md={4}>
								<InputLabel>Role</InputLabel>
								<Select
									name={`role${ind}`}
									value={row.role}
									onClick={(event) => event.stopPropagation()}
									onFocus={(event) => event.stopPropagation()}
									onChange={(e) => updateRole(e, row, ind)}
								>
									<MenuItem value="founder">Founder</MenuItem>
									<MenuItem value="investor">Investor</MenuItem>
									<MenuItem value="employee">Employee</MenuItem>
								</Select>
							</Grid>
						</Grid>
						<AccordionDetails>
					<Box 
						component="ul"
						display="flex"
						flexDirection="column"
					>
						<h2>Stock details</h2>
						{
							row.stocks.map((stockUnit, stockInd) => {
								return  <React.Fragment >	
								<StockFormSection 
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
									<hr />
									</React.Fragment>
							})
						}
						<IconButton
							onClick={(e) => addStockRow(e, ind)}
						>
							<AddCircleRoundedIcon />
						</IconButton>
					</Box>
						</AccordionDetails>
					</Grid>
					<IconButton 
						onClick={(e) => removeStockHolder(e, ind)}>
						<DeleteIcon />
					</IconButton>
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
		await dispatch(logUserIn());

		history.push('/dashboard');
	}

	return (


		<Box 
			component="form"
			onSubmit={handleSubmit}
			display="flex"
			flexDirection="column"
			className="onboardingForm"
			alignItems="center"
		>
			{/*Note, none of the fields as of right now have any custom validation.

				The following is still needed:
				- Numeric validation for stock count.
				- Numeric validation with decimals for stock value
			*/}
				<h3>Tell us a bit about your stockholders!</h3>
				<p>Don't worry, you can change this later.</p>
			<ul>
				{rowsDisplay()}
			</ul>
			<IconButton 
				onClick={addInvestorRow}>
				<AddCircleRoundedIcon />
			</IconButton>
			<Button
				classes={{
					root: buttonClasses.root,
				}}
				type="submit"
				value="Submit"
				variant="contained"
				color="primary"
				size="large"
			>Sign up</Button>
		</Box>
	)
}
