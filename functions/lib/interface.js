const {Interface} = require('../helper');

const ModelActionInterface = new Interface('ModelAction', ['insert', 'update', 'remove']);

module.exports = {
    ModelActionInterface
};