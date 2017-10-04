const firebase = require('firebase-admin');
const serviceAccount = require('../service-account.json');
const Config = require('../config');

//Singleton class for firebase database service
const DatabaseService = function() {
    let _fbDBInstance;
    function _connectFB() {
        console.log('CONNECT')
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: Config.firebaseAppConfig.databaseURL
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