
const InvalidArgumentsError = require('./invalid_arguments_error');

const NO_PARAMS = 'params should be an object';
const NO_PARAM = 'param should not be null';
const NO_TABLE = 'table name or alias should be a string';
const NO_UPD_ARGS = 'updateValue or params cannot be null';
const NOT_NULL = 'param should not be null';
const NOT_STRING = 'param should be string';

const validateParams = (params) => {
	if (typeof params != 'object') {
		throw new InvalidArgumentsError(NO_PARAMS);
	}
};

const validateParam = (...args) => {
	if (args.length <= 0) {
		throw new InvalidArgumentsError(NO_PARAM);
	}
	args.forEach((arg) => {
		if(typeof arg != 'string') {
			throw new InvalidArgumentsError(NOT_STRING);
		}
	});
};

const validateTable = (...args) => {
	_validate(args, 'string', NO_TABLE);
};

const validateObject = (...args) => {
	_validate(args, 'object', NO_UPD_ARGS);
};

const validateNotNull = (value) => {
	if (!value) {
		throw new InvalidArgumentsError(NOT_NULL);
	}
};

const _validate = (args=[], type, error) => {
	if (args.length <= 0) {
		throw new InvalidArgumentsError(error);
	}
	args.forEach((arg) => {
		if(typeof arg != type) {
			throw new InvalidArgumentsError(error);
		}
	});
};

module.exports = {
	validateParams,
	validateParam,
	validateTable,
	validateObject,
	validateNotNull
};
