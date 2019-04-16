const AWSGlobal = require('aws-sdk/global');
const Dynamo = require('aws-sdk/clients/dynamodb');
const StorageController = require('./storage-controller');
const awsDefaultConfig = {
    "accessKeyId": "ACCESS_KEY_ID",
    "secretAccessKey": "SECRET_ACCESS_KEY",
    "region": "eu-west-1"
};

const dynamodb = new Dynamo();

class DynamoDBController extends StorageController {
    constructor (config, region, accountId) {
        super();
        if (typeof config === 'string') {
            AWSGlobal.config.loadFromPath(config);
        } else if (typeof config === 'object') {
            AWSGlobal.config.update(Object.assign({}, awsDefaultConfig, config));
        }
        if (!region) region = AWSGlobal.config.region;
        this.region = region;
        this.accountId = accountId;
    }

    save (id, data) {

    }

    static read (id) {

    }

    static readByEmail (email) {

    }

    static readByLogin (login) {

    }

    static readByFacebookId (facebookId) {

    }

    static list () {

    }
}

const exports = module.exports = DynamoDBController;