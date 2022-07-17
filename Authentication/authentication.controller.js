"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
var index_1 = __importDefault(require("../Core/status/index"));
var index_2 = __importDefault(require("../Core/status/index"));
var router_1 = require("../Core/decorators/router");
var authentication_model_1 = __importDefault(require("./authentication.model"));
var users_model_1 = __importDefault(require("../Users/users.model"));
var token_auth_1 = __importDefault(require("../utils/token.auth"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var MessageBroker_service_1 = __importStar(require("../utils/MessageBroker.service"));
var uniqueId_1 = __importDefault(require("../utils/uniqueId"));
var AuthenticationController = (function () {
    function AuthenticationController() {
    }
    AuthenticationController.prototype.Validation = function (request, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tk, code, response, usr, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = request.params, tk = _a.tk, code = _a.code;
                        if (!tk || !code)
                            resolve.status(400).send();
                        return [4, authentication_model_1.default.UpdateValidation(tk, code)];
                    case 1:
                        response = _b.sent();
                        return [4, authentication_model_1.default.FindByToken(tk)];
                    case 2:
                        usr = _b.sent();
                        return [4, users_model_1.default.Create(usr.Payload._id, usr.Payload.Username, usr.Payload.InviteCode)];
                    case 3:
                        _b.sent();
                        if (response.Status == index_1.default.PROCCESS_SUCCESS)
                            resolve.status(200).send({ Message: "correct" });
                        else
                            resolve.status(403).send();
                        return [3, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.trace(e_1);
                        resolve.status(501).send();
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.LockUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, dbResponse, expectedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.params.id)
                            res.status(400).send();
                        return [4, authentication_model_1.default.FindById(req.params.id)];
                    case 1:
                        user = _a.sent();
                        if (!user.Payload || user.Status !== index_1.default.PROCCESS_SUCCESS) {
                            res.status(user.Status).send(user.Message);
                            return [2];
                        }
                        return [4, authentication_model_1.default.UpdateValidation(user.Payload.Token, req.params.code)];
                    case 2:
                        dbResponse = _a.sent();
                        if (dbResponse.Status !== index_2.default.PROCCESS_SUCCESS) {
                            res.status(dbResponse.Status).send();
                            return [2];
                        }
                        expectedToken = crypto_js_1.default.MD5("".concat(user.Payload.Token, "@").concat(req.params.id)).toString();
                        if (expectedToken !== req.params.token) {
                            res.status(403).send("Invalid Key Pair");
                            return [2];
                        }
                        return [4, authentication_model_1.default.LockUserAccount(req.params.id)];
                    case 3:
                        _a.sent();
                        res.status(200).send();
                        return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.RecoverPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, query2, auth, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!req.body.Id)
                            res.status(400).send();
                        return [4, authentication_model_1.default.FindById(req.body.Id)];
                    case 1:
                        response = _a.sent();
                        if (!(response.Status === index_1.default.PROCCESS_SUCCESS && response.Payload)) return [3, 5];
                        if (!(response.Payload.Password === "locked")) return [3, 3];
                        return [4, authentication_model_1.default.ChangePassword(req.body.Id, req.body.NewPassword)];
                    case 2:
                        query2 = _a.sent();
                        if (query2.Status === index_1.default.PROCCESS_SUCCESS && query2.Payload) {
                            auth = token_auth_1.default.Create({
                                Token: query2.Payload,
                            }, req.body.Id);
                            res.setHeader("auth", auth);
                            res.status(200).send({
                                Token: query2.Payload,
                            });
                        }
                        else {
                            res.status(query2.Status).send();
                        }
                        return [3, 4];
                    case 3:
                        res.status(403).send();
                        _a.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        res.status(response.Status).send();
                        _a.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        e_2 = _a.sent();
                        console.trace(e_2);
                        res.status(500).send();
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.RecoverPasswordRequest = function (request, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userInfo, specialToken, broker, codeResponse, message, response, data, auth, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, authentication_model_1.default.FindByUsernameOrPhoneNumber(request.body.User)];
                    case 1:
                        user = _a.sent();
                        if (user.Status !== index_1.default.PROCCESS_SUCCESS || !user.Payload) {
                            res.status(user.Status).send();
                            return [2];
                        }
                        userInfo = user.Payload;
                        specialToken = crypto_js_1.default.MD5("".concat(userInfo.Token, "@").concat(userInfo._id.toString())).toString();
                        broker = (0, MessageBroker_service_1.default)({
                            purpose: MessageBroker_service_1.Purpose.confirmation,
                            protocol: MessageBroker_service_1.Protocol.sms,
                        });
                        return [4, authentication_model_1.default.SetCode(userInfo._id, (0, uniqueId_1.default)().toString())];
                    case 2:
                        codeResponse = _a.sent();
                        if (codeResponse.Status !== index_2.default.PROCCESS_SUCCESS) {
                            console.log(codeResponse.Message);
                            res.status(codeResponse.Status).send();
                            return [2];
                        }
                        message = "Code: ".concat(codeResponse.Payload, " \n\u0633\u0644\u0627\u0645 \u0645\u0627\u0641\u06CC\u0627 \u0628\u0627\u0632 \u0639\u0632\u06CC\u0632 \u06A9\u062F \u0648\u0631\u0648\u062F \u0634\u0645\u0627");
                        broker.SetData(message);
                        broker.SetTarget(userInfo.PhoneNumber);
                        return [4, broker.Send()];
                    case 3:
                        response = _a.sent();
                        console.log(response);
                        data = {
                            id: userInfo._id,
                            secret: specialToken,
                        };
                        auth = token_auth_1.default.Create(data, data.id);
                        res.setHeader("auth", auth);
                        res.status(200).send(data);
                        return [3, 5];
                    case 4:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        res.status(501).send();
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.Register = function (request, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingUsername, matchingPhoneNumber, res, token, data, auth, databaseResponse, message, broker, response, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4, authentication_model_1.default.FindByUserName(request.body.Username)];
                    case 1:
                        matchingUsername = _a.sent();
                        return [4, authentication_model_1.default.FindByPhoneNumber(request.body.PhoneNumber)];
                    case 2:
                        matchingPhoneNumber = _a.sent();
                        if (!!matchingPhoneNumber.Payload || !!matchingUsername.Payload) {
                            resolve.status(403).send();
                            return [2];
                        }
                        return [4, authentication_model_1.default.Create(request.body)];
                    case 3:
                        res = _a.sent();
                        if (!(res.Status === index_1.default.PROCCESS_SUCCESS && !!res.Payload)) return [3, 10];
                        token = crypto_js_1.default.MD5("".concat(res.Payload.id).concat(request.body.Password)).toString();
                        data = {
                            Id: res.Payload.id,
                            Token: token,
                        };
                        return [4, authentication_model_1.default.UpdateToken(res.Payload.id, token)];
                    case 4:
                        _a.sent();
                        auth = token_auth_1.default.Create(data, res.Payload.id);
                        return [4, authentication_model_1.default.SetCode(res.Payload.id, (0, uniqueId_1.default)().toString())];
                    case 5:
                        databaseResponse = _a.sent();
                        if (databaseResponse.Status !== index_1.default.PROCCESS_SUCCESS) {
                            console.log(databaseResponse.Message);
                            resolve.status(databaseResponse.Status).send();
                            return [2];
                        }
                        message = "Code: ".concat(databaseResponse.Payload, " \n\u0633\u0644\u0627\u0645 \u0645\u0627\u0641\u06CC\u0627 \u0628\u0627\u0632 \u0639\u0632\u06CC\u0632 \u06A9\u062F \u0648\u0631\u0648\u062F \u0634\u0645\u0627");
                        broker = (0, MessageBroker_service_1.default)({
                            purpose: MessageBroker_service_1.Purpose.confirmation,
                            protocol: MessageBroker_service_1.Protocol.sms,
                        });
                        broker.SetData(message);
                        broker.SetTarget(request.body.PhoneNumber);
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4, broker.Send()];
                    case 7:
                        response = _a.sent();
                        console.log(response);
                        return [3, 9];
                    case 8:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [3, 9];
                    case 9:
                        resolve.setHeader("auth", auth);
                        resolve.status(200).send(data);
                        return [2];
                    case 10:
                        resolve.status(501).send();
                        return [3, 12];
                    case 11:
                        e_5 = _a.sent();
                        console.log(e_5);
                        resolve.status(500).send();
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.LoginController = function (request, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Password, Username, response, password, data, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, Password = _a.Password, Username = _a.Username;
                        return [4, authentication_model_1.default.FindByUsernameOrPhoneNumber(Username)];
                    case 1:
                        response = _b.sent();
                        if (response.Status === index_1.default.PROCCESS_SUCCESS) {
                            if (!!response.Payload) {
                                password = crypto_js_1.default.MD5(Password).toString();
                                if (password === response.Payload.Password) {
                                    data = {
                                        Id: response.Payload._id.toString(),
                                        Login: true,
                                        Token: response.Payload.Token,
                                        Username: response.Payload.Username,
                                        PhoneNumber: response.Payload.PhoneNumber,
                                    };
                                    resolve.setHeader("auth", token_auth_1.default.Create(data, data.Id));
                                    resolve.status(200).send(data);
                                }
                                else {
                                    resolve
                                        .status(response.Payload.Password === "locked" ? 451 : 403)
                                        .send();
                                }
                            }
                            else {
                                resolve.status(404).send();
                            }
                        }
                        else {
                            resolve.status(501).send();
                        }
                        return [3, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        resolve.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.AutoLogin = function (request, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_model_1.default.FindByToken(request.body.key)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === index_1.default.PROCCESS_SUCCESS) {
                            data = __assign({}, response.Payload._doc);
                            resolve.setHeader("auth", token_auth_1.default.Create(data, response.Payload._id.toString()));
                            resolve.status(200).send(data);
                        }
                        else if (response.Status === index_1.default.NOT_FOUND) {
                            resolve.status(404).send();
                        }
                        else {
                            resolve.send(response.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        resolve.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.ChangePassword = function (request, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var UserInfo, oldPassword, Token, data, token, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!request.body.authId)
                            resolve.status(400).send();
                        return [4, authentication_model_1.default.FindById(request.body.authId)];
                    case 1:
                        UserInfo = (_a.sent())
                            .Payload;
                        oldPassword = crypto_js_1.default.MD5(request.body.oldPassword).toString();
                        if (!(UserInfo.Password === oldPassword)) return [3, 4];
                        return [4, authentication_model_1.default.ChangePassword(request.body.authId, request.body.newPassword)];
                    case 2:
                        Token = (_a.sent()).Payload;
                        return [4, authentication_model_1.default.UpdateToken(request.body.authId, Token)];
                    case 3:
                        _a.sent();
                        data = {
                            Token: Token,
                        };
                        token = token_auth_1.default.Create(data, request.body.authId);
                        resolve.setHeader("auth", token);
                        resolve.send(data);
                        console.log(data);
                        return [3, 5];
                    case 4:
                        resolve.status(403).send();
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        e_6 = _a.sent();
                        resolve.status(500).send();
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    __decorate([
        (0, router_1.Get)("/validation/:tk/:code")
    ], AuthenticationController.prototype, "Validation", null);
    __decorate([
        (0, router_1.Get)("/recover-password/:id/:token/:code")
    ], AuthenticationController.prototype, "LockUser", null);
    __decorate([
        (0, router_1.Post)("/recover-password")
    ], AuthenticationController.prototype, "RecoverPassword", null);
    __decorate([
        (0, router_1.Post)("/recover-password-request")
    ], AuthenticationController.prototype, "RecoverPasswordRequest", null);
    __decorate([
        (0, router_1.Post)("/register")
    ], AuthenticationController.prototype, "Register", null);
    __decorate([
        (0, router_1.Post)("/login")
    ], AuthenticationController.prototype, "LoginController", null);
    __decorate([
        (0, router_1.Post)("/authenticate")
    ], AuthenticationController.prototype, "AutoLogin", null);
    __decorate([
        (0, router_1.Post)("/change-password")
    ], AuthenticationController.prototype, "ChangePassword", null);
    AuthenticationController = __decorate([
        (0, router_1.RouterModule)("/authentication")
    ], AuthenticationController);
    return AuthenticationController;
}());
exports.AuthenticationController = AuthenticationController;
