"use strict";
var jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    //get token from header
    var token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No token, Authorization denied" });
    }
    //Verify token
    try {
        var decoded = jwt.verify(token, "longer-secret-is-better");
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
