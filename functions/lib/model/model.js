//Abstract class for the CRUD operations
class Model {
    constructor(params) {
        const {businessId, db, modelName} = params;
        this.ref = db.ref(`businesses/${businessId}/${modelName}`);
    }

    insert(insertObj) {
        const newItemRef = this.ref.push();
        return newItemRef.set(insertObj)
            .then(() => newItemRef.key)
            .catch(console.error)
    }

    remove(id) {
        return this.ref.child(id).remove()
            .then(() => id)
            .catch(console.error)
    }

    fetch(id) {
        return this.ref.child(id).once('value')
            .then(snapShot => snapShot.val())
            .catch(console.error)
    }

    update(updateObj, id) {
        return this.ref.child(id).update(updateObj)
            .then(snapShot => snapShot.val())
            .catch(console.error)
    }    
}

module.exports = Model;