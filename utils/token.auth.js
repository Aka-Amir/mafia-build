"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var AuthenticationService = (function () {
    function AuthenticationService() {
    }
    AuthenticationService.Create = function (payload, id) {
        if (Array.isArray(payload))
            payload = {
                payload: JSON.stringify(payload),
            };
        return jsonwebtoken_1.default.sign(payload, "".concat(this.SecretKey, "~").concat(id), {
            algorithm: "HS256",
            expiresIn: "2000ms",
        });
    };
    AuthenticationService.Compare = function (token1, data, id) {
        try {
            if (!token1)
                return false;
            var payloadOne = JSON.parse(JSON.stringify(jsonwebtoken_1.default.verify(token1, "".concat(this.SecretKey, "~").concat(id), {
                algorithms: ["HS256"],
            })));
            delete payloadOne.iat;
            delete payloadOne.exp;
            return JSON.stringify(payloadOne) === JSON.stringify(data);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.default.TokenExpiredError)
                console.log("expire");
            return false;
        }
    };
    AuthenticationService.SecretKey = "m@_f_!a$Ga|-M-|E__$V@2>)>)";
    return AuthenticationService;
}());
exports.default = AuthenticationService;
