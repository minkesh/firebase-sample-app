const MenuItem = require('../lib/model/menu_item');

const getMenuItemInstance = function(params) {
    return new MenuItem(params)
}

module.exports = {getMenuItemInstance}
