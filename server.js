
var express = require('express');
var apiRoutes = express.Router();
var app = express();
var port = process.env.PORT || 9005;
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressJWT = require('express-jwt');

import GraphHTTP from 'express-graphql';
import schema from './schema';
import {graphql} from 'graphql';

var db = require('./app/db');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var User = require('./app/models/user');

var jwt = require('jsonwebtoken');
var config = require('./config');

app.set('superSecret', config.secret);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
require('./app/routes.js')(app, apiRoutes, jwt);

app.use('/api', apiRoutes);

//graphql
app.use(bodyParser.text({type: 'application/graphql'}));

app.post('/graphql', (req, res) => {
    graphql(schema, req.body)
    .then((result) => {
        console.log(result);
        res.send(JSON.stringify(result , null, 2));
    })
})

app.use('/graphql', GraphHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
}))


app.listen(port);
console.log('Magic happens at http://localhost:' + port);