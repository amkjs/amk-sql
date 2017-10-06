
const db = require('./knex')();

class SQL {

	constructor(table, alias) {
		this.TABLE = table;
		this.JOIN_TABLE = table + ' as ' + alias;
	}



	/**
	* Simple query with filters
	* @param {string} param1 - can be an object to filter
	* @param {string} param2 - can be ('param', 'value')
	* @param {string} param3 - can be ('param', 'in', 'value')
	* @returns {object} query object
	*/
	find(param1, param2, param3) {
		let query = db(this.TABLE)
		switch(arguments.length) {
			case 1: {
				query.where(param1);
				break;
			}
			case 2: {
				query.where(param1, param2);
				break;
			}
			case 3: {
				query.where(param1, param2, param3);
				break;
			}
			default: {
				break;
			}
		}
		return query;
	}

	/**
	* Querying dataset with pagination
	* @param {string} param - query parameter
	* @param {string} limit - limit
	* @param {string} offset - offset
	* @returns {object} query object
	*/
	get(param, limit, offset) {
		let query = db(this.TABLE)
		param && query.param(param);
		limit && query.limit(limit);
		offset && query.offset(offset);

		return query;
	}

	/**
	* Count the number of entry in a table
	* @param {string} param - query parameter
	* @returns {object} query object
	*/
	count(param) {
		return db(this.TABLE)
				.count('* as count')
				.then(rs => {
					if(rs.length > 0) {
						return rs[0].count;
					} else {
						return 0;
					}
				})
	}

	insert(params) {
		return db(this.TABLE).insert(params);
	}

	update(updateValue, params) {
		return db(this.TABLE).update(updateValue).where(params);
	}

	delete(id) {
		return db(this.TABLE).delete().where('id', id);
	}

	getDB() {
		return db(this.TABLE);
	}

	getJoinDB() {
		return db(this.JOIN_TABLE);
	}

	getConn() {
		return db;
	}

}

module.exports = SQL;
