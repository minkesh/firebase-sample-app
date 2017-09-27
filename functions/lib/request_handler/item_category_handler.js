const {Interface} = require('../../helper');
const {RequestHandlerInterface} = require('../interface');

class CategoryRequestHandler {
    constructor(params) {
        Interface.ensureImplements(this, RequestHandlerInterface);
        const {catInstance, method, query, body} = params;
        this.instance = catInstance;
        this.method = method;
        this.query = query;
        this.body = body;
    }

    _validateInsertRequest() {
        return true;
    }

    _validateDeleteRequest() {
        return true;
    }

    _validateFetchRequest() {
        return true;
    }

    _validateUpdateRequest() {
        return true;
    }

    validate() {
        const {method, query, body} = this;
        if (method === 'GET') {
           return this._validateFetchRequest(query);
        } else if (method === 'POST') {
            return this._validateUpdateRequest(body);
        } else if (method === 'DELETE') {
            return this._validateDeleteRequest(body);
        } else if (method === 'PUT') {
            return this._validateInsertRequest(body)
        } else {
            return false;
        }  
    }

    action() {
        const {method, instance, query, body} = this;
        let resPromise;
        switch(method) {
            case 'GET':
                const {categoryId} = query;
                resPromise = this.instance.fetch(categoryId)
                    .then(cat => {return {result: cat}})
                break;
            case 'PUT':
                const {insertObj} = body;
                resPromise = instance.insert(insertObj)
                    .then(key => {return {result: key}})
                break;
            case 'DELETE':
                const {deleteObj} = body;
                resPromise = instance.remove(deleteObj)
                    .then(() => {return {message: 'CATEGORY REMOVED SUCCESSFULLY'}})
                break;
            case 'POST':
                const {updateObj} = body;
                resPromise = instance.update(updateObj)
                    .then(() => {return {message: 'UDPATE SUCCESSFULL'}})
                break;
            default:
                resPromise = Promise.reject({
                    message: 'METHOD NOT SUPPORTED'
                })
        }
        return resPromise
    }
}

module.exports = CategoryRequestHandler;