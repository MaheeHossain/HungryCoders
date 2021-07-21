const Datastore = require('nedb');

const VanDb = new Datastore({filename:'./database/van.db', autoload: true});

module.exports = VanDb;