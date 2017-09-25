const {Interface} = require('../helper');

const ModelActionInterface = new Interface('ModelAction', ['insert', 'update', 'remove', 'fetch']);

module.exports = {
    ModelActionInterface
};