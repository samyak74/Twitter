"use strict";

var env = process.env.NODE_ENV || "development";

//Defining a common utility for error handling and setting error code
module.exports = function(err, req, res, next) {
    var code = err.status || 500;
    var response = {
        error: err.message || err,
        stack: err.stack ? err.stack.split("\n") : ""
    };
    if (err.data) {
        response.data = err.data;
    }
    res.status(code).json(response);
};