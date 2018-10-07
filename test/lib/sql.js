
const { expect } = require('chai');
const SQL = require('../../lib/sql');
const TABLE_NAME = 'test_table';

describe('SQL', () => {
	describe('Testing find', () => {
		const expectedQuery = 'select * from `test_table` where `id` = 1';
		it('Should find by id if parameter is {id: 1}', () => {
			const sql = new SQL(TABLE_NAME);
			const query = sql.find({id: 1});
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should find by id if parameter is (`id`, 1)', () => {
			const sql = new SQL(TABLE_NAME);
			const query = sql.find('id', 1);
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should find by id if parameter is (`id`, `=`, 1)', () => {
			const sql = new SQL(TABLE_NAME);
			const query = sql.find('id', '=', 1);
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should throw an error if function has more then 3 argument', () => {
			const sql = new SQL(TABLE_NAME);
			const fn = () => { sql.find('id', '=', 1, 'extra'); };
			expect(fn).to.throw();
		});
	});
	describe('Testing get', () => {
		it('Should select by id if only params is inputted', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1';
			const sql = new SQL(TABLE_NAME);
			const	query = sql.get({ id: 1});
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should contain limit if limit is inputted', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1 limit 1';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get({ id: 1}, { limit: 1 });
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should contain offset if offset is inputted', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1 limit 1 offset 1';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get({ id: 1}, { offset: 1, limit: 1 });
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should throw an error if only offset is inputted', () => {
			const sql = new SQL(TABLE_NAME);
			const fn = () => { sql.get({ id: 1}, { offset: 1 }); };
			expect(fn).to.throw(Error);
		});
		it('Should contain groupBy if groupBy is inputted', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1 group by `id`';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get({ id: 1}, { groupBy: 'id' });
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should order by descending if direction is given', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1 order by `id` desc';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get({ id: 1 }, { orderBy: { column: 'id', direction: 'desc' } });
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should order by ascending if direction is ascending', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1 order by `id` asc';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get({ id: 1 }, { orderBy: { column: 'id', direction: 'asc' } });
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should order by fieldname if no direction or column name is given', () => {
			const expectedQuery = 'select * from `test_table` where `id` = 1 order by `id` asc';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get({ id: 1 }, { orderBy: 'id' });
			expect(query.toString()).to.be.equal(expectedQuery);
		});
		it('Should return all rows if params is not supplied', () => {
			const expectedQuery = 'select * from `test_table`';
			const sql = new SQL(TABLE_NAME);
			const query = sql.get();
			expect(query.toString()).to.be.equal(expectedQuery);
		});
	});
	describe('SQL', () => {
		describe('Testing count', () => {
			it('Should count the number of rows of the whole table', () => {
				const expectedQuery = 'select count(*) as `count` from `test_table`';
				const sql = new SQL(TABLE_NAME);
				const query = sql.count();
				expect(query.toString()).to.be.equal(expectedQuery);
			});
			it('Should count the number of rows of if param if { status: 1 }', () => {
				const expectedQuery = 'select count(*) as `count` from `test_table` ' +
					'where `status` = 1';
				const sql = new SQL(TABLE_NAME);
				const	query = sql.count({ status: 1 });
				expect(query.toString()).to.be.equal(expectedQuery);
			});
			it('Should count the number of rows if group by id', () => {
				const expectedQuery = 'select count(*) as `count` from `test_table` ' +
					'group by `id`';
				const sql = new SQL(TABLE_NAME);
				const	query = sql.count(null, { groupBy: 'id' });
				expect(query.toString()).to.be.equal(expectedQuery);
			});
		});
	});
});
