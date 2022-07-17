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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UsersController = void 0;
var router_1 = require("../Core/decorators/router");
var connection_service_1 = require("../Core/redis/connection.service");
var users_model_1 = __importDefault(require("./users.model"));
var token_auth_1 = __importDefault(require("../utils/token.auth"));
var status_1 = __importDefault(require("../Core/status"));
var auth_guard_1 = require("../middlewares/auth.guard");
var UsersController = (function () {
    function UsersController() {
    }
    UsersController.prototype.GetProfileId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, auth, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.GetByAuthenticationID(req.body.UserId)];
                    case 1:
                        user = _a.sent();
                        if (user.Status === status_1.default.PROCCESS_SUCCESS && user.Payload) {
                            auth = token_auth_1.default.Create({
                                id: user.Payload,
                            }, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send({ id: user.Payload });
                        }
                        else {
                            res.status(user.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.trace(e_1);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.GetUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data, token, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.GetUserById(req.body.UserId)];
                    case 1:
                        user = _a.sent();
                        if (user.Status === status_1.default.PROCCESS_SUCCESS && !!user.Payload) {
                            data = __assign({ Status: 200 }, user.Payload);
                            console.log("[ROUTE /get]: ", data);
                            token = token_auth_1.default.Create(data, req.headers.authId);
                            res.setHeader("auth", token);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(user.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.GetUserInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dbResponse, gameHistory, data, token, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.body.UserId) {
                            res.status(400).send();
                            return [2];
                        }
                        return [4, users_model_1.default.GetUserById(req.body.UserId)];
                    case 1:
                        dbResponse = _a.sent();
                        if (dbResponse.Status != status_1.default.PROCCESS_SUCCESS || !dbResponse.Payload) {
                            res.status(dbResponse.Status).send();
                            return [2];
                        }
                        return [4, users_model_1.default.GetGameHistory(req.body.UserId)];
                    case 2:
                        gameHistory = _a.sent();
                        if (gameHistory.Status == status_1.default.PROCCESS_FAILED) {
                            console.log('Game History Error');
                            res.status(gameHistory.Status).send();
                            return [2];
                        }
                        data = {
                            Id: req.body.UserId,
                            AvatarId: dbResponse.Payload.AvatarId,
                            Character: dbResponse.Payload.Character,
                            Level: dbResponse.Payload.Level,
                            Vip: dbResponse.Payload.Vip,
                            UserName: dbResponse.Payload.UserName,
                            GameHistory: gameHistory.Payload
                        };
                        token = token_auth_1.default.Create(data, req.headers.authId);
                        res.setHeader('auth', token);
                        res.status(200).send(data);
                        return [3, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        res.status(500).send();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    UsersController.prototype.SearchUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data, token, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.SearchUser(req.body.searchField, req.headers.authId)];
                    case 1:
                        user = _a.sent();
                        if (user.Status === status_1.default.PROCCESS_SUCCESS && !!user.Payload) {
                            data = user.Payload;
                            token = token_auth_1.default.Create(data, req.headers.authId);
                            res.setHeader("auth", token);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(user.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.GetUserGameHistory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, authId, auth, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.GetGameHistory(req.body.UserId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS) {
                            data = {
                                Status: response.Status,
                                GameHistory: response.Payload,
                            };
                            authId = req.headers.authId;
                            auth = token_auth_1.default.Create(data, authId);
                            res.setHeader("auth", auth);
                            res.send(data);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.GetFriends = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, authId, data, auth, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.GetUserFriends(req.body.UserId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS) {
                            authId = req.headers.authId;
                            data = response.Payload || [];
                            if (!data) {
                                res.status(204).send();
                            }
                            else {
                                auth = token_auth_1.default.Create(data, authId);
                                res.setHeader("auth", auth);
                                res.status(200).send(data);
                            }
                        }
                        else {
                            res.status(response.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.trace(e_6);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.UpdateProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, AvatarId, Nickname, Character, data, response, resolve, auth, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = req.body;
                        AvatarId = body.avatar, Nickname = body.nickname, Character = body.character;
                        data = {};
                        if (AvatarId)
                            data["AvatarId"] = AvatarId;
                        if (Nickname)
                            data["Nickname"] = Nickname;
                        if (Character)
                            data["Character"] = Character;
                        return [4, users_model_1.default.UpdateFields(body.userId, data)];
                    case 1:
                        response = _a.sent();
                        if (response.Status == status_1.default.PROCCESS_SUCCESS) {
                            resolve = {
                                message: 'Updated'
                            };
                            auth = token_auth_1.default.Create(resolve, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(resolve);
                        }
                        else
                            res.status(response.Status).send();
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.UnFriend = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, token, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.UnfriendUser(req.body.UserId, req.body.FriendId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS) {
                            data = {
                                Message: "deleted",
                            };
                            token = token_auth_1.default.Create(data, req.headers.authId);
                            res.setHeader("auth", token);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(response.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.trace(e_7);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.FriendRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, auth, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.FriendRequest(req.body.UserId, req.body.FriendId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS && response.Payload) {
                            auth = token_auth_1.default.Create({
                                Message: response.Message,
                                Id: response.Payload,
                            }, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send({
                                Message: response.Message,
                                Id: response.Payload,
                            });
                        }
                        else
                            res.status(response.Status).send({ Message: response.Message });
                        return [3, 3];
                    case 2:
                        e_8 = _a.sent();
                        console.trace(e_8);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.AcceptFriendRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, auth, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.AcceptFriendRequest(req.body.UserId, req.body.FriendRequestId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS) {
                            data = {
                                Message: response.Message,
                            };
                            auth = token_auth_1.default.Create(data, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(response.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        e_9 = _a.sent();
                        console.trace(e_9);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.DenyFriendsRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.DenyFriendRequest(req.body.UserId, req.body.FriendRequestId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS) {
                            data = {
                                Message: "Done",
                            };
                            res.setHeader("auth", token_auth_1.default.Create(data, req.headers.authId));
                            res.status(200).send(data);
                        }
                        else {
                            res.status(response.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.GetFriendRequests = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, auth, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.GetUserFriendRequests(req.body.UserId)];
                    case 1:
                        response = _a.sent();
                        if (response.Status === status_1.default.PROCCESS_SUCCESS && response.Payload) {
                            data = response.Payload.map(function (item) {
                                return {
                                    FriendShipId: item._id,
                                    _id: item.From._id,
                                    Nickname: item.From.Nickname,
                                    AvatarId: item.From.AvatarId,
                                    Level: item.From.Level,
                                    Xp: item.From.Xp,
                                };
                            });
                            auth = token_auth_1.default.Create(data, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(response.Status).send();
                        }
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.trace(error_3);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.CheckAdvertise = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, auth, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.AdvertisStatus(req.body.UserId)];
                    case 1:
                        data = (_a.sent()).Payload;
                        auth = token_auth_1.default.Create(data, req.headers.authId);
                        res.setHeader("auth", auth);
                        res.status(200).send(data);
                        return [3, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.trace(error_4);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.SeenAdvertise = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, auth, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.SeenAdvertise(req.body.UserId)];
                    case 1:
                        data = (_a.sent()).Payload;
                        auth = token_auth_1.default.Create(data, req.headers.authId);
                        res.setHeader("auth", auth);
                        res.status(200).send(data);
                        return [3, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.trace(error_5);
                        res.status(500).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UsersController.prototype.SetToRedis = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, auth, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, connection_service_1.Redis.Set("test_in_project", "true")];
                    case 1:
                        _a.sent();
                        return [4, connection_service_1.Redis.GetAllKeys()];
                    case 2:
                        data = _a.sent();
                        auth = token_auth_1.default.Create(data, req.headers.authId);
                        res.setHeader("auth", auth);
                        res.status(200).send(data);
                        return [3, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.trace(error_6);
                        res.status(500).send();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    __decorate([
        (0, router_1.Post)("/get_profile_id")
    ], UsersController.prototype, "GetProfileId", null);
    __decorate([
        (0, router_1.Post)("/get")
    ], UsersController.prototype, "GetUserById", null);
    __decorate([
        (0, router_1.Post)('/get_user')
    ], UsersController.prototype, "GetUserInfo", null);
    __decorate([
        (0, router_1.Post)("/search")
    ], UsersController.prototype, "SearchUser", null);
    __decorate([
        (0, router_1.Post)("/get_game_history")
    ], UsersController.prototype, "GetUserGameHistory", null);
    __decorate([
        (0, router_1.Post)("/get_friends")
    ], UsersController.prototype, "GetFriends", null);
    __decorate([
        (0, router_1.Post)("/update-profile")
    ], UsersController.prototype, "UpdateProfile", null);
    __decorate([
        (0, router_1.Post)("/unfriend")
    ], UsersController.prototype, "UnFriend", null);
    __decorate([
        (0, router_1.Post)("/friend_request/create")
    ], UsersController.prototype, "FriendRequest", null);
    __decorate([
        (0, router_1.Post)("/friend_request/accept")
    ], UsersController.prototype, "AcceptFriendRequest", null);
    __decorate([
        (0, router_1.Post)("/friend_request/deny")
    ], UsersController.prototype, "DenyFriendsRequest", null);
    __decorate([
        (0, router_1.Post)("/friend_request/get")
    ], UsersController.prototype, "GetFriendRequests", null);
    __decorate([
        (0, router_1.Post)("/check_advertise")
    ], UsersController.prototype, "CheckAdvertise", null);
    __decorate([
        (0, router_1.Post)("/seen_advertise")
    ], UsersController.prototype, "SeenAdvertise", null);
    __decorate([
        (0, router_1.Post)("/redis")
    ], UsersController.prototype, "SetToRedis", null);
    UsersController = __decorate([
        (0, router_1.RouterModule)("/users", [auth_guard_1.DataAuthentication])
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
