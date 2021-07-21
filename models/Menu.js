const Datastore = require('nedb');

const MenuDb = new Datastore({filename:'./database/menu.db', autoload: true});

module.exports = MenuDb;