// Mocked api. Takes all data and gets/posts to a given key in localstorage.
import { v4 as uuidv4 } from 'uuid';

class Api {
	// This will be extremely inefficient since it has to check over each item
	// in the table every single time.
	// The ideal solution would have two separate tables
	// one for stockholders and one for stocks.
	// They would be updated individually.
	static async post(key, data){
		data = data.map(m => {
			if(!m.uniqueId){
				m.uniqueId = uuidv4();
			}

			if(m.stocks) {
				m.stocks = m.stocks.map(stock => {
					if(!stock.uniqueId){
						stock.uniqueId = uuidv4();
					}

					return stock;
				})
			}

			return m;
		});
		//
		// Mimicking a post request, possible some sort of mutation would happen here.
		localStorage.setItem(key, JSON.stringify(data))
		await new Promise((r) => setTimeout(r, 1000));
		return data;
	}

	static async get(key){
		const data = JSON.parse(localStorage.getItem(key));
		await new Promise((r) => setTimeout(r, 1000));
		return data;
	}

	static async addNewStockHolder(key) {
		const newHolder = {name: '', role: '', stocks: []};
		const savedData = JSON.parse(localStorage.getItem(key));
		savedData.push({name: '', role: '', stocks: []})
		await this.post(key, savedData);
		return newHolder;

	}

	static async addNewStock(key, ind) {
		const newStock = {title: '', count: 0, value: 0, date: ''};
		const savedData = JSON.parse(localStorage.getItem(key));
		savedData[ind].stocks.push(newStock);
		await this.post(key, savedData);
		return newStock;
	}

	static async updateStockRow(key, row) {
		const savedData = JSON.parse(localStorage.getItem(key));
		const updatedInd = savedData.findIndex(f => f.uniqueId === row.uniqueId);
		savedData[updatedInd] = row;
		await this.post(key, savedData);
		return savedData;
	}
}

export default Api;
