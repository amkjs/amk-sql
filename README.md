# AMK-SQL

[![CircleCI](https://circleci.com/gh/amkjs/amk-sql.svg?style=svg)](https://circleci.com/gh/amkjs/amk-sql)
[![codecov](https://codecov.io/gh/amkjs/amk-sql/branch/master/graph/badge.svg)](https://codecov.io/gh/amkjs/amk-sql)
[![Known Vulnerabilities](https://snyk.io/test/github/amkjs/amk-sql/badge.svg?targetFile=package.json)](https://snyk.io/test/github/amkjs/amk-sql?targetFile=package.json)

AMK-SQL is a plugin for [express](https://expressjs.com/) using [knex](https://knexjs.org/) to simplify the usage of SQL databases

## Setup
Set the following environment variables
- AMK_SQL_USERNAME
- AMK_SQL_PASSWORD
- AMK_SQL_HOST
- AMK_SQL_DATABASE
- AMK_SQL_CLIENT
- AMK_SQL_POOL_MIN (connection pool, default = 2)
- AMK_SQL_POOL_MAX (connection pool, default = 10)

you can achieve this by choosing one of the options below:
1. use [dotenv](https://github.com/motdotla/dotenv) to set the variables
2. issue the command ``` export AMK_SQL_USERNAME=username ```
3. put it on the ``` .bashrc ``` or ```.bash_profile``` file

## Usage

After setting up environment variables, inherit from this `amk-sql`. refer to code snipet below:

**users.js**
```
const SQL = require('amk-sql');

class Users extends SQL {
	constructor() {
		super('users', 'u')
	}
}
module.exports = Users;
```

using **users.js**
```
Users = require('./users');

const users = new Users();
// this will give you a list of 20 users that are active
const rs = await users.get({active: 1}, { limit=20, orderBy='email'})
```

For more advance usage, please refer to [this](https://github.com/amkjs/amk-sql/wiki/Sample-Usage)

## API

#### ```find(param1, param2, param3)```
---
Simple query with filters

##### Arguments
* **param1** **_(string or object)_** - can be an object to filter
* **param2** **_(string)_** - can be ('param', 'value')
* **param3** **_(string)_** - can be ('param', 'in', 'value')

##### Returns
* **_(Array|Promise)_** - result set in an array or query object

#### ```get(params, { limit, offset, groupBy, orderBy})```
---
Querying dataset with pagination

##### Arguments
* **param** **_(string)_** - query parameter
* **limit** **_(number)_** - limit
* **offset** **_(number)_** - offset (limit is required if offset is set)
* **groupBy** **_(string)_** - group by statement
* **orderBy** **_(string|Object)_** - order by or order by and direction

##### Returns
* **_(Array|Promise)_** - result set in an array or query object

#### ```count(params, { groupBy })```
---
Count the number of entry in a table

##### Arguments
* **param** **_(string)_** - query parameter
* **groupBy** **_(string)_** - group by statement

##### Returns
* **_(Array|Promise)_** - count in an array or query object. suggest to use destructuring like `let [count] = model.count()` to get the value

#### ```ins(params, returning)```
---
function to insert a single row of data

##### Arguments
* **params** **_(object)_** - the row you are going to insert
* **returning** **_(Array|Promise)_** - the row value you want returned i.e. primary keys or the query object

##### Returns
* **_(Array)_** - returns the number of rows inserted or the return value specified on the arguments

#### ```upd(updateValue, params, returning)```
---
function to update rows of data

##### Arguments
* **updateValue** **_(object)_** - value you want to change
* **params** **_(object)_** - the criteria of which row to update
* **returning** **_(string)_** - the row value you want returned i.e. primary keys

##### Returns
* **_(Array|Promise)_** - returns the number of rows inserted or the return value specified on the arguments or the query object

#### ```del(params)```
---
function to delete rows of data

##### Arguments
* **params** **_(object)_** - the criteria of which row to delete

##### Returns
* **_(Array|Promise)_** - returns the number of rows deleted or the query object

#### ```getDB()```
---
returns the knex object with table name

##### Returns
* **_(Promise)_** - similar to `knex(TABLE_NAME)` that can be chained

#### ```getJoinDB()```
---
returns the knex object table name with alias to make it easier to join

##### Returns
* **_(Promise)_** - similar to `knex(TABLE_NAME).as(alias)` that can be chained

#### ```getConn()```
---
returns the knex object
##### Returns
* **_(Promise)_** - similar to `knex()`

## Testing
Work in progress

## Feedback

All bugs, feature requests, pull requests, feedback, etc., are welcome. [Create an issue](https://github.com/amkjs/amk-sql/issues).

## License
[MIT](https://github.com/amkjs/amk-sql/blob/master/LICENSE)
