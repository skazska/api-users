const crypto = require('crypto');
const storage = require('./dynamodb-conroller');
const {error} = require('./validations');

const hashPasswordFunctions = {
    /**
     *
     * @param {{password: string, salt: string}} options
     * @return {Promise<buffer>}
     */
    '1': (options) => {
        const password = options.password;
        const salt = options.salt;
        const hash = crypto.createHash('sha512');
        hash.update(password + salt, 'utf8');
        return Promise.resolve(hash.digest());
    }
};

const CURRENT_HASH_TYPE_VER = '1';

/**
 *
 * @param {string} type
 * @param {object} options
 * @return {Promise<buffer>}
 */
function hashPassword (type, options) {
    return hashPasswordFunctions[type](options);
}

/**
 * @typedef UserProperties
 * Represents a undefined object
 *
 * @property {string} [id]
 * @property {string} [name] - display name
 * @property {string} [login]
 * @property {buffer} [password] - password hash
 * @property {string} [passwordSalt]
 * @property {string} [passwordHashType] - password hash type i.e. local password security implementation version
 * @property {string} [regDate] - registration date
 * @property {string} [email] -
 * @property {string} [facebookId] -
 */


/**
 * @property {StorageController} link
 * @property {UserProperties} properties
 */
class User {
    constructor (properties, storageController) {
        this.link = storageController;
        this.properties = Object.assign({}, properties);
    }


    static async auth (credentials) {
        //find and check user with credentials
    }

    static async load (id) {
        //load user data by id

    }

    /**
     *
     * @param {string} password
     * @return {Promise<boolean>}
     */
    async checkPassword (password) {
        const currentPasswordHash = await hashPassword(this.properties.passwordHashType, {
            password: password,
            salt: this.properties.passwordSalt
        });
        return currentPasswordHash.compare(this.properties.password) === 0;
    }

    async setPassword (newPassword, currentPassword) {
        if (!currentPassword) currentPassword = '';
        const isAuth = await this.checkPassword(currentPassword);

        if (!isAuth) {
            return error(403, 'current password did not match');
        }

        const salt = crypto.randomBytes(256).toString('utf8');

        const hash = await hashPassword(CURRENT_HASH_TYPE_VER, {
            password: newPassword,
            salt: salt
        });

        return this.update({
            password: hash,
            passwordSalt: salt,
            passwordHashType: CURRENT_HASH_TYPE_VER
        })
    }

    update (properties) {

    }
}

module.exports = User;