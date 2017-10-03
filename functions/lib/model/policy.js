const _ = require('lodash');
const Model = require('./model');

class Policy extends Model{
    constructor(params) {
        params.modelName = 'policy';
        super(params);
    }

    insert(insertObj) {
        return super.insert(insertObj);
    }

    update(updateObj, id) {
        return super.update(updateObj, id);
    }

    remove(id) {
        return super.remove(id);
    }

    fetch(id) {
        return super.fetch(id);
    }
}

module.exports = Policy;