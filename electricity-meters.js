// this is our
module.exports = function (pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query('SELECT * FROM street');
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		const meterID = await pool.query('SELECT * FROM street WHERE id = $1', [streetId]);
		const meter = await pool.query('SELECT street_number, balance FROM electricity_meter WHERE street_id = $1', [meterID]);
		return meter;

	}

	// return all the appliances
	async function appliances() {
		const applian = await pool.query('SELECT * FROM appliance');
		return applian.rows;
	}

	// increase the meter balance for the meterId supplied
	//(use upate with where)
	async function topupElectricity(meterId, units) {
		// const topUpMeter = await pool.query('SELECT id FROM electricity_meter WHERE id = $1', [meterId]);
		const topUpUnits = await pool.query('UPDATE electricity_meter SET newBalnace = SUM(balance,$1) WHERE id = $2', [units, meterId]);
		return topUpUnits;


	}

	// return the data for a given balance
	async function meterData(meterId) {
		const dataMeter = await pool.query('SELECT * FROM electricity_meter WHERE id = $1',[meterId]);
		return dataMeter;

	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		const useUnits = await pool.query('UPDATE electricity_meter SET balance = $1 WHERE id = $2', [units, meterId]);
		// const useUnits = await pool.query('SELECT id FROM electricity_meter WHERE id=$1 SET balance SUM(balance,$2)', [meterId, units]);
		return useUnits;
	}

	//return the meter with the lowest balance. 
	//Return the meter_id, balance, street_number and the street_name for the given meter. 
	//(order by, join, limit 1)
	async function lowestBalanceMeter() {
		const lowest = await pool.query('SELECT name FROM street JOIN electricity_meter ON electricity_meter.street_id = street.id ORDER BY id ASC LIMIT 1');
		return lowest;
		
	}

	//Return the street name & totalBalance for the street 
	//with the highest total balance 
	//(group by + sum + order by, limit 1)
	async function highestBalanceStreet() {
		const highest = await pool.query('SELECT sum(balance) as total FROM electricity_meter JOIN street on street.id = electricity_meter.street_id group by name ORDER BY DESC LIMIT 1');
		return highest;
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		lowestBalanceMeter,
		highestBalanceStreet
	}


}