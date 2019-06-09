var userModel = require('../models/user')

//Defining middleware for user registration
var user = {
    register : function(req, res, next){
        var username = req.body.username
        var password = req.body.password
        //A check whether the username already exists
        userModel.find({},function(err,users){
            var check = 1
            users.forEach(function(user){
                if(user.username === username){
                    check = 0
                    return next(new Error("Username already exists"))
                }
            })
            if(check === 1){
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
            }              
        })
    },

    //Defining middleware for user login
    login : function(req, res, next){
        if(req.output){
            return next()
        }
        var username = req.query.username
        var password = req.query.password
        userModel.find({
            username,
            password
        }, (err,docs) =>{
            if(err){
                return next(err)
            }
            req.output = `Welcome ${username}`
            req.output.message = "Login Successful"
            if(docs.length === 0){
                req.output = "Username and Password do not match."
                req.okay = 1
            }
            return next()
        })
    }
}

//Defining basic utlity functions for session management
var session = {
    check : function(req, res, next){
        let sess = req.session
        if(sess.key){
            req.output = `Welcome ${sess.key}`
        }
        return next()
    },
    set : function(req, res, next){
        if(req.session.key || req.okay){
            return next()
        }
        req.session.key=req.query.username
        return next()
    },
    finish : function(req, res, next){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }
            req.output = "Successfully logged out"
            return next()
        });
    }
}

module.exports = {
    user,
    session
}