
const { expect } = require('chai');
const validator = require('../../lib/validator');
const InvalidArgumentsError = require('../../lib/invalid_arguments_error');

const NO_PARAMS = 'params should be an object';
const NO_PARAM = 'param should not be null';
const NO_TABLE = 'table name or alias should be a string';
const NO_UPD_ARGS = 'updateValue or params cannot be null';
const NOT_NULL = 'param should not be null';
const NOT_STRING = 'param should be string';

describe('SQL Validator', () => {
	describe('Testing validateParams', () => {
		it('Should throw an error if params is null', () => {
			let err;
			try {
				validator.validateParams();
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NO_PARAMS);
		});
		it('Should not throw an error if params is an object', () => {
			let err;
			try {
				validator.validateParams({});
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
	});
	describe('Testing validateParam', () => {
		it('Should throw an error if param is null', () => {
			let err;
			try {
				validator.validateParam();
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NO_PARAM);
		});
		it('Should throw an error if param is a string', () => {
			let err;
			try {
				validator.validateParam(1);
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NOT_STRING);
		});
		it('Should not throw an error when param is a string', () => {
			let err;
			try {
				validator.validateParam('test');
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
		it('Should be able to accept multiple params', () => {
			let err;
			try {
				validator.validateParam('test1', 'test2');
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
	});
	describe('Testing validateTable', () => {
		it('Should throw an error if param is null', () => {
			let err;
			try {
				validator.validateTable();
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NO_TABLE);
		});
		it('Should throw an error if param is a string', () => {
			let err;
			try {
				validator.validateTable(1);
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NO_TABLE);
		});
		it('Should not throw an error when param is a string', () => {
			let err;
			try {
				validator.validateTable('test');
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
		it('Should be able to accept multiple params', () => {
			let err;
			try {
				validator.validateTable('test1', 'test2');
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
	});
	describe('Testing validateObject', () => {
		it('Should throw an error if param is null', () => {
			let err;
			try {
				validator.validateObject();
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NO_UPD_ARGS);
		});
		it('Should throw an error if param is a string', () => {
			let err;
			try {
				validator.validateObject(1);
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NO_UPD_ARGS);
		});
		it('Should not throw an error when param is a string', () => {
			let err;
			try {
				validator.validateObject({});
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
		it('Should be able to accept multiple params', () => {
			let err;
			try {
				validator.validateObject({}, {});
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
	});
	describe('Testing validateNotNull', () => {
		it('Should throw an error if params is null', () => {
			let err;
			try {
				validator.validateNotNull();
			} catch (e) {
				err = e;
			}
			expect(err).to.be.instanceOf(InvalidArgumentsError);
			expect(err.message).to.be.equal(NOT_NULL);
		});
		it('Should not throw an error if params is not null', () => {
			let err;
			try {
				validator.validateNotNull({});
			} catch (e) {
				err = e;
			}
			expect(err).to.be.undefined;
		});
	});
});
