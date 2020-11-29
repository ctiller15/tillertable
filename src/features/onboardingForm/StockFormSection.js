import { Box, FormControl, TextField, Button, IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const StockFormSection = (props) => {

	return (
	<Grid
		spacing={2}
		container
		component="div"
		key={props.stockInd}
	>
		<Grid container item spacing={2} md={10}>
		<Grid 
			component={FormControl}
			item
			md={6}>
			<TextField
				label="title"
				name={`stock[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.title}
				onChange={(e) => props.updateStockTitle(e, props.ind, props.stockInd)}
			/>
		</Grid>
		<Grid
			component={FormControl}
			item
			md={6}
		>
			<TextField 
				label="stock count"
				type="number"
				name={`stockcount[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.count}
				onChange={(e) => props.updateStockCount(e, props.ind, props.stockInd)}
			/>
		</Grid>
		<Grid
			component={FormControl}
			item
			md={6}>
			<TextField 
				label="stock value"
				type="number"
				name={`stockvalue[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.value}
				onChange={(e) => props.updateStockValue(e, props.ind, props.stockInd)}
			/>
		</Grid>
		<Grid
			component={FormControl}
			item
			md={6}>
			<TextField 
				label="date"
				type="date"
				name={`stockdate[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.date}
				onChange={(e) => props.updateStockDate(e, props.ind, props.stockInd)}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</Grid>
		</Grid>
		<Grid item md={2}>
			<IconButton
				onClick={(e) => props.removeStock(e, props.ind, props.stockInd)}
			>
				<DeleteIcon />
			</IconButton>
		</Grid>
	</Grid>
	)
}
