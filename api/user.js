var userModel = require('../models/user')

var user = {
    register : function(req, res, next){
        var username = req.body.username
        var password = req.body.password
        userModel.find({},function(err,users){
            users.forEach(function(user){
                if(user.username === username){
                    return next(new Error("Username already exists"))
                }
            })  
        })
        var newUser = new userModel({
            username,
            password
        })
        
        newUser.save().then((doc)=>{
            req.output = doc
            return next()
        }, (err)=>{
            return next(err)
        })
    },

    login : function(req, res, next){
        var username = req.query.username
        var password = req.query.password
        userModel.find({
            username,
            password
        }, (err,docs) =>{
            if(err){
                return next(err)
            }
            req.output = docs
            req.output.message = "Login Successful"
            if(docs.length === 0){
                req.output = "Username and Password do not match."
            }
            return next()
        })
    }
}

module.exports = user;