const firebase = require('firebase-admin');
const serviceAccount = require('../service-account.json');

const DatabaseService = function() {
    let _fbDBInstance;
    function _connectFB() {
        console.log('CONNECT')
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: `https://booking-engine-backend.firebaseio.com`
        });
        return firebase.database();
    }

    return {
        getFBDatabaseInstance: function() {
            if (!_fbDBInstance) {
                _fbDBInstance = _connectFB()
            }
            return _fbDBInstance
        }
    }
}()

module.exports = DatabaseService