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
exports.GameInfo = exports.Increase = exports.SetChoice = exports.PullItemFromParty = exports.PushItemToParty = exports.AddUserToFirstTalker = exports.ClearVote = exports.SetCurrentVote = exports.SetReady = exports.SaveResult = exports.CreateParty = exports.gameCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var interface_1 = require("../services/interface");
var ISaveResult = {
    _id: String(),
    GameResult: Object(),
};
var IPartyId = {
    _id: String(),
};
var IGameId = {
    GameId: String(),
};
var IGameInfo = {
    GameId: String(),
    Query: Object(),
};
var ICurrentVote = {
    GameId: String(),
    UserId: String(),
};
var IUser = {
    UserId: String,
    GameId: String,
};
var IPushItemToParty = {
    GameId: String,
    Path: String,
    Item: Object,
};
var SchemaInterface = {
    GameResult: Object(),
    FirstTalker: Array(),
    CurrentVote: String(),
    Vote: Array(),
    TempVote: Array(),
    AllJokerChoices: Array(),
    GameStage: Number(),
    GameTimes: Array(),
    ImmortalChoice: Boolean(),
    JokerChoice: Array(),
    DoctorLectureChoice: String(),
    MafiaChoice: String(),
    DetectiveChoice: String(),
    DoctorChoice: String(),
    ProfessionalChoice: String(),
    SellerChoice: String(),
    PsychiatristChoice: String(),
};
var Schema = new mongoose_1.default.Schema({
    GameResult: Object,
    FirstTalker: [{
            type: mongoose_1.default.Schema.Types.ObjectId
        }],
    CurrentVote: String,
    Vote: [{
            UserId: mongoose_1.default.Schema.Types.ObjectId,
            VictimId: mongoose_1.default.Schema.Types.ObjectId,
            IsCourt: Boolean,
            NoonSleep: Boolean,
            IsVoted: Boolean
        }],
    TempVote: [
        {
            type: Object
        }
    ],
    GameStage: {
        type: Number,
        default: 0
    },
    GameTimes: [Object],
    ImmortalChoice: Boolean,
    JokerChoice: [{ type: String }],
    KilledUsers: [{ type: String }],
    DoctorLectureChoice: String,
    MafiaChoice: String,
    DetectiveChoice: String,
    DoctorChoice: String,
    ProfessionalChoice: String,
    SellerChoice: String,
    PsychiatristChoice: String,
    AllJokerChoices: [{
            type: String
        }],
    MafiaShotRight: {
        type: String
    },
    DoctorLectureSaveItself: {
        type: Number,
        default: 1,
    },
    DoctorSaveItself: {
        type: Number,
        default: 1,
    },
    ImmortalShield: {
        type: Number,
        default: 1,
    },
    Seller: {
        type: Number,
        default: 1,
    },
    SituationRequest: {
        type: Number,
        default: 2,
    },
    Psychiatrist: {
        type: Number,
        default: 2,
    },
});
exports.gameCollectionName = "colgame";
var GameModel = mongoose_1.default.model(exports.gameCollectionName, Schema);
var CreateParty = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newGame, res, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newGame = new GameModel();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, newGame.save()];
            case 2:
                res = _a.sent();
                return [2, res._id.toString()];
            case 3:
                e_1 = _a.sent();
                return [2, false];
            case 4: return [2];
        }
    });
}); };
exports.CreateParty = CreateParty;
var SaveResult = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, model, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                isValid = (0, interface_1.CheckValidation)(ISaveResult, data);
                if (!isValid) return [3, 4];
                return [4, GameModel.findById(data._id)];
            case 1:
                model = _a.sent();
                model.GameResult = data.GameResult;
                return [4, model.save()];
            case 2:
                _a.sent();
                return [4, GameModel.updateOne({ _id: data._id }, { $set: data })];
            case 3:
                _a.sent();
                return [2, true];
            case 4: return [2, false];
            case 5: return [3, 7];
            case 6:
                e_2 = _a.sent();
                console.trace(e_2);
                return [2, false];
            case 7: return [2];
        }
    });
}); };
exports.SaveResult = SaveResult;
var SetReady = function (_a) {
    var UserId = _a.UserId, GameId = _a.GameId, Limit = _a.Limit;
    return new Promise(function (resolve, reject) {
        (0, exports.PushItemToParty)({
            Path: "Ready",
            GameId: GameId.toString(),
            Item: { UserId: UserId }
        })
            .then(function () {
            GameModel.findById(GameId).exec(function (err, model) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (model.Ready.length === Limit) {
                                model.GameStage += 1;
                            }
                            return [4, model.save()
                                    .then(function (res) {
                                    res.StartGame = model.Ready.length === Limit && res.GameStage === 1;
                                    resolve(res);
                                })
                                    .catch(function () {
                                    model.save()
                                        .then(function (res) {
                                        res.StartGame = model.Ready.length === Limit && res.GameStage === 1;
                                        resolve(res);
                                    })
                                        .catch(function (e) {
                                        reject(e);
                                    });
                                })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); });
        });
    });
};
exports.SetReady = SetReady;
var SetCurrentVote = function (_a) {
    var _b = _a.GameId, GameId = _b === void 0 ? "" : _b, _c = _a.UserId, UserId = _c === void 0 ? "" : _c;
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, interface_1.CheckValidation)(ICurrentVote, { GameId: GameId, UserId: UserId })) return [3, 2];
                    return [4, GameModel.updateOne({ _id: GameId }, { $set: { CurrentVote: UserId } })];
                case 1:
                    _a.sent();
                    resolve({ Message: "Success" });
                    return [3, 3];
                case 2:
                    reject({ Message: "Schema Error" });
                    _a.label = 3;
                case 3: return [2];
            }
        });
    }); });
};
exports.SetCurrentVote = SetCurrentVote;
var ClearVote = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                isValid = (0, interface_1.CheckValidation)(IGameId, data);
                if (!isValid) return [3, 2];
                return [4, GameModel.updateOne({ _id: data.GameId }, { $set: { Vote: [] } })
                        .catch(console.trace)];
            case 1:
                _a.sent();
                return [2, true];
            case 2: return [2, false];
            case 3: return [3, 5];
            case 4:
                e_3 = _a.sent();
                console.trace(e_3);
                return [2, false];
            case 5: return [2];
        }
    });
}); };
exports.ClearVote = ClearVote;
var AddUserToFirstTalker = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, GameModel.updateOne({ _id: data.GameId }, {
                $push: {
                    FirstTalker: data.GameId
                }
            })];
    });
}); };
exports.AddUserToFirstTalker = AddUserToFirstTalker;
var PushItemToParty = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, e_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                isValid = (0, interface_1.CheckValidation)(IPushItemToParty, data);
                if (!isValid) return [3, 2];
                return [4, GameModel.updateOne({ _id: data.GameId }, {
                        $push: (_a = {},
                            _a[data.Path] = data.Path === "Ready" ? data.Item.UserId : data.Item,
                            _a)
                    })
                        .catch(function (e) {
                        throw new Error(e);
                    })];
            case 1:
                _b.sent();
                return [2, true];
            case 2: throw new Error("Invalid Schema");
            case 3: return [3, 5];
            case 4:
                e_4 = _b.sent();
                console.trace(e_4);
                return [2, false];
            case 5: return [2];
        }
    });
}); };
exports.PushItemToParty = PushItemToParty;
var PullItemFromParty = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, e_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                isValid = (0, interface_1.CheckValidation)(IPushItemToParty, data);
                if (!isValid) return [3, 2];
                return [4, GameModel.updateOne({ _id: data.GameId }, {
                        $pull: (_a = {},
                            _a[data.Path] = data.Item,
                            _a)
                    })
                        .catch(function (e) {
                        throw new Error(e);
                    })];
            case 1:
                _b.sent();
                return [2, true];
            case 2: return [2, false];
            case 3: return [3, 5];
            case 4:
                e_5 = _b.sent();
                console.trace(e_5);
                return [2, false];
            case 5: return [2];
        }
    });
}); };
exports.PullItemFromParty = PullItemFromParty;
var SetChoice = function (_a) {
    var GameId = _a.GameId, Target = _a.Target, Action = _a.Action;
    return __awaiter(void 0, void 0, void 0, function () {
        var e_6;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4, GameModel.updateOne({ _id: GameId }, { $set: (_b = {}, _b[Action] = Target, _b) }).exec()];
                case 1:
                    _c.sent();
                    return [2, true];
                case 2:
                    e_6 = _c.sent();
                    throw new Error(e_6);
                case 3: return [2];
            }
        });
    });
};
exports.SetChoice = SetChoice;
var Increase = function (_a) {
    var GameId = _a.GameId, Path = _a.Path, Count = _a.Count;
    return __awaiter(void 0, void 0, void 0, function () {
        var e_7;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4, GameModel.updateOne({ _id: GameId }, { $inc: (_b = {}, _b[Path] = Count, _b) }).exec()];
                case 1:
                    _c.sent();
                    return [2, true];
                case 2:
                    e_7 = _c.sent();
                    throw new Error(e_7);
                case 3: return [2];
            }
        });
    });
};
exports.Increase = Increase;
var GameInfo = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(0, interface_1.CheckValidation)(IGameId, data)) return [3, 2];
                return [4, GameModel.findById(data.GameId.toString(), data.Query).exec()];
            case 1: return [2, _a.sent()];
            case 2:
                console.trace("Schema Error");
                throw new Error("return false");
            case 3: return [3, 5];
            case 4:
                e_8 = _a.sent();
                console.trace(e_8);
                throw new Error(e_8);
            case 5: return [2];
        }
    });
}); };
exports.GameInfo = GameInfo;
