const roles = {
	founder: "founder",
	investor: "investor",
	employee: "employee"
}

export const calculateOwnership = (payload) => {
	const ownerShipData = {
		category: [],
		individual: [],
	}

	// This chunk can be consolidated into a single method that loops over the roles.
	// get all founders.
	const founderOwnership = payload.filter(f => f.role === roles.founder).reduce((acc, val) => acc.concat(val.stocks), []).reduce((acc2, val2) => acc2 + Number(val2.count) * Number(val2.value), 0);

	const investorOwnership = payload.filter(f => f.role === roles.investor).reduce((acc, val) => acc.concat(val.stocks), []).reduce((acc2, val2) => acc2 + Number(val2.count) * Number(val2.value), 0);

	const employeeOwnership = payload.filter(f => f.role === roles.employee).reduce((acc, val) => acc.concat(val.stocks), []).reduce((acc2, val2) => acc2 + Number(val2.count) * Number(val2.value), 0);

	// similar deal. Refactor into a single method.
	ownerShipData.category.push({x: roles.founder, y: founderOwnership})
	ownerShipData.category.push({x: roles.investor, y: investorOwnership})
	ownerShipData.category.push({x: roles.employee, y: employeeOwnership})

	// now to calculate each ownership for a given user.
	
	const individualOwnership = payload.map((person) => {
		const ownershipValue = person.stocks.reduce((acc, val) => {
			return acc + Number(val.count) * Number(val.value);
		}, 0);

		return {x: person.name, y: ownershipValue}
	})

	ownerShipData.individual = individualOwnership;

	return ownerShipData;
}

