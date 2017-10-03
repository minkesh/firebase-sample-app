const {Interface} = require('../../helper');
const {RequestHandlerInterface} = require('../interface');
const _ = require('lodash');

class ModelRequestHandler {
    constructor(params) {
        Interface.ensureImplements(this, RequestHandlerInterface);
        const {instance, method, query, body, modelName} = params;
        this.instance = instance;
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

    //todo: Handle multi request
    performOperation() {
        const {method, instance, query, body} = this;
        let resPromise;
        switch(method) {
            case 'GET':
                const {id} = query;
                resPromise = this.instance.fetch(id)
                    .then(cat => {return {result: cat}})
                break;
            case 'PUT':
                const {insertObj} = body;
                resPromise = instance.insert(insertObj)
                    .then(key => {return {result: key}})
                break;
            case 'DELETE':
                const {deleteId} = body;
                let delId = deleteId;
                if (Array.isArray(deleteId)) {
                    delId = deleteId.join(',')
                }
                resPromise = instance.remove(deleteId)
                    .then(() => {return {message: `${delId} REMOVED SUCCESSFULLY`}})
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

module.exports = ModelRequestHandler;