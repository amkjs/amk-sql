
const knex = require('./knex');

const PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR = 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR';

let db = knex();

const listener = (err) => {
	if (err.code === PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR) {
		console.log('reconnecting to db . . .'); // eslint-disable-line
		db = knex();
		db.on('query-error', listener);
	}
};

class SQL {

	constructor(table, alias) {
		this.TABLE = table;
		this.JOIN_TABLE = table + ' as ' + alias;
		// don't add listener when using standalone mode
		if (arguments.length > 0) {
			db.on('query-error', listener);
		}
	}



	/**
	* Simple query with filters
	* @param {string} param1 - can be an object to filter
	* @param {string} param2 - can be ('param', 'value')
	* @param {string} param3 - can be ('param', 'in', 'value')
	* @returns {(Array|Promise)} result set in an array or query object
	*/
	find(param1, param2, param3) {
		const query = db(this.TABLE);
		switch(arguments.length) {
			case 1:
				query.where(param1);
				break;
			case 2:
				query.where(param1, param2);
				break;
			case 3:
				query.where(param1, param2, param3);
				break;
			default:
				break;
		}
		return query;
	}

	/**
	* Querying dataset with pagination
	* @param {string} param - query parameter
	* @param {number} limit - limit
	* @param {number} offset - offset
	* @param {string} groupBy - group by statement
	* @param {(string|Object)} orderBy - order by or order by and direction
	* @returns {(Array|Promise)} result set in an array or query object
	*/
	get(params, options = {}) {
		const { limit, offset, groupBy, orderBy} = options;
		const query = db(this.TABLE);

		if (params) query.where(params);
		if (limit) query.limit(limit);
		if (offset) query.offset(offset);
		if (groupBy) query.groupBy(groupBy);
		if (orderBy) {
			if (orderBy.column && orderBy.direction) {
				query.orderBy(orderBy.column, orderBy.direction);
			} else {
				query.orderBy(orderBy);
			}
		}

		return query;
	}

	/**
	* Count the number of entry in a table
	* @param {string} param - query parameter
	* @param {number} limit - limit
	* @param {number} offset - offset
	* @param {string} groupBy - group by statement
	* @param {(string|Object)} orderBy - order by or order by and direction
	* @returns {(Array|Promise)} count in an array or query object
	* suggest to use destructuring like `let [count] = model.count()`
	* to get the value
	*/
	count(params, options = {}) {
		const { limit, offset, groupBy, orderBy} = options;
		const query = db(this.TABLE);

		if (params) query.where(params);
		if (limit) query.limit(limit);
		if (offset) query.offset(offset);
		if (groupBy) query.groupBy(groupBy);
		if (orderBy) {
			if (orderBy.column && orderBy.direction) {
				query.orderBy(orderBy.column, orderBy.direction);
			} else {
				query.orderBy(orderBy);
			}
		}

		query.count('* as count');

		return query;
	}

	/**
	* function to insert a single row of data
	* @param {object} params - the row you are going to insert
	* @returns {(Array|Promise)} the row value you want returned
	* i.e. primary keys or the query object
	*/
	ins(params, returning) {
		return db(this.TABLE).insert(params, returning);
	}

	/**
	* function to update rows of data
	* @param {object} updateValue - value you want to change
	* @param {object} params - the criteria of which row to update
	* @param {string} returning - the row value you want returned i.e. primary keys
	* @returns {(Array|Promise)} returns the number of rows inserted or the
	* return value specified on the arguments or the query object
	*/
	upd(updateValue, params, returning) {
		return db(this.TABLE).update(updateValue, returning).where(params);
	}

	/**
	* function to delete rows of data
	* @param {object} params - the criteria of which row to delete
	* @returns {(Array|Promise)} returns the number of rows deleted or the query object
	*/
	del(params) {
		return db(this.TABLE).delete().where(params);
	}

	/**
	* returns the knex object with table name
	* @returns {Promise} similar to `knex(TABLE_NAME)` that can be chained
	*/
	getDB() {
		return db(this.TABLE);
	}

	/**
	* returns the knex object table name with alias to make it easier to join
	* @returns {Promise} similar to `knex(TABLE_NAME).as(alias)` that can be chained
	*/
	getJoinDB() {
		return db(this.JOIN_TABLE);
	}

	/**
	* returns the knex object
	* @returns {Promise} similar to `knex()`
	*/
	getConn() {
		return db;
	}

}

module.exports = SQL;
