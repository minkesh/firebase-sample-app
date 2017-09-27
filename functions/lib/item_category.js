const {ModelActionInterface} = require('./interface');
const {Interface} = require('../helper');
const CategorySchema = require('../schema/item_category');
const _ = require('lodash');

class ItemCategory {
    constructor(params) {
        if (!ItemCategory.implementsInteface) {
            Interface.ensureImplements(this, ModelActionInterface);
            ItemCategory.ensureImplements = true
        }
        const {businessId, db} = params;
        this.businessId = businessId;
        this.db = db;
        this.categoryRefStr = `/businesses/${this.businessId}/category`;
    }

    _childAdded(snap) {
        console.log('ADDED A NEW CHILD', snap.val())
    }

    _childUpdated(snap) {
        console.log('Child Updated', sanp.val())
    }

    _childRemoved(snapShot) {
        //Remove all the items of the category from the business
        console.log('Removed child', snapShot.val())
    }

    insert(insertObj) {
        //check if mendatory fields are present with correct data type
        //and insert the item in db
        if (Array.isArray(insertObj)) {
            const insertKeys = [];
            const updates = {};
            const {categoryRefStr, db} = this;
            const catRef = this.db.ref(this.categoryRefStr);
            _.forEach(insertObj, (obj) => {
                const newKey = catRef.push().key
                updates[newKey] = obj
                insertKeys.push(newKey)
            })
            return catRef.update(updates)
                .then(() => insertKeys)
                .catch(console.error)
        }

        const catRef = this.db.ref(this.categoryRefStr)
        const newCatRef = catRef.push()
        catRef.on('child_added', this._childAdded)
        return newCatRef.set(insertObj)
            .then((res) => newCatRef.key)
            .catch(console.error)
    }

    update(updateObj) {
    }

    remove(deleteObj) {
        //REMOVE ALL THE ITEMS OF THE CATEGORY
        const catRef = this.db.ref(this.categoryRefStr)
        return catRef.child(deleteObj).remove()
            .then((res) => deleteObj)
            .catch(console.error)
    }

    fetch(id) {
        if (id) {
            return this._fetchSingleCategory(id)
        }
        return this._fetchMultipleCategory()
    }

    _fetchSingleCategory(id) {
        const catItemRef = this.db.ref(this.categoryRefStr).child(id)
        return catItemRef.once('value')
         .then((snapShot) => {
            return snapShot.val()
         })
         .catch((err) => {
            console.log('Error fetching category', err)
            return Promise.reject('Error fetching category')
         })
    }

    _fetchMultipleCategory() {
      return this.db.ref(this.categoryRefStr).once('value')
        .then((snapShot) => {
            return snapShot.val()
        })
        .catch((err) => {
            console.log('Error fetching category', err)
            return Promise.reject('Error fetching category')
        })
    }
}

ItemCategory.implementsInteface = false

module.exports = ItemCategory