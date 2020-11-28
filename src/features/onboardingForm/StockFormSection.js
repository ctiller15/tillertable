import { Box, FormControl, TextField, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export const StockFormSection = (props) => {

	return (
	<Box
		component="div"
		key={props.stockInd}
		display="flex"
		flexDirection="row"
	>
		<FormControl>
			<TextField
				label="title"
				name={`stock[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.title}
				onChange={(e) => props.updateStockTitle(e, props.ind, props.stockInd)}
			/>
		</FormControl>
		<FormControl>
			<TextField 
				label="stock count"
				type="number"
				name={`stockcount[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.count}
				onChange={(e) => props.updateStockCount(e, props.ind, props.stockInd)}
			/>
		</FormControl>
		<FormControl>
			<TextField 
				label="stock value"
				type="number"
				name={`stockvalue[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.value}
				onChange={(e) => props.updateStockValue(e, props.ind, props.stockInd)}
			/>
		</FormControl>
		<FormControl>
			<TextField 
				label="date"
				type="date"
				name={`stockdate[${props.ind}][${props.stockInd}]`}
				value={props.stockUnit.date}
				onChange={(e) => props.updateStockDate(e, props.ind, props.stockInd)}
			/>
		</FormControl>
		<IconButton
			onClick={(e) => props.removeStock(e, props.ind, props.stockInd)}
		>
			<DeleteIcon />
		</IconButton>
	</Box>
	)
}
