// Mocked api. Takes all data and gets/posts to a given key in localstorage.

class Api {
	static async post(key, data){
		// Mimicking a post request, possible some sort of mutation would happen here.
		localStorage.setItem(key, JSON.stringify(data))
		await new Promise((r) => setTimeout(r, 1000));
		return data;
	}

	static get(key){
		console.log(key);
	}
}

export default Api;
