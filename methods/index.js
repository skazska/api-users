const schema = require('../schemas/user');
const {schema: validate} = require('../services/validations');

function create (data) {
    validate(data, schema, 'User data scheme mismatch');


}

const exports = module.exports = {
    create: create

};