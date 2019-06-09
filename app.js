//Requiring necessary 3rd party modules
var express = require('express')
var redis   = require("redis");
const bodyParser = require('body-parser')
const session = require('express-session')
var redisStore = require('connect-redis')(session);

//Requiring self made modules or functions
var user = require('./api/user').user
var sess = require('./api/user').session
var common = require('./common/utils')
var errorHandler = require('./common/error')

var client  = redis.createClient();
var app = express()

app.use(bodyParser.json());

//Middleware for session
app.use(session({
    secret: 'mysecret',
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

//Routes for logging in and user registration
app.post('/register', common.validate, user.register, common.jsonResponse, errorHandler)
app.get('/login', common.validate, sess.check, user.login, sess.set, common.jsonResponse, errorHandler)
app.get('/logout', sess.finish, common.jsonResponse, errorHandler)

//Defining port for our server
app.listen(8000,()=>{
    console.log('Server open at port 8000')
})