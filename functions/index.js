const functions = require('firebase-functions');
const {firebaseConfig} = require('./config');
const firebase = require('firebase-admin');
const {getCategoryInstacne} = require('./factory/item_category');

let serviceAccount = require('./booking-engine-backend-firebase-adminsdk-a3qhi-329ba68ff0.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: `https://booking-engine-backend.firebaseio.com`
});
const database = firebase.database();

exports.category = functions.https.onRequest((req, res) => {
    const {businessId, categoryId} = req.query
    if (!businessId) {
        console.error('Business id absent');
        return res.status(400).send({
            success: false,
            message: 'INVALID REQUEST'
        });
    }
    const {method, body} = req;
    const itemCategory = getCategoryInstacne({businessId, db: database});
    switch(method) {
        case 'GET':
            let fetchPromise
            if (categoryId) {
                fetchPromise = itemCategory.fetch(categoryId)
            } else {
                fetchPromise = itemCategory.fetchMultiple()
            }
            fetchPromise
            .then((cat) => {
                res.status(200).json({
                    success: true,
                    result: cat
                });
            })
            break;
        case 'PUT':
            itemCategory.insert(body)
            .then((key) => {
                res.status(200).json({
                    success: true,
                    result: key
                });
            })
            break;
        case 'DELETE':
            itemCategory.remove(categoryId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: 'CATEGORY REMOVED SUCCESSFULLY'
                });
            })
            break;
        default:
            res.status(400).json({
                success: false,
                message: 'METHOD NOT SUPPORTED'
            });
    }    
})