
const ERR_INVALID_ARG_VALUE = 'ERR_INVALID_ARG_VALUE';

class InvalidArgumentsError extends Error {

	constructor(message = ERR_INVALID_ARG_VALUE) {
		super(message);
		this.code = ERR_INVALID_ARG_VALUE;
	}

}
module.exports = InvalidArgumentsError;
