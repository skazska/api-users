const Validator = require('jsonschema').Validator;
const validator = new Validator();


/**
 * checks schema and throws error
 * @param data
 * @param schema
 * @param errorMessage
 */
function schema (data, schema, errorMessage) {
    if (!validator.validate(data, schema)) throw error('400', errorMessage);
}

/**
 * returns error with status
 * @param {string|number} status
 * @param {string} message
 * @return {Error}
 */
function error (status, message) {
    const err = new Error(message);
    err.status = status.toString();
    return err;
}

module.exports = {
    schema: schema,
    error: error
};