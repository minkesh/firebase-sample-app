const functions = require('firebase-functions');
const {firebaseConfig} = require('./config');
const {getCategoryInstacne} = require('./factory/item_category');
const CategoryRequestHandler = require('./lib/request_handler/item_category_handler');

const Database = require('./database/database_service');
const fbDBInstance = Database.getFBDatabaseInstance()

exports.category = functions.https.onRequest((req, res) => {
    const {method, body, query} = req
    const {businessId} = query
    //---------Generic Validation------------//
    if (!businessId) {
        console.error('Business id absent');
        return res.status(400).send({
            success: false,
            message: 'INVALID REQUEST'
        });
    }
    const reqHandler = new CategoryRequestHandler({method, body,
        query, catInstance: getCategoryInstacne({businessId, db: fbDBInstance})})

    if (reqHandler.validate()) {
        reqHandler.action()
        .then((resultObj) => res.status(200).json(
            Object.assign({success: true}, resultObj)))
        .catch((err) => {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        })
    } else {
        res.status(400).json({success: false, message: 'INVALID REQUEST'})
    }
});