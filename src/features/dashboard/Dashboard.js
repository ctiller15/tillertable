import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { selectStockHolders, selectOwnership } from '../stockholders/stockholderSlice'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Switch, Collapse, Typography, IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { VictoryPie } from 'victory';


export const Dashboard = (props) => {

	const stockholders = useSelector(selectStockHolders);
	const ownershipData = useSelector(selectOwnership);

	const [ categoryToggleOn, toggleCategory ] = useState(false)
	const togglePieChart = (e) => {
		e.preventDefault();
		toggleCategory(!categoryToggleOn);
	}

	console.log(ownershipData);
/*	const stockholdersDisplay = stockholders.map((row) => {
		
	})
	*/
	//console.log(stockholdersDisplay);

	function Row(props) {
		const { row } = props;
		const [open, setOpen] = useState(false);

		return (
			<React.Fragment>
				<TableRow>
					<TableCell>
						<IconButton
							size="small"
							onClick={() => setOpen(!open)}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell>
						{row.name}
					</TableCell>
					<TableCell>
						{row.role}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Typography variant="h6" gutterBottom component="div">
								Stocks
							</Typography>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Title</TableCell>
										<TableCell>Count</TableCell>
										<TableCell>Value</TableCell>
										<TableCell>Date</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.stocks.map((stockRow, ind) => (
										<TableRow key={ind}>
											<TableCell component="th" scope="row">
												{stockRow.title}
											</TableCell>
											<TableCell>
												{stockRow.count}
											</TableCell>
											<TableCell>
												{stockRow.value}
											</TableCell>
											<TableCell>
												{stockRow.date}
											</TableCell>
										</TableRow>

									))}
								</TableBody>
							</Table>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		)
	}

	return (

		<section>
			<h1>User Dashboard</h1>
			<Grid container spacing={3}>
				<Grid item md={4}>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Name</TableCell>
							<TableCell>Role</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							stockholders.map((row, ind) => (
								<Row key={ind} row={row}/>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
				</Grid>
				<Grid item md={8}>
					<h2>graph</h2>
					<Switch 
						checked={categoryToggleOn}
						onChange={togglePieChart}
					/>
					<VictoryPie 
						data={categoryToggleOn ? ownershipData.category : ownershipData.individual}
					/>
				</Grid>
			</Grid>
		</section>
	)
}
