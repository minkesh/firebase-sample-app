const ItemCategory = require('../lib/item_category')

function getCategoryInstacne(params) {
    return new ItemCategory(params)
}

module.exports = {getCategoryInstacne}