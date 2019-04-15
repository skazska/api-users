class User {
    constructor (properties, storageController) {
        this.link = storageController;
        this.properties = {};
    }

    static async auth (credentials) {

    }

    static async load (id) {

    }

    update (properties) {

    }
}

module.exports = User;