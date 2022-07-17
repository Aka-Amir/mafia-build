"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAuthentication = void 0;
var status_1 = __importDefault(require("../Core/status"));
var authentication_model_1 = __importDefault(require("../Authentication/authentication.model"));
var token_auth_1 = __importDefault(require("../utils/token.auth"));
var process_1 = __importDefault(require("process"));
function DataAuthentication(req, res, next) {
    var _a;
    try {
        if (req.method.toLowerCase() === "get") {
            next();
            return;
        }
        var targetToken = token_auth_1.default.Compare((_a = req.headers.auth) === null || _a === void 0 ? void 0 : _a.toString(), {
            adminId: "admin",
        }, "mafia_admin");
        if (targetToken) {
            next();
            return;
        }
        if (String(process_1.default.env.TESTING) === "1" && req.headers.test === "active") {
            req.headers.authId = "MMAMD";
            next();
            return;
        }
        if (!req.headers.token || !req.headers.auth) {
            res.status(403).send();
            return;
        }
        authentication_model_1.default.FindByToken(req.headers.token.toString())
            .then(function (_a) {
            var _b;
            var Status = _a.Status, Payload = _a.Payload;
            if (Status === status_1.default.PROCCESS_SUCCESS && !!Payload) {
                var tk = token_auth_1.default.Compare((_b = req.headers.auth) === null || _b === void 0 ? void 0 : _b.toString(), req.body, Payload._id.toString());
                if (tk) {
                    req.headers.authId = Payload._id.toString();
                    next();
                }
                else
                    res.status(400).send();
            }
            else {
                res.status(Status === status_1.default.NOT_FOUND ? 404 : 500).send();
            }
        })
            .catch(function (e) {
            res.status(400).send();
        });
    }
    catch (e) {
        res.status(500).send();
    }
}
exports.DataAuthentication = DataAuthentication;
