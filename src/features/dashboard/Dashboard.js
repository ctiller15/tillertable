import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { selectStockHolders, selectOwnership, addStockholderAsync, getStockholderData, addStockAsync, updateStockRow } from '../stockholders/stockholderSlice'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Switch, Collapse, Typography, IconButton, TableFooter, Button, Box, TextField, Select, MenuItem, Input } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { VictoryPie } from 'victory';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
});

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

	const CustomTableCell = ({ row, name, onChange, ind }) => {
	  const classes = useStyles();
	  const { isEditMode } = row;
	  return (
		<TableCell 
			align="left" className={classes.tableCell}>
		  {isEditMode ? (
			<Input
			  value={row[name]}
			  name={name}
			  onChange={e => onChange(e, row, ind)}
			  className={classes.input}
			/>
		  ) : (
			row[name]
		  )}
		</TableCell>
	  );
	};

const CustomRoleTableCell = ({ row, name, onChange, ind}) => {
	  const classes = useStyles();
	  const { isEditMode } = row;
	  return (
		<TableCell 
			align="left">
		  {isEditMode ? (
							<Select 
								value={row.role}
								name={name}
								onChange={e => onChange(e, row ,ind)}
								className={classes.input}
						>
								<MenuItem value="founder">Founder</MenuItem>
								<MenuItem value="investor">Investor</MenuItem>
								<MenuItem value="employee">Employee</MenuItem>
							</Select>
		  ) : row.role }
			
		</TableCell>
	  );
	};

export const Dashboard = (props) => {

  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = (ind) => {
	  setStockholdersData(state => {
      return stockholdersData.map((row, rowInd) => {
        if (rowInd === ind) {
			if(row.isEditMode){
				updateStockholdersRow(row, ind);
				return { ...row, isEditMode: false }	
			}
			return { ...row, isEditMode: true };
        }
        return row;
      });
    });
  };	

	const dispatch = useDispatch();

	const stockholders = useSelector(selectStockHolders)
		.map((item) => ({
			...item,
			isEditMode: false,
			isRowOpen: false,
		}));

	const ownershipData = useSelector(selectOwnership);

	const [stockholdersData, setStockholdersData] = useState(stockholders);

	useEffect( () => {
		async function fetchData() {
		const response = await dispatch(getStockholderData())

		const fetchedStockholders = response.payload.map((item) => ({
			...item,
			isEditMode: false,
			isRowOpen: false,
		}));

		setStockholdersData(fetchedStockholders);

		}

		fetchData();

	}, [dispatch])

	const [ categoryToggleOn, toggleCategory ] = useState(false)
	const togglePieChart = (e) => {
		e.preventDefault();
		toggleCategory(!categoryToggleOn);
	}

	const updateStockholdersRow = async (row, ind) => {
		const payload = {row, ind}
		const response = await dispatch(updateStockRow(payload));
		console.log(response);
		setStockholdersData(response.payload);
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

	const saveStockholderRow = (e, ind) => {
		// grab the row for that given index.
		console.log(stockholdersData[ind]);
		console.log("Saving!");
	}

	const toggleStockholderEdit = (e, ind) => {
		const tempStockholders = [...stockholdersData];
		tempStockholders.map((m, index) => {
			if(index === ind){
				m.isEditMode = true;
			} else {
				m.isEditMode = false;
			}
			return m;
		})
		setStockholdersData(tempStockholders);
	} 

	const updateStock = (e, ind, stockInd, type) => {
		// Yes, yes, I know, this method is flawed. Normally I'd opt for a deep copy method to break those references.
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

  const onChange = (e, row, ind) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }

    const value = e.target.value;
    const name = e.target.name;
	  const newRows = stockholdersData.map((row, index) => {
      if (index === ind) {
        return { ...row, [name]: value };
      }
      return row;
    });

    setStockholdersData(newRows);
  };

	return (

		<section>
			<h1>User Dashboard</h1>
			<Grid container spacing={0}>
				<Grid item md={4}>
			<Paper className={classes.root}>
				<Table 
					aria-label="caption table">
					<TableHead>
					  <TableRow>
						<TableCell align="left" />
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Role</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {stockholdersData.map((row, ind) => (
						  <React.Fragment>
						  <TableRow key={ind}>
							  <TableCell className={classes.selectTableCell}>
							{row.isEditMode ? (
							  <>
								<IconButton
								  aria-label="done"
								  onClick={() => onToggleEditMode(ind)}
								>
								  <DoneIcon />
								</IconButton>
							  </>
							) : (
							  <IconButton
								aria-label="delete"
								onClick={() => onToggleEditMode(ind)}
							  >
								<EditIcon />
							  </IconButton>
							)}
						  </TableCell>
						  	<CustomTableCell {...{ row, name: "name", onChange, ind }} />
							<CustomRoleTableCell {...{ row, name: "role", onChange, ind }} />
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
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colspan={6}>
						<Collapse in={row.isRowOpen} timeout="auto" unmountOnExit>
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
												<TableRow key={`stocks-${ind}-${stockInd}`}>
											<TableCell component="th" scope="row">
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
				<Grid item md={6}
					display="flex"
					flexDirection="column"
				>
					<h2>graph</h2>

					<Box component="section"
						display="flex"
						flexDirection="row"
						justifyContent="flex-start">
						<section>
						<span>Show graph by role</span>
						<Switch 
							checked={categoryToggleOn}
							onChange={togglePieChart}
						/>
						</section>
						<VictoryPie 
							colorScale="qualitative"
							data={categoryToggleOn ? ownershipData.category : ownershipData.individual}
							width={200}
							height={200}
						/>
					</Box>
				</Grid>
			</Grid>
		</section>
	)
}
