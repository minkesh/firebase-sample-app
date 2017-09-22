const {ModelActionInterface} = require('./interface');
const {Interface} = require('../helper');
const CategorySchema = require('../schema/item_category');

class ItemCategory {
    constructor(params) {
        Interface.ensureImplements(this, ModelActionInterface);
        const {businessId, db} = params;
        this.businessId = businessId;
        this.db = db;
    }

    _checkMendatoryFields() {

    }

    insert(insertObj) {
        //check if mendatory fields are present with correct data type
        //and insert the item in db
    }

    update(id, updateObj) {

    }

    remove(id) {

    }
}

module.exports = ItemCategory