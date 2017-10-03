const Policy = require('../lib/model/policy');

function getPolicyInstance(params) {
    return new Policy(params);
}

module.exports = {getPolicyInstance}