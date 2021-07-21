const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 50000;

// Set the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --> Add this
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:50000', 'https://food-app-007.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());

// Route inits
app.use('/menu', require('./routes/menu.js'));
app.use('/order', require('./routes/order.js'));
app.use('/van', require('./routes/van.js'));
app.use('/user', require('./routes/user.js'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', express.static('./customer-app/build/'));


// Server init
app.listen(PORT, console.log(`Server started on port ${PORT}`));
