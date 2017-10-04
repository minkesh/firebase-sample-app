const _ = require('lodash');
const Model = require('./model');

class Business extends Model {
    constructor(params) {
        params.modelName = 'business';
        super(params);
        const {db, businessId} = params;
        this.businessId = businessId;
        this.baseBusinessRef = db.ref(`/businesses/${businessId}`);
    }

    insert(insertObj) {
        return this.ref.set(insertObj)
            .then(() => this.businessId)
            .catch(console.error);
    }

    update(updateObj, id) {
        return super.udpate(updateObj, id);
    }

    //Not taking id as an argument since the businessId is present in the request url
    remove() {
        return this.baseBusinessRef.remove()
            .then(() => this.businessId)
            .catch(console.error)
    }

    fetch() {
        return this.ref.once('value')
            .then(snap => snap.val())
    }
}

module.exports = Business;