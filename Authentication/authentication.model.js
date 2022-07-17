"use strict";
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
var authentication_schema_1 = __importDefault(require("./authentication.schema"));
var status_1 = __importDefault(require("../Core/status"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var AuthenticationModel = (function () {
    function AuthenticationModel() {
    }
    AuthenticationModel.UpdateValidation = function (token, code) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default
                                .updateOne({ Token: token, ConfirmationCode: code }, { $set: { IsValidate: true } })
                                .exec()];
                    case 1:
                        response = _a.sent();
                        if (response.matchedCount === 0)
                            return [2, { Message: 'Not found', Status: status_1.default.NOT_FOUND }];
                        return [2, { Message: "Updated !", Status: status_1.default.PROCCESS_SUCCESS, Payload: true }];
                    case 2:
                        e_1 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.Create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var password, user, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        password = crypto_js_1.default.MD5(data.Password).toString();
                        user = new authentication_schema_1.default({
                            Password: password,
                            Username: data.Username,
                            PhoneNumber: data.PhoneNumber,
                            Token: "",
                            InviteCode: data.InviteCode
                        });
                        return [4, user.save()];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                Message: "Created",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: {
                                    id: response._id.toString(),
                                },
                            }];
                    case 2:
                        e_2 = _a.sent();
                        return [2, { Message: "Failed: ".concat(JSON.stringify(e_2)), Status: status_1.default.FAILED_TO_CREATE }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.SetCode = function (userId, confirmationCode) {
        return __awaiter(this, void 0, void 0, function () {
            var updateResponse, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default
                                .updateOne({ _id: userId }, { $set: { ConfirmationCode: confirmationCode } })
                                .exec()];
                    case 1:
                        updateResponse = _a.sent();
                        if (updateResponse.matchedCount === 0)
                            return [2, {
                                    Message: "user not found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        if (updateResponse.modifiedCount === 0)
                            return [2, {
                                    Message: "could not update user model",
                                    Status: status_1.default.PROCCESS_FAILED,
                                }];
                        return [2, {
                                Message: "code updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: confirmationCode,
                            }];
                    case 2:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        return [2, {
                                Message: e_3,
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.ChangePassword = function (id, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var userDoc, password, newToken, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, authentication_schema_1.default.findById(id).exec()];
                    case 1:
                        userDoc = _a.sent();
                        if (!userDoc)
                            return [2, {
                                    Message: "User Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        password = crypto_js_1.default.MD5(newPassword).toString();
                        newToken = crypto_js_1.default.MD5("".concat(id).concat(newPassword)).toString();
                        userDoc.Password = password;
                        userDoc.Token = newToken;
                        return [4, userDoc.save()];
                    case 2:
                        _a.sent();
                        return [2, {
                                Message: "Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: newToken.toString(),
                            }];
                    case 3:
                        e_4 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    AuthenticationModel.LockUserAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default.updateOne({ _id: id }, { $set: { Password: "locked" } })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_5 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.FindByUsernameOrPhoneNumber = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default
                                .findOne({
                                $or: [{ Username: key }, { PhoneNumber: key }],
                            })
                                .exec()];
                    case 1:
                        response = _a.sent();
                        if (!response)
                            return [2, {
                                    Message: 'not found',
                                    Status: status_1.default.NOT_FOUND
                                }];
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: JSON.parse(JSON.stringify(response)),
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.FindByUserName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingItem, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default
                                .findOne({ Username: username }, { __v: 0 })
                                .exec()];
                    case 1:
                        matchingItem = _a.sent();
                        if (!matchingItem)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        return [2, {
                                Message: "Found",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: matchingItem,
                            }];
                    case 2:
                        error_2 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.FAILED_TO_CREATE }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.FindByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingItem, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default
                                .findOne({ Token: token }, { __v: 0, Token: 0, Password: 0, ConfirmationCode: 0 })
                                .exec()];
                    case 1:
                        matchingItem = _a.sent();
                        if (!matchingItem)
                            return [2, {
                                    Message: "Not found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        if (matchingItem.Password === "locked")
                            return [2, {
                                    Message: "User Is Banned",
                                    Status: status_1.default.USER_BAN,
                                }];
                        return [2, {
                                Message: "Found",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: matchingItem,
                            }];
                    case 2:
                        error_3 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.FindByPhoneNumber = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingItem, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default
                                .findOne({ PhoneNumber: phone }, { __v: 0 })
                                .exec()];
                    case 1:
                        matchingItem = _a.sent();
                        if (!matchingItem)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        return [2, {
                                Message: "Found",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: matchingItem,
                            }];
                    case 2:
                        error_4 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.FAILED_TO_CREATE }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.FindById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingItem, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authentication_schema_1.default.findById(id).exec()];
                    case 1:
                        matchingItem = _a.sent();
                        if (!matchingItem)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        return [2, {
                                Message: "Found",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: matchingItem,
                            }];
                    case 2:
                        error_5 = _a.sent();
                        console.trace(error_5);
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationModel.UpdateToken = function (id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!id || !token)
                            return [2, {
                                    Message: "Invalid Parameter",
                                    Status: status_1.default.INVALID_PARAMETER,
                                }];
                        return [4, authentication_schema_1.default
                                .updateOne({ _id: id }, {
                                $set: {
                                    Token: token,
                                },
                            })
                                .exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.FAILED_TO_CREATE,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    return AuthenticationModel;
}());
exports.default = AuthenticationModel;
