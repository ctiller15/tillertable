// Mocked api. Takes all data and gets/posts to a given key in localstorage.

class Api {
	static async post(key, data){
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

	static async updateStockRow(key, data, ind) {
		const savedData = JSON.parse(localStorage.getItem(key));
		savedData[ind] = data;
		await this.post(key, savedData);
		return savedData;
	}
}

export default Api;
