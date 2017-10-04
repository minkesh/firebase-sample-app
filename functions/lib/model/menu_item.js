const Model = require('./model')
const CategorySchema = require('../../schema/Product');

/*
    MenuItem modal
*/

class MenuItem extends Model {
    constructor(params) {
        params.modelName = 'item';
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

module.exports = MenuItem;