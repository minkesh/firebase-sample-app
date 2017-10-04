const _ = require('lodash');
const CategorySchema = require('../../schema/item_category');
const Model = require('./model');

/*
    Category Model
*/

class ItemCategory extends Model {
    constructor(params) {
        params.modelName = 'category';
        super(params);
    }

    _childAdded(snap) {
        console.log('ADDED A NEW CHILD', snap.val())
    }

    _childUpdated(snap) {
        console.log('Child Updated', sanp.val())
    }

    _childRemoved(id) {
        console.log('Removed child', snapShot.val())
    }

    insert(insertObj) {
        //check if mendatory fields are present with correct data type
        //and insert the item in db
        if (Array.isArray(insertObj)) {
            const insertKeys = [];
            const updates = {};
            const catRef = this.ref;
            _.forEach(insertObj, (obj) => {
                const newKey = catRef.push().key
                updates[newKey] = obj
                insertKeys.push(newKey)
            })
            return catRef.update(updates)
                .then(() => insertKeys)
                .catch(console.error)
        }

        this.ref.on('child_added', this._childAdded)
        return super.insert(insertObj);
    }

    update(updateObj, id) {
        return super.update(insertObj, id);
    }

    remove(id) {
        this.ref.on('child_removed', () => this._childRemoved(id))
        return super.remove(id);
    }

    fetch(id) {
        if (id) {
            return super.fetch(id);
        }
        return this._fetchMultipleCategory();
    }

    _fetchMultipleCategory() {
      return this.ref.once('value')
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