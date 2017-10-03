const {Interface} = require('../helper');

const ModelActionInterface = new Interface('ModelAction', ['insert', 'update', 'remove', 'fetch']);
const RequestHandlerInterface = new Interface('RequestHandler', ['validate', 'performOperation']);

module.exports = {
    ModelActionInterface,
    RequestHandlerInterface
};