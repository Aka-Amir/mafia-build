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
var status_1 = __importDefault(require("../Core/status"));
var utils_service_1 = require("../utils/utils.service");
var users_schema_1 = __importDefault(require("./users.schema"));
var users_friends_schema_1 = __importDefault(require("./users_friends.schema"));
var mongoose_1 = require("mongoose");
var shop_interface_1 = require("../Shop/shop.interface");
var shop_model_1 = __importDefault(require("../Shop/shop.model"));
var inventory_model_1 = __importDefault(require("../Inventory/inventory.model"));
var UserModel = (function () {
    function UserModel() {
    }
    UserModel.Create = function (UserId, UserName, InviteCode) {
        return __awaiter(this, void 0, void 0, function () {
            var invitationCode, isInvitationCodeUnique, userInfo, usr, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        invitationCode = "";
                        isInvitationCodeUnique = false;
                        _a.label = 1;
                    case 1:
                        if (!!isInvitationCodeUnique) return [3, 3];
                        invitationCode = this.GeneratorInvitationCode();
                        return [4, this.CheckInvitationCode(invitationCode)];
                    case 2:
                        isInvitationCodeUnique = _a.sent();
                        return [3, 1];
                    case 3:
                        userInfo = new users_schema_1.default({
                            UserName: UserName,
                            Nickname: UserName,
                            AvatarId: 0,
                            InvitationCode: invitationCode,
                            AuthenticationRef: UserId,
                            PrimaryCoin: 100,
                            SecondaryCoin: 2,
                            GameHistory: [],
                            Xp: 0,
                        });
                        return [4, userInfo.save()];
                    case 4:
                        usr = _a.sent();
                        if (!InviteCode) return [3, 6];
                        return [4, this.InviteUserByInviteCode(InviteCode)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2, {
                            Message: "",
                            Status: status_1.default.PROCCESS_FAILED,
                            Payload: {
                                id: usr._id.toString(),
                            },
                        }];
                    case 7:
                        error_1 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 8: return [2];
                }
            });
        });
    };
    UserModel.InviteUserByInviteCode = function (InviteCode) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.updateOne({ InvitationCode: InviteCode }, { $inc: { InviteCount: 1 } })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Increased",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_1 = _a.sent();
                        return [2, {
                                Message: "Faild: ".concat(JSON.stringify(e_1)),
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetUserCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var AllUsers, NumberOfRegistrationsByDate, e_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4, users_schema_1.default.find({}, {
                                SignupDate: 1,
                                UserName: 1,
                                InviteCount: 1,
                                Level: 1,
                                Score: 1,
                            })];
                    case 1:
                        AllUsers = _c.sent();
                        AllUsers = AllUsers.map(function (user) { return user.toObject({ virtuals: true }); });
                        NumberOfRegistrationsByDate = AllUsers.map(function (user) {
                            var date = new Date(user.SignupDate || 0);
                            return "".concat(date.getFullYear(), "/").concat(date.getMonth() + 1, "/").concat(date.getDate());
                        }).reduce(function (total, current) {
                            total[current] = Number(total[current] || 0) + 1;
                            return total;
                        }, {});
                        _a = {
                            Message: "Increased",
                            Status: status_1.default.PROCCESS_SUCCESS
                        };
                        _b = {};
                        return [4, users_schema_1.default.count()];
                    case 2: return [2, (_a.Payload = (_b.UserCount = _c.sent(),
                            _b.NumberOfRegistrationsByDate = NumberOfRegistrationsByDate,
                            _b.NumberOfUserInvited = AllUsers,
                            _b),
                            _a)];
                    case 3:
                        e_2 = _c.sent();
                        console.trace(e_2);
                        return [2, {
                                Message: "Faild",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.BestUsers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, AllUsers, userIndex, count, pre, next, UsersSorted, i, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4, this.GetUserById(id)];
                    case 1:
                        user = (_a.sent()).Payload;
                        AllUsers = void 0;
                        if (!user.Vip) return [3, 3];
                        return [4, users_schema_1.default
                                .find({}, {
                                Xp: 1,
                            })
                                .sort({ Xp: -1 })];
                    case 2:
                        AllUsers = _a.sent();
                        userIndex = AllUsers.findIndex(function (user) {
                            return user._id.toString() === id;
                        });
                        count = 1;
                        pre = userIndex - count >= 0 ? userIndex - count : 0;
                        next = userIndex + count <= AllUsers.length
                            ? userIndex + count
                            : AllUsers.length;
                        UsersSorted = [];
                        for (i = pre; i <= next; i++) {
                            if (AllUsers[i] !== undefined)
                                UsersSorted.push(AllUsers[i]);
                            else
                                break;
                        }
                        AllUsers = UsersSorted;
                        return [3, 5];
                    case 3: return [4, users_schema_1.default
                            .find({}, {
                            Xp: 1,
                        })
                            .sort({ Xp: -1 })
                            .limit(50)];
                    case 4:
                        AllUsers = _a.sent();
                        _a.label = 5;
                    case 5: return [2, {
                            Message: "Fetched",
                            Status: status_1.default.PROCCESS_SUCCESS,
                            Payload: AllUsers,
                        }];
                    case 6:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        return [2, {
                                Message: "Faild",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    UserModel.GeneratorInvitationCode = function () {
        try {
            var AllowedCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
            var code = "";
            for (var i = 0; i < 6; i++) {
                code += AllowedCharacters[~~(Math.random() * AllowedCharacters.length)];
            }
            return code;
        }
        catch (error) {
            return "";
        }
    };
    UserModel.CheckInvitationCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var foundDoc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.findOne({ InvitationCode: code }).exec()];
                    case 1:
                        foundDoc = _a.sent();
                        return [2, !Boolean(foundDoc)];
                    case 2:
                        error_2 = _a.sent();
                        return [2, false];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, UserData, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .findById(userId)
                                .select({
                                UserName: 1,
                                Nickname: 1,
                                AvatarId: 1,
                                Vip: 1,
                                VipExpireTime: 1,
                                VipExpireDay: 1,
                                Xp: 1,
                                Level: 1,
                                InviteCount: 1,
                                Score: 1,
                                InvitationCode: 1,
                                PrimaryCoin: 1,
                                SecondaryCoin: 1,
                                Character: 1,
                                GameId: 1,
                            })
                                .exec()];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        UserData = result.toObject({ virtuals: true });
                        delete UserData.VipExpireTime;
                        delete UserData.Xp;
                        return [2, {
                                Message: "Found",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: UserData,
                            }];
                    case 2:
                        e_4 = _a.sent();
                        return [2, {
                                Message: "Failed: " + e_4,
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetByAuthenticationID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .findOne({ AuthenticationRef: new mongoose_1.Types.ObjectId(id) })
                                .exec()];
                    case 1:
                        res = _a.sent();
                        if (!res)
                            return [2, {
                                    Status: status_1.default.NOT_FOUND,
                                    Message: "Not Found",
                                }];
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: "Found",
                                Payload: res._id.toString(),
                            }];
                    case 2:
                        e_5 = _a.sent();
                        console.trace(e_5);
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: "Failed To Find",
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetAuthId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.findOne({ _id: id }).exec()];
                    case 1:
                        res = _a.sent();
                        if (!res)
                            return [2, {
                                    Status: status_1.default.NOT_FOUND,
                                    Message: "Not Found",
                                }];
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: "Found",
                                Payload: res.AuthenticationRef.toString(),
                            }];
                    case 2:
                        e_6 = _a.sent();
                        console.trace(e_6);
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: "Failed To Find",
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.IncreaseParameter = function (userId, path, count) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.updateOne({ _id: userId }, { $inc: (_a = {}, _a[path] = count, _a) })];
                    case 1:
                        _b.sent();
                        return [2, {
                                Message: "Process Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_7 = _b.sent();
                        return [2, {
                                Message: "Process Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.IncreasePrimaryCoin = function (userId, count) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.updateOne({ _id: userId }, { $inc: { ParimaryCoin: count } })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Process Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_8 = _a.sent();
                        return [2, {
                                Message: "Process Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.SearchUser = function (searchField, authenticationId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .find({
                                $and: [
                                    { UserName: { $regex: new RegExp(searchField), $options: "i" } },
                                    { $not: { AuthenticationRef: authenticationId } },
                                ],
                            })
                                .select({ UserName: 1, AvatarId: 1 })
                                .limit(20)
                                .exec()];
                    case 1:
                        result = _a.sent();
                        result = result.map(function (user) {
                            return {
                                _id: user._id,
                                UserName: user.UserName,
                                AvatarId: user.AvatarId,
                                id: user._id,
                                Level: user.Level,
                            };
                        });
                        console.log("Search: ", result);
                        return [2, {
                                Message: "Process Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: result,
                            }];
                    case 2:
                        e_9 = _a.sent();
                        console.trace(e_9);
                        return [2, {
                                Message: "Process Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.ChangeOnlineStatus = function (userId, isOnline) {
        return __awaiter(this, void 0, void 0, function () {
            var e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.updateOne({ _id: userId }, { $set: { IsOnline: isOnline } })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_10 = _a.sent();
                        console.trace(e_10);
                        return [2, {
                                Message: "Faild",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetGameHistory = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .findOne({ _id: userId })
                                .select({
                                GameHistory: 1,
                            })
                                .exec()];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: response.GameHistory.toString(),
                            }];
                    case 2:
                        e_11 = _a.sent();
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetUserFriends = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .findOne({ _id: userId }, { Friends: 1 })
                                .populate("Friends", {
                                _id: 1,
                                Nickname: 1,
                                AvatarId: 1,
                                Xp: 1,
                                Score: 1,
                                Level: 1,
                            })];
                    case 1:
                        response = _a.sent();
                        data = response.Friends.map(function (user) {
                            return {
                                _id: user._id,
                                Nickname: user.Nickname,
                                AvatarId: user.AvatarId,
                                Level: user.Level,
                                Score: user.Score,
                            };
                        });
                        if (!response)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: data,
                            }];
                    case 2:
                        e_12 = _a.sent();
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetUserFriendRequests = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_friends_schema_1.default
                                .find({ To: userId })
                                .select({ From: 1 })
                                .populate("From", {
                                Nickname: 1,
                                Xp: 1,
                                AvatarId: 1,
                                Level: 1,
                                _id: 1,
                            })
                                .exec()];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: response.map(function (doc) { return doc.toObject(); }),
                            }];
                    case 2:
                        e_13 = _a.sent();
                        return [2, {
                                Message: "",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.FriendRequest = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var res, res2, friend, doc, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, users_friends_schema_1.default
                                .find({
                                From: from,
                                To: to,
                            })
                                .exec()];
                    case 1:
                        res = _a.sent();
                        if (res.length > 0)
                            return [2, {
                                    Message: "Already requested",
                                    Status: status_1.default.CONFILICT,
                                }];
                        return [4, users_schema_1.default
                                .findOne({
                                _id: from,
                            })
                                .select({
                                Friends: 1,
                            })
                                .exec()];
                    case 2:
                        res2 = _a.sent();
                        if (res2.Friends.includes(to))
                            return [2, {
                                    Message: "Already exists in friend list",
                                    Status: status_1.default.CONFILICT,
                                }];
                        friend = new users_friends_schema_1.default({
                            From: new mongoose_1.Types.ObjectId(from),
                            To: new mongoose_1.Types.ObjectId(to),
                        });
                        return [4, friend.save()];
                    case 3:
                        doc = _a.sent();
                        return [2, {
                                Message: "Added",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: doc._id.toString(),
                            }];
                    case 4:
                        e_14 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 5: return [2];
                }
            });
        });
    };
    UserModel.AcceptFriendRequest = function (userId, friendRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            var friendDoc, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, users_friends_schema_1.default
                                .findByIdAndDelete(friendRequestId)
                                .exec()];
                    case 1:
                        friendDoc = _a.sent();
                        if (!friendDoc)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        if (userId !== friendDoc.To.toString()) {
                            return [2, {
                                    Message: "",
                                    Status: status_1.default.CONFILICT,
                                }];
                        }
                        return [4, users_schema_1.default
                                .updateOne({ _id: friendDoc.From }, {
                                $push: {
                                    Friends: friendDoc.To,
                                },
                            })
                                .exec()];
                    case 2:
                        _a.sent();
                        return [4, users_schema_1.default
                                .updateOne({ _id: friendDoc.To }, {
                                $push: {
                                    Friends: friendDoc.From,
                                },
                            })
                                .exec()];
                    case 3:
                        _a.sent();
                        return [2, {
                                Message: "Added To Friends List",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 4:
                        e_15 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 5: return [2];
                }
            });
        });
    };
    UserModel.DenyFriendRequest = function (userId, friendRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            var friendDoc, e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_friends_schema_1.default
                                .findByIdAndDelete(friendRequestId)
                                .exec()];
                    case 1:
                        friendDoc = _a.sent();
                        if (!friendDoc)
                            return [2, {
                                    Message: "Not Found",
                                    Status: status_1.default.NOT_FOUND,
                                }];
                        if (userId !== friendDoc.To.toString()) {
                            return [2, {
                                    Message: "",
                                    Status: status_1.default.CONFILICT,
                                }];
                        }
                        return [2, {
                                Message: "Deleted Successfully",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_16 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GetUsersInfoByIds = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _i, ids_1, id, models, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = [];
                        for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                            id = ids_1[_i];
                            query.push({ _id: id });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, users_schema_1.default
                                .find({
                                $or: query,
                            }, {
                                UserName: 1,
                                Character: 1,
                                Vip: 1,
                                VipExpireTime: 1,
                            })
                                .exec()];
                    case 2:
                        models = _a.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: JSON.parse(JSON.stringify(models)),
                            }];
                    case 3:
                        e_17 = _a.sent();
                        console.trace(e_17);
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.GamePay = function (ids, price) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _i, ids_2, id, e_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = [];
                        for (_i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
                            id = ids_2[_i];
                            query.push({ _id: id });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, users_schema_1.default
                                .updateMany({
                                $or: query,
                            }, {
                                $inc: { PrimaryCoin: price * -1 },
                            })
                                .exec()];
                    case 2:
                        _a.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 3:
                        e_18 = _a.sent();
                        console.trace(e_18);
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.ResetBehaviourScore = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.updateOne({ _id: id }, {
                                $set: {
                                    BehaviorScore: 1000,
                                    ReportCount: 10,
                                    CommandCount: 20,
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_19 = _a.sent();
                        console.trace(e_19);
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.DecreaseProperty = function (userId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var e_20;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default.updateOne({ _id: userId }, { $inc: (_a = {}, _a[path] = -1, _a) })];
                    case 1:
                        _b.sent();
                        return [2, {
                                Message: "Succes",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_20 = _b.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.SetGameIdToUsers = function (ids, gameId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _i, ids_3, id, e_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = [];
                        for (_i = 0, ids_3 = ids; _i < ids_3.length; _i++) {
                            id = ids_3[_i];
                            query.push({ _id: id });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, users_schema_1.default
                                .updateMany({
                                $or: query,
                            }, {
                                $set: {
                                    GameId: gameId,
                                },
                            })
                                .exec()];
                    case 2:
                        _a.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 3:
                        e_21 = _a.sent();
                        console.trace(e_21);
                        return [2, {
                                Message: "Faild",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.ResetGame = function (_a) {
        var userId = _a.userId, gameId = _a.gameId, xp = _a.xp, win = _a.win;
        return __awaiter(this, void 0, void 0, function () {
            var e_22;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4, users_schema_1.default
                                .updateOne({ _id: userId }, {
                                $inc: {
                                    Xp: xp,
                                },
                                $push: {
                                    GameHistory: win ? "W" : "L",
                                },
                            })
                                .exec()];
                    case 1:
                        _b.sent();
                        return [4, users_schema_1.default
                                .updateMany({ _id: userId, GameId: gameId }, {
                                $set: {
                                    GameId: "",
                                },
                            })
                                .exec()];
                    case 2:
                        _b.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 3:
                        e_22 = _b.sent();
                        console.trace(e_22);
                        return [2, {
                                Message: "Faild",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    UserModel.UpdateFields = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var e_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .updateOne({ _id: id }, {
                                $set: query,
                            })
                                .exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_23 = _a.sent();
                        console.trace(e_23);
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.SetVip = function (id, expireTime) {
        return __awaiter(this, void 0, void 0, function () {
            var e_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .updateOne({ _id: id }, {
                                $set: {
                                    VipExpireTime: expireTime,
                                },
                            })
                                .exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_24 = _a.sent();
                        console.trace(e_24);
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.BanUser = function (userId, _a) {
        var _b = _a.year, year = _b === void 0 ? 0 : _b, _c = _a.month, month = _c === void 0 ? 0 : _c, _d = _a.day, day = _d === void 0 ? 0 : _d, _e = _a.hour, hour = _e === void 0 ? 0 : _e, _f = _a.minute, minute = _f === void 0 ? 0 : _f;
        return __awaiter(this, void 0, void 0, function () {
            var banTime, e_25;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 2, , 3]);
                        banTime = minute * 60 * 1000 +
                            hour * 60 * 60 * 1000 +
                            day * 24 * 60 * 60 * 1000 +
                            month * 30 * 24 * 60 * 60 * 1000 +
                            year * 365 * 24 * 60 * 60 * 1000 +
                            Date.now();
                        return [4, users_schema_1.default.updateOne({ _id: userId }, { $set: { BanTime: banTime } })];
                    case 1:
                        _g.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_25 = _g.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.UnfriendUser = function (userId, friendId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .updateMany({
                                $or: [{ _id: userId }, { _id: friendId }],
                            }, {
                                $pull: {
                                    Friends: {
                                        $in: [friendId, userId],
                                    },
                                },
                            })
                                .exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Removed",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_26 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    UserModel.GiftToUser = function (UserId, GiftType, InsteadOf) {
        if (InsteadOf === void 0) { InsteadOf = false; }
        return __awaiter(this, void 0, void 0, function () {
            var Gifts, UserInventory, UserInventoryIds_1, UserGifts, Booster, AllAvatarRarities, AllRarities, RaritiesWithChance, rarity, rarity, rarity, SelectedRare_1, SelectedGifts, SelectedGift, e_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, shop_model_1.default.Gifts(GiftType)];
                    case 1:
                        Gifts = _a.sent();
                        return [4, inventory_model_1.default.GetInventory(UserId)];
                    case 2:
                        UserInventory = _a.sent();
                        UserInventory = UserInventory.Payload;
                        UserInventoryIds_1 = UserInventory.map(function (item) {
                            return item.ProductId.toString();
                        });
                        UserGifts = Gifts.filter(function (item) {
                            var notInInventory = !UserInventoryIds_1.includes(item._id.toString());
                            var CoinType = item.Type === shop_interface_1.Type.Coin;
                            return notInInventory || CoinType;
                        });
                        if (GiftType === shop_interface_1.Type.Booster) {
                            Booster = UserInventory.filter(function (item) {
                                return item.Type === shop_interface_1.Type.Booster;
                            });
                            if (Booster.length > 0) {
                                return [2, this.GiftToUser(UserId, shop_interface_1.Type.Coin, true)];
                            }
                        }
                        if (UserGifts.length === 0 && GiftType === shop_interface_1.Type.Coin)
                            throw new Error();
                        if (UserGifts.length === 0) {
                            return [2, this.GiftToUser(UserId, shop_interface_1.Type.Coin, true)];
                        }
                        AllAvatarRarities = UserGifts.map(function (avatar) { return avatar.Rarity; });
                        AllRarities = Array.from(new Set(AllAvatarRarities));
                        RaritiesWithChance = [];
                        if (AllRarities.includes(shop_interface_1.Rarity.Common) && GiftType !== shop_interface_1.Type.Coin) {
                            rarity = Array(55);
                            rarity.fill(shop_interface_1.Rarity.Common);
                            RaritiesWithChance = RaritiesWithChance.concat(rarity);
                        }
                        if (AllRarities.includes(shop_interface_1.Rarity.Rare) && GiftType !== shop_interface_1.Type.Coin) {
                            rarity = Array(20);
                            rarity.fill(shop_interface_1.Rarity.Rare);
                            RaritiesWithChance = RaritiesWithChance.concat(rarity);
                        }
                        if (AllRarities.includes(shop_interface_1.Rarity.SuperRare) && GiftType !== shop_interface_1.Type.Coin) {
                            rarity = Array(5);
                            rarity.fill(shop_interface_1.Rarity.SuperRare);
                            RaritiesWithChance = RaritiesWithChance.concat(rarity);
                        }
                        if (GiftType === shop_interface_1.Type.Coin) {
                            if (InsteadOf) {
                                RaritiesWithChance.push(shop_interface_1.Rarity.Common);
                            }
                            else {
                                RaritiesWithChance.push(shop_interface_1.Rarity.SuperRare);
                            }
                        }
                        SelectedRare_1 = InsteadOf
                            ? shop_interface_1.Rarity.Common
                            : RaritiesWithChance.sort(function () { return 0.5 - Math.random(); })[~~(RaritiesWithChance.length * Math.random())];
                        SelectedGifts = UserGifts.filter(function (avatar) { return avatar.Rarity === SelectedRare_1; });
                        SelectedGift = SelectedGifts[~~(SelectedGifts.length * Math.random())];
                        return [4, inventory_model_1.default.AddToInventory(UserId, SelectedGift._id.toString())];
                    case 3:
                        _a.sent();
                        return [2, {
                                Message: "Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: SelectedGift._id,
                            }];
                    case 4:
                        e_27 = _a.sent();
                        console.log(e_27);
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 5: return [2];
                }
            });
        });
    };
    UserModel.SeenAdvertise = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            var AdvertisHistory, GiftType, Gift, e_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, users_schema_1.default.updateOne({ _id: UserId }, { $push: { AdvertisHistory: Date.now() } })];
                    case 1:
                        _a.sent();
                        return [4, users_schema_1.default
                                .findOne({ _id: UserId }, { AdvertisHistory: 1, Advertise: 1 })
                                .exec()];
                    case 2:
                        AdvertisHistory = _a.sent();
                        GiftType = null;
                        if (AdvertisHistory.Advertise === 1)
                            GiftType = shop_interface_1.Type.Avatar;
                        else if (AdvertisHistory.Advertise === 2)
                            GiftType = shop_interface_1.Type.Booster;
                        else if (AdvertisHistory.Advertise === 3)
                            GiftType = shop_interface_1.Type.Coin;
                        if (GiftType === null) {
                            return [2, {
                                    Message: "Faild",
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Payload: {
                                        Gift: "",
                                    },
                                }];
                        }
                        return [4, this.GiftToUser(UserId, GiftType)];
                    case 3:
                        Gift = (_a.sent()).Payload;
                        return [2, {
                                Message: "Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: { Gift: Gift },
                            }];
                    case 4:
                        e_28 = _a.sent();
                        console.log(e_28);
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 5: return [2];
                }
            });
        });
    };
    UserModel.AdvertisStatus = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, MillisecondInFourHours, lastSeen, e_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_schema_1.default
                                .findOne({ _id: UserId }, {
                                AdvertisHistory: 1,
                                AdvertiseStatus: 1,
                            })
                                .exec()];
                    case 1:
                        data = _a.sent();
                        MillisecondInFourHours = 1000 * 60 * 60 * 4;
                        lastSeen = new Date(data.AdvertisHistory[data.AdvertisHistory.length - 1]).getTime();
                        return [2, {
                                Message: "Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: {
                                    RemainingTime: data.AdvertiseStatus
                                        ? (0, utils_service_1.convertMsToHM)(0)
                                        : (0, utils_service_1.convertMsToHM)(MillisecondInFourHours - (Date.now() - lastSeen)),
                                    AdvertiseStatus: data.AdvertiseStatus,
                                },
                            }];
                    case 2:
                        e_29 = _a.sent();
                        console.log(e_29);
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
