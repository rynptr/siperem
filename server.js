var express = require('express'),
    jwt = require('jsonwebtoken'),
    app = express(),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser'),
    controller = require('./controller');


var cors = require('cors');
app.use(cors());   


// set tampilan mesin untuk nodejs
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);
