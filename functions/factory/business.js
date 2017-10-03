const Business = require('../lib/model/business');

function getBusinessInstance(params) {
    return new Business(params)
}

module.exports = {getBusinessInstance}