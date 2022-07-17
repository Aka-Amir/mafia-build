"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = exports.GenerateToken = void 0;
var admin_constants_1 = require("./admin.constants");
var jsonwebtoken_1 = require("jsonwebtoken");
function GenerateToken(UserId, MD5Password, Access) {
    var token = (0, jsonwebtoken_1.sign)({ UserId: UserId, MD5: MD5Password, Access: Access }, admin_constants_1.SecretKey, {
        algorithm: "HS512",
        expiresIn: '1h'
    });
    return token;
}
exports.GenerateToken = GenerateToken;
function Verify(authorization) {
    return (0, jsonwebtoken_1.verify)(authorization, admin_constants_1.SecretKey);
}
exports.Verify = Verify;
