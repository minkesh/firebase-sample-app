const {ModelActionInterface} = require('./interface');
const {Interface} = require('../helper');
const CategorySchema = require('../schema/item_category');

class ItemCategory {
    constructor(params) {
        if (!ItemCategory.implementsInteface) {
            Interface.ensureImplements(this, ModelActionInterface);
            ItemCategory.ensureImplements = true
        }
        const {businessId, db} = params;
        this.businessId = businessId;
        this.db = db;
        this.categoryRef = this.db.ref(`/${this.businessId}/category`)
    }

    _childAdded(snapShot) {
        console.log('ADDED A NEW CHILD', snapShot.val())
    }

    _childRemoved(snapShot) {
        console.log('Removed child', snapShot.val())
    }

    _checkMendatoryFields() {

    }

    insert(insertObj) {
        //check if mendatory fields are present with correct data type
        //and insert the item in db
        const newCatRef = this.categoryRef.push()
        this.categoryRef.once('child_added', this._childAdded)
        return newCatRef.set(insertObj)
            .then((res) => newCatRef.key)
            .catch(console.error)
    }

    update(id, updateObj) {

    }

    remove(id) {
        //REMOVE ALL THE ITEMS OF THE CATEGORY
        return this.categoryRef.child(id).remove()
    }

    fetch(id) {
        const catItemRef = this.categoryRef.child(id)
      return catItemRef.once('value')
        .then((snapShot) => {
            return snapShot.val()
        })
        .catch((err) => {
            console.log('Error fetching category', err)
        })
    }

    fetchMultiple() {
      return this.categoryRef.once('value')
        .then((snapShot) => {
            return snapShot.val()
        })
        .catch((err) => {
            console.log('Error fetching category', err)
        })
    }
}

ItemCategory.implementsInteface = false

module.exports = ItemCategory