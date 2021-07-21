const Datastore = require('nedb');

const UserDb = new Datastore({filename:'./database/user.db', autoload: true});

module.exports = UserDb;