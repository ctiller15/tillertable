import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { selectStockHolders, selectOwnership, addStockholderAsync, getStockholderData, addStockAsync, updateStockRow } from '../stockholders/stockholderSlice'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, Switch, Collapse, Typography, IconButton, Button, Box, TextField, Select, MenuItem, Input, TableSortLabel } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { VictoryPie, VictoryContainer } from 'victory';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

	const CustomTableCell = ({ row, name, onChange}) => {
	  const classes = useStyles();
	  const { isEditMode } = row;
	  return (
		<TableCell 
			align="left" className={classes.tableCell}>
		  {isEditMode ? (
			<Input
			  value={row[name]}
			  name={name}
			  onChange={e => onChange(e, row)}
			  className={classes.input}
			/>
		  ) : (
			row[name]
		  )}
		</TableCell>
	  );
	};

const CustomRoleTableCell = ({ row, name, onChange}) => {
	  const classes = useStyles();
	  const { isEditMode } = row;
	  return (
		<TableCell 
			align="left">
		  {isEditMode ? (
				<Select 
					value={row.role}
					name={name}
					onChange={e => onChange(e, row)}
					className={classes.input}>
					<MenuItem value="founder">Founder</MenuItem>
					<MenuItem value="investor">Investor</MenuItem>
					<MenuItem value="employee">Employee</MenuItem>
				</Select>
		  ) : row.role }
			
		</TableCell>
	  );
	};

	const headCells = [
		{ id: 'name', numeric: false, label: 'Name'},
		{ id: 'role', numeric: false, label: 'Role'},
		{ id: 'percentOwnership', numeric: true, label: 'Ownership %'}
	];

	const headStockCells = [
		{ id: 'title', numeric: false, label: 'Title'},
		{ id: 'count', numeric: true, label: 'Count'},
		{ id: 'value', numeric: true, label: 'Value'},
		{ id: 'date', numeric: false, label: 'Date'}
	];

	const descendingComparator = (a, b, orderBy) => {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	const getComparator = (order, orderBy) => {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	const EnhancedTableHead = (props) => {
		const { order, orderBy, onRequestSort, skipFirst, headCellsSet, type, stockholderRow } = props;
		const createSortHandler = (property) => (event) => {
			if(type !== 'stock') {
				onRequestSort(event, property);
			} else {
				onRequestSort(event, property, stockholderRow, true);
			}
		};

		return (
			<TableHead>
				<TableRow>
					<React.Fragment>

						{ skipFirst ? <TableCell></TableCell> : null}
					{
						headCellsSet.map((headCell) => (
							<TableCell
								key={headCell.id}
								align={headCell.numeric ? 'right' : 'left'}
								sortDirection={orderBy === headCell.id ? order : false }
							>
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
								</TableSortLabel>
							</TableCell>
						))
					}
					</React.Fragment>
				</TableRow>
			</TableHead>
		);
	}

export const Dashboard = (props) => {

	const [ previous, setPrevious ] = React.useState({});
	const [ categoryToggleOn, toggleCategory ] = useState(false)

	const [ order, setOrder] = React.useState('desc');
	const [ orderBy, setOrderBy] = React.useState('percentOwnership');

	const dispatch = useDispatch();

	const classes = useStyles();

	const stockholders = useSelector(selectStockHolders)
		.map((item) => ({
			...item,
			isEditMode: false,
			isRowOpen: false,
			order: 'asc',
			orderBy: 'title'
		}));

	const ownershipData = useSelector(selectOwnership);

	const [stockholdersData, setStockholdersData] = useState(stockholders);

	const onToggleEditMode = (rowId) => {
		setStockholdersData(state => {
			return stockholdersData.map((row) => {
				if (row.uniqueId === rowId) {
					if(row.isEditMode){
						updateStockholdersRow(row);
						return { ...row, isEditMode: false }	
					}
					return { ...row, isEditMode: true };
				}
				return row;
			});
		});
	};	

	useEffect( () => {
		async function fetchData() {
		const response = await dispatch(getStockholderData())

			const fetchedStockholders = response.payload.fullUserData.map((item) => (
			{
				...item,
				isEditMode: false,
				isRowOpen: false,
				order: 'asc',
				orderBy: 'title'
			}
		));

			setStockholdersData(stableSort(fetchedStockholders, getComparator(order, orderBy)))

		}

		fetchData();

	}, [dispatch, order, orderBy]);

	const togglePieChart = (e) => {
		e.preventDefault();
		toggleCategory(!categoryToggleOn);
	}

	const updateStockholdersRow = async (row) => {
		const response = await dispatch(updateStockRow(row));
		setStockholdersData(stableSort(response.payload.fullUserData, getComparator(order, orderBy)));
	}

	const addStockholderTableRow = async (e) => {
		e.preventDefault();
		const response = await dispatch(addStockholderAsync())
		const tempStockholdersData = [...stockholdersData]
		tempStockholdersData.push(response.payload);
		setStockholdersData(tempStockholdersData);
	}

	const addStockSubTableRow = async (e, ind) => {
		e.preventDefault();
		const response = await dispatch(addStockAsync(ind))
		const tempStockholdersData = JSON.parse(JSON.stringify(stockholdersData));

		tempStockholdersData[response.payload.ind].stocks.push(response.payload.response);
		setStockholdersData(tempStockholdersData);
	}

	const updateStock = (e, ind, stockInd, type) => {
		// Yes, yes, I know, this method is flawed. Normally I'd opt for a deep copy method to break those references. Low on time so I didn't feel like hunting for one that'd solve this particular issue.
		const tempStockholders = JSON.parse(JSON.stringify([...stockholdersData]));
		const tempStock = {...tempStockholders[ind].stocks[stockInd]};
		tempStock[type] = e.target.value;
		tempStockholders[ind].stocks[stockInd] = tempStock;

		setStockholdersData(tempStockholders);
	}

	const setRowOpen = (ind, val) => {
		const newRows = [...stockholdersData];
		newRows[ind].isRowOpen = val;
		setStockholdersData(newRows);
	}

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }

    const value = e.target.value;
    const name = e.target.name;
	  const newRows = stockholdersData.map((oldRow) => {
      if (oldRow.uniqueId === row.uniqueId) {
        return { ...oldRow, [name]: value };
      }
		  return oldRow;
    });

    setStockholdersData(newRows);
  };

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	}

	const handleStockSort = (event, property, row, persist) => {
		const clonedRow = JSON.parse(JSON.stringify(stockholdersData));
		const isAsc = row.orderBy === property && row.order === 'asc';

		const tempRowIndex = clonedRow.findIndex(f => f.uniqueId === row.uniqueId);
		clonedRow[tempRowIndex].order = isAsc ? 'desc' : 'asc';
		clonedRow[tempRowIndex].orderBy = property;

		if(persist){
			const updated = stableSort(clonedRow, getComparator(order, orderBy))
			setStockholdersData(updated);
		} else {
			setStockholdersData(clonedRow);
		}
	}


	const stableSort = (arr, comp) => {
		if(arr.some(s => s.isEditMode)) return arr;
		
		let stabilized = arr.map((el, ind) => [el, ind]);

		stabilized.sort((a, b) => {
			const order = comp(a[0], b[0]);
			if (order !== 0) {
				return order;
			}
			return a[1] - b[1];
		});

		// Sort the subarrays.

			const subStabilized = stabilized.map((elem, ind) => {
				
				const subComp = getComparator(elem[0].order, elem[0].orderBy);

				const stabilizedStocks = elem[0].stocks ? elem[0].stocks.map((stock, ind) => [stock, ind]) : [];

				stabilizedStocks.sort((a, b) => {
					const order = subComp(a[0], b[0]);
					if(order !== 0){
						return order;
					}
					return a[1] - b[1];
				});

				const newElem = JSON.parse(JSON.stringify(elem));

				if(newElem[ind] && newElem[ind].stocks){
					newElem[ind].stocks = stabilizedStocks.map((el) => el[0]);
				}

				return newElem;
			})


		return subStabilized.map((el) => el[0]);
	}

	console.log(stockholdersData);

	return (

		<section className="dashboard">
			<h1>User Dashboard</h1>
			<Grid container spacing={0}>
				<Grid item md={4}>
					<Paper className={classes.root}>
						{/*Toolbar goes here*/}
						<Table 
							aria-label="caption table">
							{/*Enhanced head goes here*/}
							<EnhancedTableHead 
								headCellsSet={headCells}
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
								skipFirst={true}
							/>
							<TableBody>
					  			{stableSort(stockholdersData, getComparator(order, orderBy))
										.map((row, ind) => (
											<React.Fragment>
						  			<TableRow key={row.uniqueId}>
							  			<TableCell className={classes.selectTableCell}>
											{row.isEditMode ? (
							  			<>
											<IconButton
												aria-label="done"
												onClick={() => onToggleEditMode(row.uniqueId)}
											>
								  				<DoneIcon />
											</IconButton>
							  			</>
										) : (
											<IconButton
												aria-label="delete"
												onClick={() => onToggleEditMode(row.uniqueId)}
										  	>
												<EditIcon />
							  				</IconButton>
										)}
						  				</TableCell>
										<CustomTableCell {...{ row, name: "name", onChange}} />
										<CustomRoleTableCell {...{ row, name: "role", onChange }} />
										<TableCell>
											{row.percentOwnership}
										</TableCell>
										<TableCell>
										<IconButton
											size="small"
											onClick={() => setRowOpen(ind, !row.isRowOpen)}
										>
											{row.isRowOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
										</IconButton>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell 
										style={{ paddingBottom: 0, paddingTop: 0 }} 
										colSpan={6}>
										<Collapse 
											in={row.isRowOpen} 
											timeout="auto" 
											unmountOnExit>
											<Typography 
												variant="h6" 
												gutterBottom 
												component="div">
											Stocks
											</Typography>
											<Table size="small">
												<EnhancedTableHead 
													headCellsSet={headStockCells}
													order={order}
													orderBy={orderBy}
													onRequestSort={handleStockSort}
													skipFirst={false}
													stockholderRow={row}
													type={'stock'}
												/>
											<TableBody>
												{!row.isEditMode ? 
													row.stocks.map((stockRow, stockInd) => (
														<TableRow key={`stocks-edit-${ind}-${stockInd}`}>
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
												)) : 
												row.stocks.map((stockRow, stockInd) => (
													<TableRow 
														key={`stocks-${ind}-${stockInd}`}>
														<TableCell 
															component="th" 
															scope="row">
															<TextField 
															value={stockRow.title}
															onChange={(e) => updateStock(e, ind, stockInd, "title")}
													/>
												</TableCell>
												<TableCell>
													<TextField 
														value={stockRow.count} 
														type="number"
														onChange={(e) => updateStock(e, ind, stockInd, "count")}
													/>
												</TableCell>
												<TableCell>
													<TextField
														value={stockRow.value}
														type="number"
														onChange={(e) => updateStock(e, ind, stockInd, "value")}
													/>
												</TableCell>
												<TableCell>
													<TextField
														value={stockRow.date}
														type="date"
														onChange={(e) => updateStock(e, ind, stockInd, "date")}
													/>
												</TableCell>
											</TableRow>))
											}
											<TableRow>
												<TableCell colspan={6}>
													<Box 
														component={Button} 
														width="100%"
														variant="contained"
														startIcon={<AddCircleRoundedIcon />}
														onClick={(e) => addStockSubTableRow(e, ind)}>
														Add stock
													</Box>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</Collapse>
							</TableCell>
						</TableRow>
					</React.Fragment>
					))}
					<TableRow>
					<TableCell colspan={6}>
						<Box 
							component={Button} 
							width="100%"
							variant="contained"
							startIcon={<AddCircleRoundedIcon />}
							onClick={addStockholderTableRow}>
							Add stockholder row
						</Box>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</Paper>
</Grid>
		<Grid 
			item 
			md={1}></Grid>
			<Grid 
				container 
				item 
				md={7}>

			<Grid item component={VictoryPie}
				md={9}
				containerComponent={<VictoryContainer responsive={false}/> }
				colorScale="qualitative"
				data={categoryToggleOn ? ownershipData.category : ownershipData.individual}
			/>
				<Grid 
					item 
					component="section"
					md={3}>
					<h3>Options</h3>
				<span>Show graph by role</span>
				<Switch 
					checked={categoryToggleOn}
					onChange={togglePieChart}
				/>
			</Grid>
		</Grid>
	</Grid>
</section>
	)
}
