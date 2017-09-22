const functions = require('firebase-functions');
const {firebaseConfig} = require('./config');
const firebase = require('firebase-admin');
const {getCategoryInstacne} = require('./factory/item_category');

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

exports.category = functions.https.onRequest((req, res) => {
    const {businessId} = req.query
    if (!businessId) {
        console.error('Business id absent');
        return res.status(400).send({
            success: false,
            message: 'INVALID REQUEST'
        });
    }
    const itemCategory = getCategoryInstacne({businessId, db: database});
    console.log('Category instance created', itemCategory)
    const {method} = req;
    switch(method) {
        case 'GET':
            res.status(200).json({
                success: true,
                message: 'CATEGORY INSERTED SUCCESSFULLY'
            });
            break;
        default:
            res.status(400).json({
                success: false,
                message: 'METHOD NOT SUPPORTED'
            });
    }    
})