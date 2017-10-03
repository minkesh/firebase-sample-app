const ItemCategory = require('../lib/model/item_category')

function getCategoryInstance(params) {
    return new ItemCategory(params)
}

module.exports = {getCategoryInstance}