
const knex = require('knex');

let db;

module.exports = function () {
	if (db) {
		return db;
	} else {
		let conn = {
			host: process.env.MYSQL_HOST || 'localhost',
			user: process.env.MYSQL_USERNAME || root,
			password: process.env.MYSQL_PASSWORD || '',
			database: process.env.MYSQL_DATABASE || 'default'
		};
		db = knex({
			client: 'mysql',
			connection: conn
		});
		return db;
	}
}
