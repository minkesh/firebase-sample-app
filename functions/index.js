const functions = require('firebase-functions');
const {firebaseConfig} = require('./config');
const ModelFactory = require('./factory');
const ModelRequestHandler = require('./lib/request_handler/model_handler');
const Database = require('./database/database_service');

const fbDBInstance = Database.getFBDatabaseInstance();

function handleModelRequest(req, res, instance) {
    const {method, body, query} = req
    const reqHandler = new ModelRequestHandler({method, body,
        query, instance})

    if (reqHandler.validate()) {
        reqHandler.performOperation()
        .then((resultObj) => res.status(200).json(
            Object.assign({success: true}, resultObj)))
        .catch((err) => {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        })
    } else {
        res.status(400).json({success: false, message: 'INVALID REQUEST'})
    }
}

function validateBusinessId(req, res) {
    const {businessId} = req.query
    if (!businessId) {
        console.error('Business id absent');
        return res.status(400).send({
            success: false,
            message: 'INVALID REQUEST'
        });
    }
    return businessId;
}

exports.category = functions.https.onRequest((req, res) => {
    const businessId = validateBusinessId(req, res);
    const catInstance = ModelFactory.getCategoryInstance({businessId, db: fbDBInstance});
    handleModelRequest(req, res, catInstance);
});

exports.item = functions.https.onRequest((req, res) => {
    const businessId = validateBusinessId(req, res);
    const itemInstance = ModelFactory.getMenuItemInstance({businessId, db: fbDBInstance});
    handleModelRequest(req, res, itemInstance);
});

exports.business = functions.https.onRequest((req, res) => {
    const businessId = validateBusinessId(req, res);
    const businessInstance = ModelFactory.getBusinessInstance({businessId, db: fbDBInstance});
    handleModelRequest(req, res, businessInstance);
});

exports.policy = functions.https.onRequest((req, res) => {
    const businessId = validateBusinessId(req, res);
    const policyInstance = ModelFactory.getPolicyInstance({businessId, db: fbDBInstance});
    handleModelRequest(req, res, policyInstance);
});
