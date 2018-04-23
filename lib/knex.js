/* eslint no-process-env: "off" */

const knex = require('knex');

let conn = {
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USERNAME || root,
	password: process.env.MYSQL_PASSWORD || '',
	database: process.env.MYSQL_DATABASE || 'default'
};

function connect() {
	return knex({
		client: 'mysql',
		connection: conn,
		pool: {
			min: +process.env.MYSQL_POOL_MIN || 2,
			max: +process.env.MYSQL_POOL_MAX || 10
		}
	});
}

module.exports = connect;
