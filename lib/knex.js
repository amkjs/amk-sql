/* eslint no-process-env: "off" */

const knex = require('knex');

const client = process.env.AMK_SQL_CLIENT;

let conn;
let testMode = false;

switch(client) {
	case 'sqlite3':
		conn = {
			filename: process.env.AMK_SQL_FILENAME
		};
		break;
	case 'pg':
	case 'mysql':
		conn = {
			host: process.env.AMK_SQL_HOST || 'localhost',
			user: process.env.AMK_SQL_USERNAME || root,
			password: process.env.AMK_SQL_PASSWORD || '',
			database: process.env.AMK_SQL_DATABASE || 'default'
		};
		break;
	case 'test':
		testMode = true;
		break;
	default:
		throw new Error(client, 'not supported');
}


function connect() {
	if (testMode) {
		return knex({ client: 'mysql' });
	} else {
		return knex({
			client,
			connection: conn,
			pool: {
				min: +process.env.AMK_SQL_POOL_MIN || 2,
				max: +process.env.AMK_SQL_POOL_MAX || 10
			}
		});
	}
}

module.exports = connect;
