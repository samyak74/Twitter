var express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

var user = require('./api/user')
var common = require('./common/utils')
var errorHandler = require('./common/error')

var app = express()

app.use(bodyParser.json());

app.post('/register', user.register, common.jsonResponse, errorHandler)
app.get('/login', user.login, common.jsonResponse, errorHandler)

app.listen(8000,()=>{
    console.log('Server open at port 8000')
})