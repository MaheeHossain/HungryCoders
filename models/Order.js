const Datastore = require('nedb');

const OrderDb = new Datastore({filename:'./database/order.db', autoload: true});

module.exports = OrderDb;