"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_redis_1 = __importDefault(require("../models/game.redis"));
var inventory_model_1 = __importDefault(require("../../Inventory/inventory.model"));
var Filimo = require("../../Core/LevelAndXP/LevelAndXP").Filimo;
var CoreScenario = require("./core.scenario");
var Scores = require("../score/filimo.score.json");
var fs = require("fs");
var _a = require("../interfaces/filimo.interface"), PartyBasicModel = _a.PartyBasicModel, EnvironmentSetting = _a.EnvironmentSetting, SendMessageToRoleInterface = _a.SendMessageToRoleInterface, Roles = _a.Roles, Sides = _a.Sides, MayorAction = _a.MayorAction, LastChanceEnum = _a.LastChanceEnum, LastChance = _a.LastChance, Times = _a.Times, MafiaRoles = _a.MafiaRoles, GameStatus = _a.GameStatus, Opinions = _a.Opinions, GameStates = _a.GameStates, RolesName = _a.RolesName, PartyState = _a.PartyState;
var UserManager = require("../../Users/users.model").default;
var GameModel = require("../models/game.model");
var CheckValidation = function (InputInterface, data) {
    try {
        var instance = new InputInterface();
        var Evaluate = instance.Evaluate(data);
        if (Evaluate.length > 0) {
            console.trace(Evaluate);
        }
        return Evaluate.length === 0;
    }
    catch (e) {
        return false;
    }
};
var FilimoKeys = require("../events/socket.keys").Filimo;
var base = "Filimo@";
var Triggers = {
    Speak: base + "Speak",
    ExecutionAnimation: base + "ExecutionAnimation",
    IntroNight: base + "IntroNight",
    ConcludeTheNight: base + "ConcludeTheNight",
    Opinion: base + "UserOpinion",
    ChallengeRequest: base + "ChallengeRequest",
    AcceptChallenge: base + "AcceptChallenge",
    Vote: base + "Vote",
    PassCourtSpeak: base + "PassCourtSpeak",
    Mayor: base + "Mayor",
    LastChance: base + "LastChance",
    LastChanceResult: base + "LastChanceResult",
    Night: base + "Night",
    Day: base + "Day",
    MafiaShot: base + "MafiaShot",
    EndGame: base + "EndGame",
    ScoreBoard: base + "ScoreBoard",
    MayorAbility: base + "MayorAbility",
};
var BYPASS = false;
var FilimoScenario = (function (_super) {
    __extends(FilimoScenario, _super);
    function FilimoScenario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilimoScenario.JoinToRoom = function (data, socket, cb) {
        if (cb === void 0) { cb = function () { }; }
        var roomName;
        if (data.GameId) {
            roomName = this.RoomsTools.party(data.GameId.toString());
            socket.join(roomName);
        }
        console.log("[".concat(Date.now(), "]: ").concat(this.io.sockets.adapter.rooms[this.RoomsTools.party(data.GameId)].length));
        if (this.io.sockets.adapter.rooms[this.RoomsTools.party(data.GameId)]
            .length === 12)
            cb();
        return true;
    };
    FilimoScenario.FirstVoteVotingRight = function (_a) {
        var GameId = _a.GameId, UserId = _a.UserId;
        var GameInfo = this.GetPartyInfo({ GameId: GameId });
        var VoteRightList = GameInfo.Alive;
        VoteRightList = VoteRightList.filter(function (item) {
            return !GameInfo.DisconnectedUsers.includes(item) && item !== UserId;
        });
        return VoteRightList;
    };
    FilimoScenario.isSituationRequestUseful = function (ImmortalChoice, SituationRequest, isSniperShot, UsefulSituationRequest) {
        return isSniperShot || UsefulSituationRequest;
    };
    FilimoScenario.SetOnlineTime = function (userId, gameId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.PartiesInfo[gameId].OfflineTime[userId] = 0;
                return [2];
            });
        });
    };
    FilimoScenario.SetOfflineTime = function (userId, gameId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.PartiesInfo[gameId].OfflineTime[userId] = Date.now();
                return [2];
            });
        });
    };
    var _b;
    _b = FilimoScenario;
    FilimoScenario.GameConfigs = {};
    FilimoScenario.PartiesInfo = {};
    FilimoScenario.GameConfigTools = {
        Increase: function (_a) {
            var GameId = _a.GameId, Path = _a.Path, _c = _a.Count, Count = _c === void 0 ? 1 : _c;
            return (FilimoScenario.GameConfigs[GameId][Path] += Count);
        },
        Get: function (_a) {
            var GameId = _a.GameId, Path = _a.Path;
            return FilimoScenario.GameConfigs[GameId][Path];
        },
        Destroy: function (_a) {
            var GameId = _a.GameId;
            delete FilimoScenario.GameConfigs[GameId];
        },
        ResetInEndPassTurn: function (_a) {
            var GameId = _a.GameId;
            FilimoScenario.GameConfigs[GameId].LastChanceCard = 0;
            FilimoScenario.GameConfigs[GameId].StartSpeak = 0;
            FilimoScenario.GameConfigs[GameId].ExecutionAnimation = 0;
        },
        ResetConfigs: function (_a) {
            var GameId = _a.GameId;
            FilimoScenario.GameConfigs[GameId].FirstVote = 0;
            FilimoScenario.GameConfigs[GameId].SecondVote = 0;
            FilimoScenario.GameConfigs[GameId].Mayor = 0;
        },
        ResetNightConfigs: function (_a) {
            var GameId = _a.GameId;
            FilimoScenario.GameConfigs[GameId].ConcludeTheNight = 0;
        },
    };
    FilimoScenario.ioTools = {
        GetRoomMembersLength: function (RoomName) {
            return FilimoScenario.io.sockets.adapter.rooms[RoomName].length;
        },
        GetQuery: function (SocketNode) {
            return SocketNode.handshake.query;
        },
        GetClients: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.io
                    .of(NameSpace)
                    .in(Room)
                    .clients(function (error, socketIds) {
                    if (error)
                        reject(error);
                    else
                        resolve(socketIds);
                });
            });
        },
        GetUser: function (SocketId) {
            return io.sockets.sockets[SocketId];
        },
    };
    FilimoScenario.RoomsTools = {
        Destroy: function (Room, NameSpace) {
            if (NameSpace === void 0) { NameSpace = "/"; }
            this.io
                .of(NameSpace)
                .in(Room)
                .clients(function (error, socketIds) {
                if (error)
                    throw error;
                socketIds.forEach(function (socketId) {
                    return io.sockets.sockets[socketId].leave(Room);
                });
            });
        },
        party: function (GameId) {
            return "Party@".concat(GameId);
        },
    };
    FilimoScenario.IsGameGoingOn = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), Alive = _c.Alive, UsersData = _c.UsersData, Kills = _c.Kills;
        if (!UsersData)
            return;
        var AliveUsersData = UsersData === null || UsersData === void 0 ? void 0 : UsersData.filter(function (User) {
            return Alive.includes(User.UserId);
        });
        var CountMembersOfMafia = AliveUsersData === null || AliveUsersData === void 0 ? void 0 : AliveUsersData.filter(function (User) {
            return MafiaRoles.includes(User.UserRole);
        }).length;
        var CountMembersOfCitizen = AliveUsersData === null || AliveUsersData === void 0 ? void 0 : AliveUsersData.filter(function (User) {
            return !MafiaRoles.includes(User.UserRole);
        }).length;
        console.log("IsGameGoingOn: ", {
            AliveUsersDataLength: AliveUsersData.length,
            Kills: Kills,
            KillsLength: Kills.length,
            CountMembersOfMafia: CountMembersOfMafia,
            CountMembersOfCitizen: CountMembersOfCitizen,
        });
        if (CountMembersOfMafia === 0) {
            return GameStatus.CitizenWin;
        }
        if (CountMembersOfCitizen <= CountMembersOfMafia) {
            return GameStatus.MafiaWin;
        }
        return GameStatus.Continue;
    };
    FilimoScenario.RemoveParty = function (_a) {
        var GameId = _a.GameId;
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                IsGameEnded: true,
            },
        });
        delete _b.PartiesInfo[GameId];
    };
    FilimoScenario.GameEndProcess = function (_a) {
        var GameId = _a.GameId, Win = _a.Win;
        var EndTime = Date.now();
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                EndTime: EndTime,
                Win: Win,
            },
        });
        _b.ScoreBoardService.CalculateScoreBoard(GameId);
        var _c = _b.GetPartyInfo({ GameId: GameId }), StartTime = _c.StartTime, ScoreBoard = _c.ScoreBoard;
        ScoreBoard.forEach(function (user) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_b, function (_a) {
                switch (_a.label) {
                    case 0: return [4, UserManager.IncreasePrimaryCoin(user.UserId, Quit.includes(user.UserId)
                            ? 0
                            : this.ScoreBoardService.RewardCalculate(user.MvpRank))];
                    case 1:
                        _a.sent();
                        return [4, UserManager.ResetGame({
                                gameId: GameId,
                                userId: user.UserId,
                                win: user.Side === Win,
                                xp: user.Score * user.Booster,
                            })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.ScoreBoard,
            Message: ScoreBoard,
        });
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.EndGame,
            Message: {
                GameStatus: Win,
                GameTime: _b.msToTime(EndTime - StartTime),
            },
        });
        GameModel.SaveResult(_b.GetPartyInfo({ GameId: GameId })).then(function () {
            return _b.RemoveParty({ GameId: GameId });
        });
        console.log("GameEnded");
    };
    FilimoScenario.msToTime = function (duration) {
        var seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    };
    FilimoScenario.ScoreBoard = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        var _c = _b.GetPartyInfo({ GameId: GameId }), StartTime = _c.StartTime, EndTime = _c.EndTime, ScoreBoard = _c.ScoreBoard;
        console.log("ScoreBoardEvent (GameId): ", GameId);
        console.log("ScoreBoardEvent (ScoreBoard): ", ScoreBoard);
        console.log("ScoreBoardEvent (StartTime): ", StartTime);
        console.log("ScoreBoardEvent (EndTime): ", EndTime);
        _b.SendMessageToUser({
            SocketNode: SocketNode,
            GameId: GameId,
            Event: Triggers.ScoreBoard,
            Message: {
                ScoreBoard: ScoreBoard,
                StartTime: StartTime,
                EndTime: EndTime,
                GameTime: _b.msToTime(EndTime - StartTime),
            },
        });
    };
    FilimoScenario.CheckIsGameGoingOn = function (_a) {
        var GameId = _a.GameId;
        var PartyStatus = _b.IsGameGoingOn({ GameId: GameId });
        console.log("CheckIsGameGoingOn: ", { PartyStatus: PartyStatus });
        if (PartyStatus === GameStatus.CitizenWin) {
            _b.GameEndProcess({ GameId: GameId, Win: GameStatus.CitizenWin });
        }
        else if (PartyStatus === GameStatus.MafiaWin) {
            _b.GameEndProcess({ GameId: GameId, Win: GameStatus.MafiaWin });
        }
        return PartyStatus;
    };
    FilimoScenario.SendMessageToUser = function (_a) {
        var SocketNode = _a.SocketNode, Event = _a.Event, Message = _a.Message, GameId = _a.GameId, _c = _a.asObject, asObject = _c === void 0 ? true : _c;
        var IsGameEnded = _b.GetPartyInfo({ GameId: GameId }).IsGameEnded;
        if (IsGameEnded) {
            return;
        }
        var data = !asObject ? JSON.stringify(Message) : Message;
        data = _b.EncryptData(data);
        _b.io.to(SocketNode.id).emit(Event, data);
    };
    FilimoScenario.SendMessageToParty = function (_a) {
        var GameId = _a.GameId, Event = _a.Event, Message = _a.Message, _c = _a.asObject, asObject = _c === void 0 ? true : _c;
        var IsGameEnded = _b.GetPartyInfo({ GameId: GameId }).IsGameEnded;
        if (IsGameEnded) {
            return;
        }
        var data = !asObject ? JSON.stringify(Message) : Message;
        data = _b.EncryptData(data);
        _b.io.to(_b.RoomsTools.party(GameId)).emit(Event, data);
    };
    FilimoScenario.SendMessageToRole = function (Input) {
        try {
            Input.asObject === undefined ? (Input.asObject = true) : void 0;
            var UserData_1 = _b.GetUserByRole({
                Role: Input.UserRole,
                GameId: Input.GameId,
            });
            var UsersNode = Object.values(_b.io.sockets.sockets);
            var UserNode = UsersNode.find(function (item) { return item.handshake.query.userId === UserData_1.UserId; });
            if (CheckValidation(SendMessageToRoleInterface, Input) && UserNode) {
                var data = !Input.asObject
                    ? JSON.stringify(Input.Message)
                    : Input.Message;
                data = _b.EncryptData(data);
                _b.io.to(UserNode.id).emit(Input.Event, data);
            }
        }
        catch (e) {
            console.trace(e);
            throw new Error(e);
        }
    };
    FilimoScenario.EncryptData = function (data) {
        return data;
    };
    FilimoScenario.GetUserByRole = function (_a) {
        var GameId = _a.GameId, Role = _a.Role;
        try {
            var UsersData = _b.GetPartyInfo({ GameId: GameId }).UsersData;
            return UsersData.find(function (item) { return item.UserRole === Role; });
        }
        catch (e) {
            throw new Error(e);
        }
    };
    FilimoScenario.InitParty = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _id, Members, GameMode, EnvironmentId, Scenario, BasicData, UsersData, FilimoPrice, nonVipUsers, _i, _a, user, _c, _d, e_1;
        var _e;
        return __generator(_b, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 10, , 11]);
                    _id = data._id, Members = data.Members, GameMode = data.GameMode, EnvironmentId = data.EnvironmentId, Scenario = data.Scenario;
                    BasicData = __assign({}, PartyBasicModel);
                    return [4, UserManager.GetUsersInfoByIds(Members)];
                case 1:
                    UsersData = (_f.sent()).Payload;
                    return [4, game_redis_1.default.GetPrice("Filimo")];
                case 2:
                    FilimoPrice = _f.sent();
                    BasicData.UsersData = UsersData.map(function (item) {
                        return {
                            UserId: item._id,
                            UserName: item.UserName,
                            Vip: item.Vip,
                            Character: item.Character,
                            UserRole: 0,
                            Index: 0,
                        };
                    });
                    nonVipUsers = BasicData.UsersData.filter(function (_a) {
                        var Vip = _a.Vip;
                        return !Vip;
                    }).map(function (_a) {
                        var UserId = _a.UserId;
                        return UserId;
                    });
                    return [4, UserManager.GamePay(nonVipUsers, parseInt(FilimoPrice))];
                case 3:
                    _f.sent();
                    BasicData.Members = Members;
                    BasicData._id = _id;
                    BasicData.IsGameEnded = false;
                    BasicData.Scenario = Scenario;
                    BasicData.StartTime = Date.now();
                    BasicData.Scores = {};
                    _i = 0, _a = BasicData.UsersData;
                    _f.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3, 7];
                    user = _a[_i];
                    _c = BasicData.Scores;
                    _d = user.UserId;
                    _e = {
                        UserId: user.UserId,
                        UserName: user.UserName,
                        Score: 0,
                        Role: 0
                    };
                    return [4, inventory_model_1.default.GetBooster(user.UserId.toString())];
                case 5:
                    _c[_d] = (_e.Booster = _f.sent(),
                        _e.Side = 0,
                        _e.UseAbility = 0,
                        _e.Court = 0,
                        _e.CorrectVote = 0,
                        _e.MvpRank = 0,
                        _e);
                    _f.label = 6;
                case 6:
                    _i++;
                    return [3, 4];
                case 7:
                    BasicData.Alive = Members;
                    BasicData.EnvironmentID = EnvironmentId;
                    BasicData.Votes = [];
                    BasicData.GameMode = GameMode;
                    BasicData.Ready = [];
                    BasicData.IsStarted = false;
                    BasicData.MemberLimit = 12;
                    this.UpdatePartyInfo({ _id: _id, newData: BasicData });
                    this.ResetGameConfigs(_id);
                    return [4, this.SetIndexToUsers(_id)];
                case 8:
                    _f.sent();
                    return [4, this.SetRoleToUsers(_id)];
                case 9:
                    _f.sent();
                    return [2, true];
                case 10:
                    e_1 = _f.sent();
                    console.trace(e_1);
                    return [2, false];
                case 11: return [2];
            }
        });
    }); };
    FilimoScenario.ResetGameConfigs = function (GameId) {
        _b.GameConfigs[GameId] = {};
        _b.GameConfigTools.ResetConfigs({ GameId: GameId });
        _b.GameConfigTools.ResetNightConfigs({ GameId: GameId });
        _b.GameConfigTools.ResetInEndPassTurn({ GameId: GameId });
    };
    FilimoScenario.EndFirstVoteProcess = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), RedCarpet = _c.RedCarpet, GreenPath = _c.GreenPath;
        var CourtList = _b.ConcludeFirstVote({ GameId: GameId });
        if (RedCarpet !== "")
            CourtList.push(RedCarpet);
        CourtList = CourtList.filter(function (user) { return user !== GreenPath; });
        console.log("EndFirstVoteProcess");
        console.log("CourtList");
        console.log("Concluding NoonSleep... \n result =>  ".concat(CourtList.length > 1));
        console.log(CourtList);
        CourtList.forEach(function (user) {
            _b.ScoreBoardService.Court(GameId, user);
        });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                Court: CourtList,
                CourtQueue: CourtList,
                NoonSleepStatus: CourtList.length > 1,
                RedCarpet: "",
                GreenPath: "",
            },
        });
        if (CourtList.length === 0) {
            console.log("StartDay From End First Vote Proccess");
            _b.StartNight({ GameId: GameId });
        }
        else {
            _b.PassCourtSpeak({ GameId: GameId, IsStarted: true });
        }
    };
    FilimoScenario.CourtSpeak = function (_a) {
        var GameId = _a.GameId;
        try {
            var GameInfo = _b.GetPartyInfo({ GameId: GameId });
            var CourtList = GameInfo.Court;
            var CurrentTurnUser = CourtList.shift();
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    Court: CourtList,
                    GameState: GameStates.CourtSpeak,
                },
            });
            if (CurrentTurnUser) {
                var isAlive = GameInfo.Alive.includes(CurrentTurnUser);
                var isOnline = !GameInfo.DisconnectedUsers.includes(CurrentTurnUser);
                if (isAlive && isOnline) {
                    _b.UpdatePartyInfo({
                        _id: GameId,
                        newData: {
                            CurrentTurnUser: CurrentTurnUser,
                        },
                    });
                    _b.SendMessageToParty({
                        GameId: GameId,
                        Event: Triggers.PassCourtSpeak,
                        Message: {
                            UserId: CurrentTurnUser,
                        },
                    });
                }
                else {
                    console.log("dead user passed => isAlive: ".concat(isAlive, "  isOnline: ").concat(isOnline));
                    _b.CourtSpeak({ GameId: GameId });
                }
            }
            else {
                _b.EndCourtSpeakProcess({ GameId: GameId });
            }
        }
        catch (e) {
            console.trace(e);
        }
    };
    FilimoScenario.PassCourtSpeak = function (_a) {
        var GameId = _a.GameId, _c = _a.SocketNode, SocketNode = _c === void 0 ? null : _c, _d = _a.IsStarted, IsStarted = _d === void 0 ? false : _d;
        var _e = _b.GetPartyInfo({ GameId: GameId }), Court = _e.Court, CurrentTurnUser = _e.CurrentTurnUser;
        if (CurrentTurnUser === (SocketNode === null || SocketNode === void 0 ? void 0 : SocketNode.handshake.query.userId) || IsStarted) {
            if (IsStarted)
                console.log("PassCourtSpeak IsStarted: ".concat(IsStarted));
            else
                console.log("PassCourtSpeak: ".concat(SocketNode.handshake.query.userId));
            if (Court.length === 0) {
                _b.EndCourtSpeakProcess({ GameId: GameId });
            }
            else {
                _b.CourtSpeak({ GameId: GameId });
            }
        }
        return true;
    };
    FilimoScenario.EndCourtSpeakProcess = function (_a) {
        var GameId = _a.GameId;
        console.log("EndCourtSpeakProcess");
        var _c = _b.GetPartyInfo({
            GameId: GameId,
        }), CourtQueue = _c.CourtQueue, NoonSleepStatus = _c.NoonSleepStatus;
        console.log({ NoonSleepStatus: NoonSleepStatus, Section: 2 });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                GameState: GameStates.SecondVote,
            },
        });
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.Vote,
            Message: {
                UserId: CourtQueue[0],
                IsCourt: true,
                NoonSleep: NoonSleepStatus,
            },
        });
    };
    FilimoScenario.Quit = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_b, function (_c) {
                this.PushItemToPartyInfo({
                    _id: GameId,
                    Path: "Quit",
                    Item: SocketNode.handshake.query.userId,
                });
                this.PushToKills({
                    GameId: GameId,
                    Kill: SocketNode.handshake.query.userId,
                });
                return [2];
            });
        });
    };
    FilimoScenario.ConcludeFirstVoteLimit = function (AliveCount) {
        return Math.round((AliveCount - 1) / 2);
    };
    FilimoScenario.StartConcludeTheNight = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var ConcludeTheNight;
            var _c, _d;
            return __generator(_b, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log("ConcludeTheNight");
                        this.GameConfigTools.Increase({
                            GameId: GameId,
                            Path: "ConcludeTheNight",
                            Count: 1,
                        });
                        ConcludeTheNight = this.GameConfigTools.Get({
                            GameId: GameId,
                            Path: "ConcludeTheNight",
                        });
                        if (!(ConcludeTheNight === 1)) return [3, 2];
                        console.log("Check Start Conclude The Night: ".concat(ConcludeTheNight));
                        console.log("First User Is : ".concat((_d = (_c = SocketNode === null || SocketNode === void 0 ? void 0 : SocketNode.handshake) === null || _c === void 0 ? void 0 : _c.query) === null || _d === void 0 ? void 0 : _d.userId));
                        return [4, this.ConcludeTheNight({ GameId: GameId, SocketNode: SocketNode })];
                    case 1:
                        _e.sent();
                        _e.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    FilimoScenario.SetRoleToUsers = function (GameId) {
        try {
            var PartyInfo = _b.GetPartyInfo({ GameId: GameId });
            var config = {
                "62d7bd64049b2c8bf7f28366": Roles.GodFather,
            };
            var configId_1 = {};
            for (var user in config) {
                if (PartyInfo.Members.includes(user)) {
                    configId_1[user] = config[user];
                }
            }
            var membersLength = PartyInfo.Members.length - Object.values(configId_1).length;
            var nums = new Set();
            while (nums.size !== membersLength) {
                nums.add(Math.floor(Math.random() * membersLength));
            }
            var indexes = Array.from(nums);
            var RolesInGame = Object.values(Roles);
            RolesInGame = RolesInGame.filter(function (role) {
                return !Object.values(configId_1).includes(role);
            });
            var j = 0;
            for (var i = 0; i < PartyInfo.Members.length; i++) {
                var userId = PartyInfo.UsersData[i].UserId;
                if (Object.keys(configId_1).includes(userId)) {
                    var userRole = configId_1[userId];
                    PartyInfo.UsersData[i].UserRole = userRole;
                    _b.ScoreBoardService.SetRoleAndSide(GameId, userId, userRole);
                }
                else {
                    var userRole = RolesInGame[indexes[j]];
                    PartyInfo.UsersData[i].UserRole = userRole;
                    _b.ScoreBoardService.SetRoleAndSide(GameId, userId, userRole);
                    j++;
                }
            }
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: { UsersData: PartyInfo.UsersData },
            });
            return true;
        }
        catch (e) {
            return false;
        }
    };
    FilimoScenario.SetRoleToUsers2 = function (GameId) {
        try {
            var PartyInfo = _b.GetPartyInfo({ GameId: GameId });
            var nums = new Set();
            while (nums.size !== PartyInfo.Members.length) {
                nums.add(Math.floor(Math.random() * PartyInfo.Members.length));
            }
            var indexes = Array.from(nums);
            var RolesInGame = Object.values(Roles);
            for (var i = 0; i < RolesInGame.length; i++) {
                var userRole = RolesInGame[indexes[i]];
                PartyInfo.UsersData[i].UserRole = userRole;
                _b.ScoreBoardService.SetRoleAndSide(GameId, PartyInfo.UsersData[i].UserId, userRole);
            }
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: { UsersData: PartyInfo.UsersData },
            });
            console.log("UsersData: ", PartyInfo.UsersData);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    FilimoScenario.SetIndexToUsers = function (GameId) { return __awaiter(void 0, void 0, void 0, function () {
        var PartyInfo, nums, indexes, index, e_2;
        return __generator(_b, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, this.GetPartyInfo({ GameId: GameId })];
                case 1:
                    PartyInfo = _a.sent();
                    nums = new Set();
                    while (nums.size !== PartyInfo.Members.length) {
                        nums.add(Math.floor(Math.random() * PartyInfo.Members.length) + 1);
                    }
                    indexes = Array.from(nums);
                    for (index in PartyInfo.Members) {
                        PartyInfo.UsersData[parseInt(index)].Index = indexes[parseInt(index)];
                    }
                    return [4, this.UpdatePartyInfo({
                            _id: GameId,
                            newData: { UsersData: PartyInfo.UsersData },
                        })];
                case 2:
                    _a.sent();
                    return [2, true];
                case 3:
                    e_2 = _a.sent();
                    return [2, false];
                case 4: return [2];
            }
        });
    }); };
    FilimoScenario.EnvSetting = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var BasicEnvData, PartyInfo;
        return __generator(_b, function (_a) {
            try {
                BasicEnvData = __assign({}, EnvironmentSetting);
                PartyInfo = this.GetPartyInfo({ GameId: data.GameId });
                BasicEnvData.MaxSize = PartyInfo.MemberLimit;
                BasicEnvData.EnvironmentID = PartyInfo.EnvironmentID;
                BasicEnvData.GameId = data.GameId;
                BasicEnvData.PartyState = PartyInfo.PartyState;
                BasicEnvData.InGameRoles = Roles;
                BasicEnvData.GameTitle = PartyInfo.GameTitle;
                BasicEnvData.Scenario = PartyInfo.Scenario;
                BasicEnvData.GameTimes = Times;
                BasicEnvData.GameMode = PartyInfo.GameMode;
                this.SendMessageToUser({
                    Message: BasicEnvData,
                    GameId: data.GameId,
                    Event: FilimoKeys.EnvSetting,
                    SocketNode: data.SocketNode,
                });
            }
            catch (e) {
                return [2, false];
            }
            return [2];
        });
    }); };
    FilimoScenario.SpeakList = function (_a) {
        var GameId = _a.GameId;
        try {
            var PartyInfo_1 = _b.GetPartyInfo({ GameId: GameId });
            if (PartyInfo_1.DayCount === 1) {
                var candidates = PartyInfo_1.Alive;
                PartyInfo_1.Starter = candidates[~~(Math.random() * candidates.length)];
                var UsersList = PartyInfo_1.UsersData.sort(function (a, b) {
                    return b.Index - a.Index;
                });
                var Index = UsersList.findIndex(function (user) {
                    return user.UserId === PartyInfo_1.Starter;
                });
                var SpeakList = __spreadArray(__spreadArray([], UsersList.slice(Index), true), UsersList.slice(0, Index), true);
                SpeakList = SpeakList.filter(function (user) {
                    return PartyInfo_1.Alive.includes(user.UserId);
                });
                PartyInfo_1.VoteList = SpeakList;
                PartyInfo_1.SpeakList = SpeakList;
                _b.UpdatePartyInfo({ _id: GameId, newData: PartyInfo_1 });
                return true;
            }
            else {
                var UsersList = PartyInfo_1.UsersData.sort(function (a, b) {
                    return b.Index - a.Index;
                });
                var Index = UsersList.findIndex(function (user) {
                    return user.UserId === PartyInfo_1.Starter;
                });
                var SpeakList = __spreadArray(__spreadArray([], UsersList.slice(Index + 2), true), UsersList.slice(0, Index + 2), true);
                SpeakList = SpeakList.filter(function (user) {
                    return PartyInfo_1.Alive.includes(user.UserId);
                });
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        Starter: SpeakList[0].UserId,
                        SpeakList: SpeakList,
                        VoteList: SpeakList,
                    },
                });
                return true;
            }
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.Execute = function (GameId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, IsStarted, UsersData;
        return __generator(_b, function (_c) {
            _a = this.GetPartyInfo({ GameId: GameId }), IsStarted = _a.IsStarted, UsersData = _a.UsersData;
            if (!IsStarted || BYPASS) {
                console.log("UsersData: ", UsersData);
                console.log("IsStarted?: ".concat(IsStarted));
                try {
                    this.UpdatePartyInfo({
                        _id: GameId,
                        newData: { IsStarted: true, _id: GameId },
                    });
                    this.StartIntroNight({ GameId: GameId });
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("StartDay From Execute(Start Game)");
                                    return [4, FilimoScenario.StartDay({
                                            GameId: GameId,
                                            SocketNode: data.SocketNode,
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); }, Times.IntroductionNight * 1000);
                    return [2, true];
                }
                catch (e) {
                    console.trace(e);
                    return [2, false];
                }
            }
            return [2];
        });
    }); };
    FilimoScenario.StartIntroNight = function (_a) {
        var GameId = _a.GameId;
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.IntroNight,
            Message: {
                GameState: true,
            },
        });
    };
    FilimoScenario.GetPartyInfo = function (_a) {
        var GameId = _a.GameId;
        try {
            var Data = JSON.stringify(_b.PartiesInfo[GameId.toString()] || {});
            return JSON.parse(Data);
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.UpdatePartyInfo = function (_a) {
        var _id = _a._id, newData = _a.newData;
        try {
            var Data = JSON.stringify(newData);
            Data = JSON.parse(Data);
            _b.PartiesInfo[_id] = __assign(__assign({}, _b.PartiesInfo[_id]), Data);
            return true;
        }
        catch (e) {
            console.log(newData);
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.PushItemToPartyInfo = function (_a) {
        var _id = _a._id, Path = _a.Path, Item = _a.Item;
        try {
            _b.PartiesInfo[_id][Path].push(Item);
        }
        catch (e) {
            console.log("PushItemToPartyInfo: ", {
                _id: _id,
                Path: Path,
                Item: Item,
                PartiesInfo: _b.PartiesInfo[_id][Path],
            });
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.IncreaseItemFromPartyInfo = function (_a) {
        var _id = _a._id, Path = _a.Path, Count = _a.Count;
        try {
            _b.PartiesInfo[_id][Path] += Count;
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.ChallengeRequest = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId;
        try {
            var CurrentTurnUser = _b.GetPartyInfo({ GameId: GameId }).CurrentTurnUser;
            var UserId = _b.ioTools.GetQuery(SocketNode).userId;
            if (CurrentTurnUser !== UserId) {
                _b.PushItemToPartyInfo({
                    _id: GameId,
                    Path: "ChallengeList",
                    Item: UserId,
                });
                _b.SendMessageToParty({
                    GameId: GameId,
                    Event: Triggers.ChallengeRequest,
                    Message: {
                        Challenge: UserId,
                    },
                });
            }
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.AcceptChallenge = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId, Challenger = _a.Challenger;
        try {
            var _c = _b.GetPartyInfo({ GameId: GameId }), ChallengeList = _c.ChallengeList, CurrentTurnUser = _c.CurrentTurnUser;
            var UserId = _b.ioTools.GetQuery(SocketNode).userId;
            console.log("AcceptChallenge: ", {
                ChallengeList: ChallengeList,
                CurrentTurnUser: CurrentTurnUser,
                UserId: UserId,
            });
            var isChallengerInChallengeList = ChallengeList === null || ChallengeList === void 0 ? void 0 : ChallengeList.includes(Challenger);
            var canUserAcceptChallenge = CurrentTurnUser === UserId;
            var isUserAcceptingChallengeOfAnotherUser = Challenger !== UserId;
            if (isChallengerInChallengeList &&
                canUserAcceptChallenge &&
                isUserAcceptingChallengeOfAnotherUser) {
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        Challenge: Challenger,
                        ChallengeList: [],
                    },
                });
                _b.SendMessageToParty({
                    GameId: GameId,
                    Event: Triggers.AcceptChallenge,
                    Message: {
                        Challenge: Challenger,
                    },
                });
            }
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.Ready = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var PartyInfo, isMember, e_3;
        var _this = _b;
        var _a;
        return __generator(_b, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    PartyInfo = this.GetPartyInfo({ GameId: data.GameId });
                    isMember = (_a = PartyInfo.Members) === null || _a === void 0 ? void 0 : _a.includes(data.UserId);
                    console.log("[Ready]: ".concat(isMember));
                    if (!isMember) return [3, 2];
                    return [4, this.JoinToRoom({ GameId: data.GameId }, data.SocketNode, function () {
                            _this.Execute(data.GameId, data).then();
                        })];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2: return [2, true];
                case 3:
                    e_3 = _c.sent();
                    console.trace(e_3);
                    return [2, false];
                case 4: return [2];
            }
        });
    }); };
    FilimoScenario.PassTurn = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode, _c = _a.IsStarted, IsStarted = _c === void 0 ? false : _c;
        var GameInfo = _b.GetPartyInfo({ GameId: GameId });
        var SpeakList = GameInfo.SpeakList || [];
        if (GameInfo.CurrentTurnUser === (SocketNode === null || SocketNode === void 0 ? void 0 : SocketNode.handshake.query.userId) ||
            IsStarted) {
            console.log("PassTurn: ".concat(SocketNode.handshake.query.userId));
            if (SpeakList.length === 0) {
                _b.EndPassTurnProcess({ GameId: GameId }).then();
            }
            else {
                _b.Speak({ GameId: GameId });
            }
        }
        return true;
    };
    FilimoScenario.Speak = function (_a) {
        var GameId = _a.GameId;
        try {
            var GameInfo = _b.GetPartyInfo({ GameId: GameId });
            var Challenge = GameInfo.Challenge !== "";
            var currentTurnUser = void 0;
            if (Challenge === false) {
                var SpeakList = GameInfo.SpeakList;
                currentTurnUser = SpeakList.shift();
                _b.UpdatePartyInfo({ _id: GameId, newData: { SpeakList: SpeakList } });
            }
            else {
                currentTurnUser = {
                    UserId: GameInfo.Challenge,
                };
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        ChallengeList: [],
                        Challenge: "",
                    },
                });
            }
            if (currentTurnUser) {
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: { CurrentTurnUser: currentTurnUser.UserId },
                });
                var isAlive = GameInfo.Alive.includes(currentTurnUser.UserId);
                var isOnline = !GameInfo.DisconnectedUsers.includes(currentTurnUser.UserId);
                var isNotSilence = GameInfo.PsychiatristChoice !== currentTurnUser.UserId;
                if (!isNotSilence) {
                    _b.UpdatePartyInfo({
                        _id: GameId,
                        newData: { PsychiatristChoice: "" },
                    });
                }
                if (isAlive && isOnline && isNotSilence) {
                    _b.SendMessageToParty({
                        GameId: GameId,
                        Event: Triggers.Speak,
                        Message: {
                            UserId: currentTurnUser.UserId,
                            Challenge: Challenge,
                        },
                    });
                }
                else {
                    console.log("".concat(Challenge ? "Challenge" : "Speak", ": "), {
                        UserId: currentTurnUser.UserId,
                        PsychiatristChoice: GameInfo.PsychiatristChoice,
                        isAlive: isAlive,
                        isOnline: isOnline,
                        isNotSilence: isNotSilence,
                    });
                    _b.Speak({ GameId: GameId });
                    console.log("".concat(Challenge ? "Challenge" : "Speak", " Passed: isAlive: ").concat(isAlive, " isOnline: ").concat(isOnline, " isNotSilence: ").concat(isNotSilence, " "));
                }
            }
            return true;
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    FilimoScenario.EndPassTurnProcess = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, VoteList_1, NoonSleepStatus_1, e_4;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.Speak,
                                Message: {
                                    UserId: "End",
                                },
                            })];
                    case 1:
                        _d.sent();
                        this.GameConfigTools.ResetInEndPassTurn({ GameId: GameId });
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                GameState: GameStates.FirstVote,
                                NoonSleepStatus: false,
                                ImmortalChoice: "",
                                PsychiatristChoice: "",
                                JokerChoice: "",
                                DoctorLectureChoice: "",
                                MafiaChoice: "",
                                DetectiveChoice: "",
                                DoctorChoice: "",
                                ProfessionalChoice: "",
                                SellerChoice: "",
                                RightToChooseCard: "",
                            },
                        });
                        console.log("End Pass Turn Process");
                        _c = this.GetPartyInfo({
                            GameId: GameId,
                        }), VoteList_1 = _c.VoteList, NoonSleepStatus_1 = _c.NoonSleepStatus;
                        setTimeout(function () {
                            console.log({ NoonSleepStatus: NoonSleepStatus_1, Section: 1 });
                            FilimoScenario.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.Vote,
                                Message: {
                                    UserId: VoteList_1[0].UserId,
                                    IsCourt: false,
                                    NoonSleep: NoonSleepStatus_1,
                                },
                            });
                        }, 5000);
                        return [3, 3];
                    case 2:
                        e_4 = _d.sent();
                        console.trace(e_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    FilimoScenario.Users = function (data) {
        var PartyInfo = _b.GetPartyInfo({ GameId: data.GameId });
        var Users = PartyInfo.UsersData.map(function (user) {
            try {
                var UserSide = _b.GetUserSide(user.UserId, data.GameId);
                var GetUserRole = _b.GetUserRole(user.UserId, data.GameId);
                var TargetSide = _b.GetUserSide(data.UserId, data.GameId);
                var UserRole = GetUserRole;
                if (UserSide !== Sides.Mafia || TargetSide !== Sides.Mafia) {
                    UserRole = 0;
                    UserSide = 0;
                }
                if (user.UserId !== data.UserId) {
                    delete user.UserRole;
                }
                else {
                    UserRole = GetUserRole;
                }
                return __assign({ IsOnline: !PartyInfo.DisconnectedUsers.includes(user.UserId), IsAlive: PartyInfo.Alive.includes(user.UserId), UserRole: UserRole, UserSide: UserSide }, user);
            }
            catch (e) {
                console.trace(e);
            }
        });
        fs.writeFileSync("logs/".concat(data.SocketNode.handshake.query.userId, ".users.json"), JSON.stringify(Users));
        _b.SendMessageToUser({
            Message: Users,
            GameId: data.GameId,
            Event: FilimoKeys.Users,
            SocketNode: data.SocketNode,
        });
    };
    FilimoScenario.ConcludeFirstVote = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), Votes = _c.Votes, Alive = _c.Alive;
        var VoteLimit = Math.round(Alive.length / 2);
        var Victims = {};
        var TrueVotes = Votes.filter(function (vote) {
            return vote.IsVoted;
        });
        for (var _i = 0, TrueVotes_1 = TrueVotes; _i < TrueVotes_1.length; _i++) {
            var Vote = TrueVotes_1[_i];
            Victims[Vote.VictimId] === undefined
                ? (Victims[Vote.VictimId] = new Set([Vote.UserId.toString()]))
                : Victims[Vote.VictimId].add(Vote.UserId.toString());
        }
        var CourtList = [];
        for (var Victim in Victims) {
            if (Victims[Victim].size >= VoteLimit)
                CourtList.push(Victim);
        }
        console.log("ConcludeFirstVote: ", {
            CourtList: CourtList,
            VoteLimit: VoteLimit,
            Victims: Victims,
            TrueVotesLength: TrueVotes.length,
        });
        return CourtList;
    };
    FilimoScenario.Vote = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var SocketNode_1, _a, NoonSleep_1, _c, IsCourt_1, UserId, GameId_1, VictimId, IsVoted, UserSide, TargetSide, NextUser_1, e_5;
        var _this = _b;
        return __generator(_b, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    SocketNode_1 = data.SocketNode, _a = data.NoonSleep, NoonSleep_1 = _a === void 0 ? false : _a, _c = data.IsCourt, IsCourt_1 = _c === void 0 ? false : _c, UserId = data.UserId, GameId_1 = data.GameId, VictimId = data.VictimId, IsVoted = data.IsVoted;
                    UserSide = this.GetUserSide(UserId, GameId_1);
                    TargetSide = this.GetUserSide(VictimId, GameId_1);
                    if (IsCourt_1 && UserSide !== TargetSide) {
                        this.ScoreBoardService.CorrectVote(GameId_1, UserId);
                    }
                    this.PushItemToPartyInfo({
                        _id: GameId_1,
                        Path: "Votes",
                        Item: {
                            UserId: UserId,
                            VictimId: VictimId,
                            IsVoted: IsVoted,
                            NoonSleep: NoonSleep_1,
                            IsCourt: IsCourt_1,
                        },
                    });
                    NextUser_1 = IsCourt_1
                        ? this.NextSecondVote({ SocketNode: SocketNode_1, GameId: GameId_1, UserId: VictimId })
                        : this.NextFirstVote({ SocketNode: SocketNode_1, GameId: GameId_1, UserId: VictimId });
                    if (!(!!NextUser_1 && SocketNode_1)) return [3, 1];
                    setTimeout(function () {
                        _this.SendMessageToUser({
                            Message: {
                                UserId: NextUser_1,
                                IsCourt: IsCourt_1,
                                NoonSleep: NoonSleep_1,
                            },
                            GameId: GameId_1,
                            Event: Triggers.Vote,
                            SocketNode: SocketNode_1,
                        });
                    }, 1500);
                    return [3, 3];
                case 1: return [4, this.SendMessageToUser({
                        Message: {
                            UserId: "End",
                            IsCourt: IsCourt_1,
                            NoonSleep: NoonSleep_1,
                        },
                        GameId: GameId_1,
                        Event: Triggers.Vote,
                        SocketNode: SocketNode_1,
                    })];
                case 2:
                    _d.sent();
                    if (IsCourt_1) {
                        this.EndSecondVoteForUser({ SocketNode: SocketNode_1, GameId: GameId_1 }).then();
                    }
                    else {
                        this.EndFirstVoteForUser({ SocketNode: SocketNode_1, GameId: GameId_1 }).then();
                    }
                    _d.label = 3;
                case 3: return [2, true];
                case 4:
                    e_5 = _d.sent();
                    console.trace(e_5);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); };
    FilimoScenario.NextFirstVote = function (_a) {
        var _c = _a.GameId, GameId = _c === void 0 ? "" : _c, _d = _a.UserId, UserId = _d === void 0 ? "" : _d;
        var VoteList = _b.GetPartyInfo({ GameId: GameId }).VoteList;
        var UserIndex = VoteList.map(function (item) { return item.UserId; }).indexOf(UserId);
        var nextUserToVote = VoteList[UserIndex + 1];
        if (VoteList.length === 0)
            return "";
        if (!nextUserToVote) {
            return "";
        }
        else {
            return nextUserToVote.UserId;
        }
    };
    FilimoScenario.EndFirstVoteForUser = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, DisconnectedUsers, Alive, Kills, connectedUser, MemberLength;
            return __generator(_b, function (_d) {
                _c = this.GetPartyInfo({ GameId: GameId }), DisconnectedUsers = _c.DisconnectedUsers, Alive = _c.Alive, Kills = _c.Kills;
                connectedUser = Alive.filter(function (item) { return !Kills.includes(item); });
                connectedUser = Alive.filter(function (item) { return !DisconnectedUsers.includes(item); });
                this.GameConfigTools.Increase({ GameId: GameId, Path: "FirstVote" });
                MemberLength = this.GameConfigTools.Get({
                    GameId: GameId,
                    Path: "FirstVote",
                });
                if (MemberLength >= connectedUser.length) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, FilimoScenario.EndFirstVoteProcess({ GameId: GameId })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); }, 1000);
                }
                return [2];
            });
        });
    };
    FilimoScenario.NextSecondVote = function (_a) {
        var _c = _a.GameId, GameId = _c === void 0 ? "" : _c, _d = _a.UserId, UserId = _d === void 0 ? "" : _d;
        var CourtQueue = _b.GetPartyInfo({ GameId: GameId }).CourtQueue;
        var UserIndex = CourtQueue.indexOf(UserId);
        if (UserIndex + 1 === CourtQueue.length) {
            return "";
        }
        else {
            return CourtQueue[UserIndex + 1];
        }
    };
    FilimoScenario.EndSecondVoteForUser = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var MembersLength;
            return __generator(_b, function (_c) {
                this.GameConfigTools.Increase({ GameId: GameId, Path: "SecondVote" });
                MembersLength = this.GameConfigTools.Get({
                    GameId: GameId,
                    Path: "SecondVote",
                });
                console.log("".concat(this.ioTools.GetQuery(SocketNode).userId, "@EndSecondVoteForUser"), MembersLength);
                if (MembersLength === 1) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, FilimoScenario.EndSecondVoteProcess({ GameId: GameId })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); }, 1000);
                }
                return [2];
            });
        });
    };
    FilimoScenario.ConcludeSecondVote = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, Votes, Alive, CourtQueue, Victims, _loop_1, _i, CourtQueue_1, Victim, MaxVoteLength, MaxVotedUsers;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.GetPartyInfo({ GameId: GameId }), Votes = _c.Votes, Alive = _c.Alive;
                        CourtQueue = this.GetPartyInfo({ GameId: GameId }).CourtQueue;
                        Victims = {};
                        _loop_1 = function (Victim) {
                            Victims[Victim] = Votes.filter(function (vote) {
                                return (vote.IsVoted && vote.IsCourt && vote.VictimId.toString() === Victim);
                            }).map(function (vote) { return vote.UserId.toString(); });
                            Victims[Victim] = new Set(Victims[Victim]);
                        };
                        for (_i = 0, CourtQueue_1 = CourtQueue; _i < CourtQueue_1.length; _i++) {
                            Victim = CourtQueue_1[_i];
                            _loop_1(Victim);
                        }
                        MaxVoteLength = this.SecondVoteMaxVote(Victims);
                        MaxVotedUsers = this.SecondVoteMaxVotedUsers(Victims, MaxVoteLength);
                        console.log("ConcludeSecondVote: ", {
                            MaxVotedUsers: MaxVotedUsers,
                            MaxVoteLength: MaxVoteLength,
                            Victims: Victims,
                            CourtQueueLength: CourtQueue.length,
                            AliveLength: Alive.length,
                        });
                        if (!(MaxVotedUsers.length === 0 || MaxVoteLength === 0)) return [3, 2];
                        console.log("StartNight From Nobody Vote");
                        return [4, this.StartNight({ GameId: GameId })];
                    case 1:
                        _d.sent();
                        return [3, 9];
                    case 2:
                        if (!(MaxVotedUsers.length === 1)) return [3, 7];
                        if (!(CourtQueue.length === 1 &&
                            MaxVoteLength < this.ConcludeFirstVoteLimit(Alive.length))) return [3, 4];
                        console.log("StartDay From Votes Length < Vote Limit");
                        return [4, this.StartNight({ GameId: GameId })];
                    case 3:
                        _d.sent();
                        return [3, 6];
                    case 4: return [4, this.UserExecute({
                            GameId: GameId,
                            DeathLottery: false,
                            UserId: MaxVotedUsers[0],
                        })];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [3, 9];
                    case 7: return [4, this.UserExecute({
                            GameId: GameId,
                            DeathLottery: true,
                            UserId: MaxVotedUsers[~~(Math.random() * MaxVotedUsers.length)],
                        })];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    FilimoScenario.EndSecondVoteProcess = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, CourtQueue, MayorAbilityStatus, CourtList, CanUseAbility;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("EndSecondVoteProcess");
                        _c = this.GetPartyInfo({
                            GameId: GameId,
                        }), CourtQueue = _c.CourtQueue, MayorAbilityStatus = _c.MayorAbilityStatus;
                        CourtList = CourtQueue.toString();
                        CanUseAbility = MayorAbilityStatus === MayorAction.NotUsed;
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                GameState: GameStates.Mayor,
                            },
                        });
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.Mayor,
                                Message: {
                                    CourtList: CourtList,
                                    CanUseAbility: CanUseAbility,
                                },
                            })];
                    case 1:
                        _d.sent();
                        return [2, true];
                }
            });
        });
    };
    FilimoScenario.Mayor = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var SocketNode, TargetId, Action, GameId, _a, MayorAbilityStatus, UsersData, MayorData;
        return __generator(_b, function (_c) {
            switch (_c.label) {
                case 0:
                    SocketNode = data.SocketNode, TargetId = data.TargetId, Action = data.Action, GameId = data.GameId;
                    _a = this.GetPartyInfo({
                        GameId: GameId,
                    }), MayorAbilityStatus = _a.MayorAbilityStatus, UsersData = _a.UsersData;
                    console.log("Mayor: ", { TargetId: TargetId, Action: Action });
                    if (!(MayorAbilityStatus === MayorAction.NotUsed)) return [3, 6];
                    if (!(Action === MayorAction.NotUsed)) return [3, 2];
                    return [4, this.MayorAbility({ SocketNode: SocketNode, TargetId: TargetId, Action: Action, GameId: GameId })];
                case 1:
                    _c.sent();
                    return [3, 5];
                case 2:
                    MayorData = UsersData.find(function (User) { return User.UserRole === Roles.Mayor; });
                    if (!(MayorData.UserId === this.ioTools.GetQuery(SocketNode).userId)) return [3, 4];
                    return [4, this.MayorAbility({ SocketNode: SocketNode, TargetId: TargetId, Action: Action, GameId: GameId })];
                case 3:
                    _c.sent();
                    return [3, 5];
                case 4:
                    console.log("AntiCheat Error...");
                    _c.label = 5;
                case 5: return [3, 8];
                case 6: return [4, this.MayorAbility({
                        TargetId: "",
                        Action: MayorAction.NotUsed,
                        GameId: GameId,
                    })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2];
            }
        });
    }); };
    FilimoScenario.MayorAbility = function (_a) {
        var TargetId = _a.TargetId, Action = _a.Action, GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var MembersLength, CourtQueue, victimRoles, _i, CourtQueue_2, victim, isUseful, TargetRole, isUseful;
            return __generator(_b, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.GameConfigTools.Increase({ GameId: GameId, Path: "Mayor" });
                        MembersLength = this.GameConfigTools.Get({ GameId: GameId, Path: "Mayor" });
                        if (!(MembersLength === 1)) return [3, 6];
                        if (Action !== MayorAction.NotUsed) {
                            this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.MayorAbility,
                                Message: {
                                    Action: Action,
                                },
                            });
                        }
                        else {
                            this.UpdatePartyInfo({
                                _id: GameId,
                                newData: {
                                    MayorAbilityStatus: Action,
                                },
                            });
                        }
                        if (!(Action === MayorAction.CancelSecondVote)) return [3, 2];
                        CourtQueue = this.GetPartyInfo({ GameId: GameId }).CourtQueue;
                        victimRoles = [];
                        for (_i = 0, CourtQueue_2 = CourtQueue; _i < CourtQueue_2.length; _i++) {
                            victim = CourtQueue_2[_i];
                            victimRoles.push(this.GetUserRole(victim, GameId));
                        }
                        isUseful = victimRoles.every(function (i) { return !MafiaRoles.includes(i); });
                        console.log("StartDay From Cancel Second Vote");
                        this.ScoreBoardService.Mayor(GameId, false, isUseful);
                        return [4, this.StartNight({ GameId: GameId })];
                    case 1:
                        _c.sent();
                        return [3, 6];
                    case 2:
                        if (!(Action === MayorAction.Execute)) return [3, 4];
                        TargetRole = this.GetUserRole(TargetId, GameId);
                        isUseful = MafiaRoles.includes(TargetRole);
                        return [4, this.UserExecute({ GameId: GameId, UserId: TargetId })];
                    case 3:
                        _c.sent();
                        this.ScoreBoardService.Mayor(GameId, isUseful, false);
                        return [3, 6];
                    case 4: return [4, this.ConcludeSecondVote({ GameId: GameId })];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    FilimoScenario.UserExecute = function (_a) {
        var GameId = _a.GameId, DeathLottery = _a.DeathLottery, UserId = _a.UserId;
        return __awaiter(void 0, void 0, void 0, function () {
            var Alive, Kills, RandomNumber, ExecutedUser, LastChanceCardCode;
            return __generator(_b, function (_c) {
                switch (_c.label) {
                    case 0:
                        Alive = this.GetPartyInfo({ GameId: GameId }).Alive;
                        Kills = [];
                        RandomNumber = ~~(Math.random() * Object.keys(LastChanceEnum).length);
                        ExecutedUser = this.GetUserById(UserId, GameId);
                        LastChanceCardCode = Object.keys(LastChanceEnum)[RandomNumber];
                        if (LastChanceCardCode !== LastChanceEnum.BeautifulMind) {
                            Kills.push(UserId);
                        }
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                LastChanceCardCode: LastChanceCardCode,
                                RightToChooseCard: UserId,
                                UsefulSituationRequest: true,
                                GameState: GameStates.LastChanceCard,
                                ExecutionAnimationUserId: ExecutedUser.Vip ? UserId : null,
                            },
                        });
                        return [4, this.PushToKills({ GameId: GameId, Kills: Kills })];
                    case 1:
                        _c.sent();
                        console.log("UserExecute", {
                            UserId: UserId,
                            DeathLottery: DeathLottery,
                            LastChanceCardCode: LastChanceCardCode,
                            Alive: Alive.toString(),
                        });
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.LastChance,
                                Message: {
                                    Alive: Alive.toString(),
                                    UserId: UserId,
                                    DeathLottery: DeathLottery,
                                    LastChanceCardCode: LastChanceCardCode,
                                },
                            })];
                    case 2:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    FilimoScenario.UseAbility = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var SocketNode, GameId, UserRole, Target, UserId, SenderRole, MafiaShotRight;
        return __generator(_b, function (_a) {
            SocketNode = data.SocketNode, GameId = data.GameId, UserRole = data.UserRole, Target = data.Target;
            UserId = this.ioTools.GetQuery(SocketNode).userId;
            console.log("UseAbility: ", {
                GameId: GameId,
                UserRole: UserRole,
                Target: Target,
            });
            SenderRole = this.GetUserRole(UserId, GameId);
            MafiaShotRight = this.GetPartyInfo({ GameId: GameId }).MafiaShotRight;
            if (UserRole === Roles.GodFather && UserId === MafiaShotRight) {
                this.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        MafiaChoice: Target,
                    },
                });
            }
            console.log("UseAbility(Validation): ", {
                SenderRole: SenderRole,
                UserRole: UserRole,
                UserId: UserId,
                MafiaShotRight: MafiaShotRight,
            });
            if (SenderRole === UserRole && Target !== "") {
                if (UserRole === Roles.Professional) {
                    this.UpdatePartyInfo({
                        _id: GameId,
                        newData: {
                            UsefulSituationRequest: true,
                        },
                    });
                }
                if ([
                    Roles.Doctor,
                    Roles.DoctorLecture,
                    Roles.Psychiatrist,
                    Roles.Seller,
                ].includes(UserRole)) {
                    this.LimitedAbility({
                        GameId: GameId,
                        Target: Target,
                        UserId: UserId,
                        UserRole: UserRole,
                    });
                }
                if ([Roles.Professional, Roles.Detective, Roles.Immortal].includes(UserRole)) {
                    this.UnLimitedAbility({
                        GameId: GameId,
                        Target: Target,
                        UserRole: UserRole,
                    });
                }
                if (UserRole === Roles.Joker) {
                    this.JokerChoice({ GameId: GameId, Target: Target });
                }
            }
            return [2];
        });
    }); };
    FilimoScenario.JokerChoice = function (_a) {
        var GameId = _a.GameId, Target = _a.Target;
        var AllJokerChoices = _b.GetPartyInfo({ GameId: GameId }).AllJokerChoices;
        if (!AllJokerChoices.includes(Target)) {
            _b.PushItemToPartyInfo({
                _id: GameId,
                Path: "AllJokerChoices",
                Item: Target,
            });
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    JokerChoice: Target,
                },
            });
        }
    };
    FilimoScenario.UnLimitedAbility = function (_a) {
        var _c, _d, _e;
        var GameId = _a.GameId, Target = _a.Target, UserRole = _a.UserRole;
        var PartyInfoPath = (_c = {},
            _c[Roles.Professional] = { Action: "ProfessionalChoice" },
            _c[Roles.Detective] = { Action: "DetectiveChoice" },
            _c[Roles.Immortal] = { Action: "ImmortalChoice" },
            _c);
        console.log("UnLimitedAbility: ", (_d = {
                GameId: GameId,
                Target: Target,
                UserRole: UserRole,
                PATH: PartyInfoPath[UserRole]
            },
            _d[PartyInfoPath[UserRole].Action] = Target,
            _d));
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: (_e = {},
                _e[PartyInfoPath[UserRole].Action] = Target,
                _e),
        });
    };
    FilimoScenario.LimitedAbility = function (_a) {
        var _c, _d, _e;
        var GameId = _a.GameId, Target = _a.Target, UserId = _a.UserId, UserRole = _a.UserRole;
        var PartyInfoPath = (_c = {},
            _c[Roles.Doctor] = { Action: "DoctorChoice", Path: "DoctorSaveItself" },
            _c[Roles.DoctorLecture] = {
                Action: "DoctorLectureChoice",
                Path: "DoctorLectureSaveItself",
            },
            _c[Roles.Psychiatrist] = {
                Action: "PsychiatristChoice",
                Path: "Psychiatrist",
            },
            _c[Roles.Seller] = { Action: "SellerChoice", Path: "Seller" },
            _c);
        var _f = _b.GetPartyInfo({
            GameId: GameId,
        }), _g = PartyInfoPath[UserRole].Path, AbilityCount = _f[_g];
        if (([Roles.Doctor, Roles.DoctorLecture].includes(UserRole) &&
            Target === UserId &&
            AbilityCount > 0) ||
            ([Roles.Psychiatrist, Roles.Seller].includes(UserRole) &&
                AbilityCount > 0)) {
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: (_d = {},
                    _d[PartyInfoPath[UserRole].Action] = Target,
                    _d),
            });
            _b.IncreaseItemFromPartyInfo({
                _id: GameId,
                Path: PartyInfoPath[UserRole].Path,
                Count: -1,
            });
        }
        else if (Target !== UserId &&
            [Roles.Doctor, Roles.DoctorLecture].includes(UserRole)) {
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: (_e = {},
                    _e[PartyInfoPath[UserRole].Action] = Target,
                    _e),
            });
        }
    };
    FilimoScenario.StartDay = function (_a) {
        var GameId = _a.GameId;
        var PartyStatus = _b.CheckIsGameGoingOn({ GameId: GameId });
        var _c = _b.GetPartyInfo({
            GameId: GameId,
        }), DayCount = _c.DayCount, ExecutionAnimationUserId = _c.ExecutionAnimationUserId;
        if (ExecutionAnimationUserId !== null) {
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    ExecutionAnimationNextStep: GameStates.Day,
                },
            });
            _b.StartExecutionAnimation({ GameId: GameId });
            return;
        }
        console.log("PartyStatus: ".concat(PartyStatus));
        console.log("GameId: ".concat(GameId));
        console.log("\n    \n    \n      [START DAY ".concat(DayCount, "]\n  \n  \n    \n    "));
        if (PartyStatus === GameStatus.Continue) {
            _b.SetDayData({ GameId: GameId });
            var _d = _b.GetPartyInfo({ GameId: GameId }), Alive = _d.Alive, Kills = _d.Kills, DayCount_1 = _d.DayCount;
            console.log("Triggers.Day: ".concat(DayCount_1));
            _b.SendMessageToParty({
                GameId: GameId,
                Event: Triggers.Day,
                Message: {
                    Alive: Alive.toString(),
                    Kills: Kills.toString(),
                    DayCount: DayCount_1,
                },
            });
            _b.SpeakList({ GameId: GameId });
        }
    };
    FilimoScenario.StartSpeak = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "StartSpeak" });
        var MemberLength = _b.GameConfigTools.Get({
            GameId: GameId,
            Path: "StartSpeak",
        });
        console.log("StartSpeakRequest: ".concat(MemberLength));
        if (MemberLength === 1) {
            setTimeout(function () {
                _b.PassTurn({ GameId: GameId, SocketNode: SocketNode, IsStarted: true });
            }, 1000);
        }
    };
    FilimoScenario.UserOpinion = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId, Opinion = _a.Opinion;
        console.log("UserOpinion: ", {
            UserId: _b.ioTools.GetQuery(SocketNode).userId,
            Opinion: Opinion,
        });
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.Opinion,
            Message: {
                UserId: _b.ioTools.GetQuery(SocketNode).userId,
                Opinion: Opinion,
            },
        });
    };
    FilimoScenario.SetDayData = function (_a) {
        var GameId = _a.GameId;
        console.log("SetDayData");
        _b.GameConfigTools.ResetConfigs({ GameId: GameId });
        _b.IncreaseDayCount({ GameId: GameId });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                CurrentTurnUser: "",
                SpeakList: [],
                OrderedSpeakList: [],
                Court: [],
                CourtQueue: [],
                VoteList: [],
                Votes: [],
                MafiaShotIsDisable: false,
                GameState: GameStates.PassTurn,
            },
        });
    };
    FilimoScenario.SetNightData = function (_a) {
        var GameId = _a.GameId;
        console.log("SetNightData");
        _b.GameConfigTools.ResetNightConfigs({ GameId: GameId });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                GameState: GameStates.Night,
            },
        });
        _b.IncreaseNightCount({ GameId: GameId });
    };
    FilimoScenario.DisconnectedUsers = function (_a) {
        var GameId = _a.GameId;
        var DisconnectedUsers = _b.GetPartyInfo({ GameId: GameId }).DisconnectedUsers;
        return DisconnectedUsers;
    };
    FilimoScenario.IncreaseDayCount = function (_a) {
        var GameId = _a.GameId;
        _b.IncreaseItemFromPartyInfo({
            _id: GameId,
            Path: "DayCount",
            Count: 1,
        });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                PartyState: PartyState.Day,
            },
        });
    };
    FilimoScenario.IncreaseNightCount = function (_a) {
        var GameId = _a.GameId;
        _b.IncreaseItemFromPartyInfo({
            _id: GameId,
            Path: "NightCount",
            Count: 1,
        });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                PartyState: PartyState.Night,
            },
        });
    };
    FilimoScenario.KilledUsers = function (_a) {
        var GameId = _a.GameId;
        var Kills = _b.GetPartyInfo({ GameId: GameId }).Kills;
        return Kills;
    };
    FilimoScenario.PushToKills = function (_a) {
        var GameId = _a.GameId, _c = _a.Kills, Kills = _c === void 0 ? [] : _c, _d = _a.Kill, Kill = _d === void 0 ? "" : _d;
        var PartyKills = _b.GetPartyInfo({ GameId: GameId }).Kills;
        var UniqueKills = new Set(Kills);
        UniqueKills = Array.from(UniqueKills);
        console.log("PushToKills: ");
        console.log({ UniqueKills: UniqueKills, PartyKills: PartyKills, Kills: Kills });
        if (Kill !== "" && !PartyKills.includes(Kill)) {
            _b.PushItemToPartyInfo({
                _id: GameId,
                Path: "Kills",
                Item: Kill,
            });
        }
        for (var _i = 0, UniqueKills_1 = UniqueKills; _i < UniqueKills_1.length; _i++) {
            var User = UniqueKills_1[_i];
            if (User !== "" && !PartyKills.includes(User)) {
                _b.PushItemToPartyInfo({
                    _id: GameId,
                    Path: "Kills",
                    Item: User,
                });
            }
        }
        _b.CalculateAlive({ GameId: GameId });
        _b.CheckIsGameGoingOn({ GameId: GameId });
        return true;
    };
    FilimoScenario.CalculateAlive = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), Alive = _c.Alive, Kills = _c.Kills;
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: { Alive: Alive.filter(function (item) { return !Kills.includes(item); }) },
        });
    };
    FilimoScenario.GetCitizenGroup = function (_a) {
        var GameId = _a.GameId;
        var Alive = _b.GetPartyInfo({ GameId: GameId }).Alive;
        var MafiaGroup = _b.GetMafiaGroup({ GameId: GameId });
        var Citizens = Alive.filter(function (userId) { return !MafiaGroup.includes(userId); });
        return Citizens;
    };
    FilimoScenario.GetRandomCitizen = function (_a) {
        var GameId = _a.GameId;
        var CitizenGroup = _b.GetCitizenGroup({ GameId: GameId });
        return CitizenGroup[~~(Math.random() * CitizenGroup.length)];
    };
    FilimoScenario.GetMafiaGroup = function (_a) {
        var GameId = _a.GameId;
        var MafiaIds = [];
        for (var _i = 0, MafiaRoles_1 = MafiaRoles; _i < MafiaRoles_1.length; _i++) {
            var role = MafiaRoles_1[_i];
            var users = _b.GetUserByRole({ GameId: GameId, Role: role });
            MafiaIds.push(users.UserId);
        }
        return MafiaIds;
    };
    FilimoScenario.ConcludeTheNight = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var PartyInfo, Seller, NightKills, SituationRequest, Detective, isMafiaShotSuccess, isPsychiatristSuccess, isSniperShot, isRandomShot, resultMafiaShot, result;
            return __generator(_b, function (_c) {
                switch (_c.label) {
                    case 0:
                        PartyInfo = this.GetPartyInfo({ GameId: GameId });
                        Seller = PartyInfo.SellerChoice;
                        NightKills = [];
                        SituationRequest = [];
                        Detective = 0;
                        isMafiaShotSuccess = false;
                        isPsychiatristSuccess = false;
                        isSniperShot = false;
                        isRandomShot = false;
                        if (PartyInfo.MafiaChoice === "") {
                            PartyInfo.MafiaChoice = this.GetRandomCitizen({ GameId: GameId });
                            isRandomShot = true;
                        }
                        if (PartyInfo.MafiaChoice !== "") {
                            resultMafiaShot = this.ConcludeMafiaShot(__assign({ GameId: GameId }, PartyInfo));
                            console.log("[INFO]: Mafia Shot Kill Is Seted: ".concat(resultMafiaShot));
                            NightKills.push(resultMafiaShot);
                            console.log("[INFO]: Mafia Shot Kill Is Pushed? : ".concat(NightKills.includes(resultMafiaShot)));
                            isMafiaShotSuccess = resultMafiaShot !== "";
                            console.log("[INFO]: Mafia Shot Kill Is Success? : ".concat(isMafiaShotSuccess));
                        }
                        if (PartyInfo.ProfessionalChoice !== "") {
                            result = this.ConcludeProfessionalShot(__assign({ GameId: GameId }, PartyInfo));
                            if (result !== "")
                                isSniperShot = true;
                            NightKills.push(result);
                        }
                        if (PartyInfo.DetectiveChoice !== "") {
                            Detective = this.ConcludeDetective(__assign({ GameId: GameId }, PartyInfo)) ? 1 : 2;
                        }
                        if (PartyInfo.PsychiatristChoice !== "" && PartyInfo.Psychiatrist > 0) {
                            isPsychiatristSuccess = this.ConcludePsychiatrist(__assign({ GameId: GameId }, PartyInfo));
                        }
                        NightKills = NightKills.filter(function (item) { return item !== ""; });
                        this.PushToKills({
                            GameId: GameId,
                            Kills: NightKills,
                        });
                        if (PartyInfo.DoctorLectureChoice) {
                            this.ScoreBoardService.DoctorLecture(GameId, PartyInfo.ProfessionalChoice === PartyInfo.DoctorLectureChoice);
                        }
                        if (isMafiaShotSuccess && !isRandomShot) {
                            this.ScoreBoardService.Shot(GameId);
                        }
                        if (PartyInfo.JokerChoice) {
                            this.ScoreBoardService.Joker(GameId, PartyInfo.JokerChoice === PartyInfo.DetectiveChoice);
                        }
                        if (PartyInfo.DoctorChoice) {
                            this.ScoreBoardService.Doctor(GameId, PartyInfo.DoctorChoice === PartyInfo.MafiaChoice);
                        }
                        if (!(PartyInfo.ImmortalChoice === "Yes" && PartyInfo.SituationRequest > 0)) return [3, 2];
                        this.ScoreBoardService.Immortal(GameId, this.isSituationRequestUseful(PartyInfo.ImmortalChoice, PartyInfo.SituationRequest, isSniperShot, PartyInfo.UsefulSituationRequest));
                        return [4, this.SituationRequest(__assign({ GameId: GameId }, PartyInfo))];
                    case 1:
                        SituationRequest = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (Seller !== "") {
                            this.ScoreBoardService.Seller(GameId, Seller);
                        }
                        if (PartyInfo.SellerChoice !== "")
                            this.ConcludeSeller(__assign({ GameId: GameId }, PartyInfo));
                        console.log("PartyInfo: ", {
                            ImmortalChoice: PartyInfo.ImmortalChoice,
                            JokerChoice: PartyInfo.JokerChoice,
                            DoctorLectureChoice: PartyInfo.DoctorLectureChoice,
                            MafiaChoice: PartyInfo.MafiaChoice,
                            DetectiveChoice: PartyInfo.DetectiveChoice,
                            DoctorChoice: PartyInfo.DoctorChoice,
                            ProfessionalChoice: PartyInfo.ProfessionalChoice,
                            SellerChoice: PartyInfo.SellerChoice,
                            PsychiatristChoice: PartyInfo.PsychiatristChoice,
                            Detective: Detective,
                            isMafiaShotSuccess: isMafiaShotSuccess,
                            isSniperShot: isSniperShot,
                        });
                        console.log("ConcludeTheNight(ConcludeTheNight): ", {
                            Seller: Seller,
                            ImmortalChoice: PartyInfo.ImmortalChoice === "Yes" && PartyInfo.SituationRequest > 0,
                            NightKills: NightKills.toString(),
                            SituationRequest: SituationRequest.toString(),
                            Detective: Detective,
                            MutedUser: isPsychiatristSuccess ? PartyInfo.PsychiatristChoice : "",
                            PartyInfo_Psychiatrist: PartyInfo.Psychiatrist,
                        });
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.ConcludeTheNight,
                                Message: {
                                    Seller: Seller,
                                    ImmortalChoice: PartyInfo.ImmortalChoice === "Yes" && PartyInfo.SituationRequest > 0,
                                    Kills: NightKills.toString(),
                                    SituationRequest: SituationRequest.toString(),
                                    Detective: Detective,
                                    MutedUser: isPsychiatristSuccess ? PartyInfo.PsychiatristChoice : "",
                                },
                            })];
                    case 3:
                        _c.sent();
                        console.log("StartDay From ConcludeTheNight");
                        console.log("Remove Night Data");
                        return [4, this.StartDay({ GameId: GameId, SocketNode: SocketNode })];
                    case 4:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    FilimoScenario.SituationRequest = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var UsersData, Kills, UsersRole;
            return __generator(_b, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("[INFO]: Situation Request");
                        UsersData = this.GetPartyInfo({ GameId: GameId }).UsersData;
                        return [4, this.KilledUsers({ GameId: GameId })];
                    case 1:
                        Kills = _c.sent();
                        UsersData = UsersData.filter(function (user) {
                            return Kills.includes(user.UserId);
                        });
                        UsersRole = UsersData.map(function (user) {
                            return user.UserRole;
                        });
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                UsefulSituationRequest: false,
                            },
                        });
                        this.IncreaseItemFromPartyInfo({
                            _id: GameId,
                            Path: "SituationRequest",
                            Count: -1,
                        });
                        return [2, UsersRole];
                }
            });
        });
    };
    FilimoScenario.ConcludeSeller = function (_a) {
        var GameId = _a.GameId, SellerChoice = _a.SellerChoice;
        var UsersData = _b.GetPartyInfo({ GameId: GameId }).UsersData;
        var SellerChoiceRole = _b.GetUserRole(SellerChoice, GameId);
        var Side = Sides.Citizen;
        MafiaRoles.includes(SellerChoiceRole)
            ? (Side = Sides.Mafia)
            : (Side = Sides.Citizen);
        UsersData = UsersData.map(function (user) {
            if (user.UserId === SellerChoice)
                user.UserRole = Side === Sides.Citizen ? Roles.Citizen : Roles.Mafia;
            return user;
        });
        _b.UpdatePartyInfo({ _id: GameId, newData: { UsersData: UsersData } });
        return true;
    };
    FilimoScenario.ConcludeMafiaShot = function (_a) {
        var GameId = _a.GameId, MafiaChoice = _a.MafiaChoice, DoctorChoice = _a.DoctorChoice, ImmortalShield = _a.ImmortalShield;
        var Kill = "";
        console.log("[INFO]: Mafia Shot");
        if (MafiaChoice !== DoctorChoice) {
            console.log("[INFO]: Doctor Save Faild");
            var SelectedUserRole = _b.GetUserRole(MafiaChoice, GameId);
            if (SelectedUserRole === Roles.Immortal && ImmortalShield > 0) {
                console.log("[INFO]: Immortal Armore Save Him");
                _b.IncreaseItemFromPartyInfo({
                    _id: GameId,
                    Path: "ImmortalShield",
                    Count: -1,
                });
            }
            else {
                console.log("[INFO]: Mafia Shot Success");
                Kill = MafiaChoice;
            }
        }
        console.log("[INFO]: Mafia Shot Kill: ".concat(Kill));
        return Kill;
    };
    FilimoScenario.ConcludeProfessionalShot = function (_a) {
        var GameId = _a.GameId, ProfessionalChoice = _a.ProfessionalChoice, DoctorLectureChoice = _a.DoctorLectureChoice;
        var Kill = "";
        var CorrectShot = false;
        var KillMafia = false;
        console.log("[INFO]: ProfessionalShot");
        var SelectedUserSide = _b.GetUserSide(ProfessionalChoice, GameId);
        if (SelectedUserSide === Sides.Mafia) {
            console.log("[INFO]: Professional Selected Mafia");
            CorrectShot = true;
            if (ProfessionalChoice !== DoctorLectureChoice) {
                KillMafia = true;
                Kill = ProfessionalChoice;
            }
        }
        else if (SelectedUserSide === Sides.Citizen) {
            console.log("[INFO]: Professional Selected Citizen");
            var ProfessionalInfo = _b.GetUserByRole({
                GameId: GameId,
                Role: Roles.Professional,
            });
            Kill = ProfessionalInfo.UserId;
            console.log("ProfessionalInfo: ", {
                UserId: ProfessionalInfo.UserId,
            });
        }
        console.log("ConcludeProfessionalShot: ", {
            ProfessionalChoice: ProfessionalChoice,
            SelectedUserSide: SelectedUserSide,
            Kill: Kill,
            DoctorLectureChoice: DoctorLectureChoice,
        });
        _b.ScoreBoardService.Professional(GameId, CorrectShot, KillMafia);
        return Kill;
    };
    FilimoScenario.ConcludePsychiatrist = function (_a) {
        var GameId = _a.GameId, PsychiatristChoice = _a.PsychiatristChoice;
        var SelectedUserSide = _b.GetUserSide(PsychiatristChoice, GameId);
        _b.ScoreBoardService.Psychiatrist(GameId, SelectedUserSide === Sides.Mafia);
        return true;
    };
    FilimoScenario.ConcludeDetective = function (_a) {
        var GameId = _a.GameId, DetectiveChoice = _a.DetectiveChoice, JokerChoice = _a.JokerChoice;
        var Result = false;
        var DetectiveChoiceRole = _b.GetUserRole(DetectiveChoice, GameId);
        var CorrectInquiry = MafiaRoles.includes(DetectiveChoiceRole);
        var JokerChoiceRole = JokerChoice !== "" ? _b.GetUserRole(JokerChoice, GameId) : "";
        console.log("[INFO]: Detective Selected ".concat(RolesName[DetectiveChoiceRole]));
        console.log("[INFO]: Joker Selected ".concat(RolesName[JokerChoiceRole]));
        if ([Roles.Mafia, Roles.DoctorLecture, Roles.Joker].includes(DetectiveChoiceRole)) {
            Result = true;
        }
        if (DetectiveChoice === JokerChoice &&
            JokerChoiceRole !== Roles.GodFather) {
            Result = !Result;
        }
        _b.ScoreBoardService.Detective(GameId, CorrectInquiry, CorrectInquiry && Result);
        return Result;
    };
    FilimoScenario.StartExecutionAnimation = function (_a) {
        var GameId = _a.GameId;
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.ExecutionAnimation,
            Message: {
                Mode: ~~(Math.random() * 3) + 1,
            },
        });
    };
    FilimoScenario.ExecutionAnimation = function (_a) {
        var GameId = _a.GameId;
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "ExecutionAnimation" });
        var countExecutionAnimation = _b.GameConfigTools.Get({
            GameId: GameId,
            Path: "ExecutionAnimation",
        });
        if (countExecutionAnimation === 1) {
            var ExecutionAnimationNextStep = _b.GetPartyInfo({ GameId: GameId }).ExecutionAnimationNextStep;
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    ExecutionAnimationUserId: null,
                },
            });
            if (ExecutionAnimationNextStep === GameStates.Day)
                _b.StartDay({ GameId: GameId });
            else
                _b.StartNight({ GameId: GameId });
        }
    };
    FilimoScenario.StartNight = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({
            GameId: GameId,
        }), NightCount = _c.NightCount, ExecutionAnimationUserId = _c.ExecutionAnimationUserId;
        if (ExecutionAnimationUserId !== null) {
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    ExecutionAnimationNextStep: GameStates.Night,
                },
            });
            _b.StartExecutionAnimation({ GameId: GameId });
            return;
        }
        console.log("\n        \n    \n      [START NIGHT ".concat(NightCount, "]\n  \n  \n    \n    "));
        var PartyStatus = _b.CheckIsGameGoingOn({ GameId: GameId });
        _b.SetNightData({ GameId: GameId });
        if (PartyStatus === GameStatus.Continue) {
            var _d = _b.GetPartyInfo({ GameId: GameId }), DoctorLectureSaveItself = _d.DoctorLectureSaveItself, DoctorSaveItself = _d.DoctorSaveItself, AllJokerChoices_1 = _d.AllJokerChoices, Seller = _d.Seller, SituationRequest = _d.SituationRequest, Psychiatrist = _d.Psychiatrist, Alive = _d.Alive;
            var ShotRight = _b.ShotRight({ GameId: GameId });
            var CanMafiaShot = _b.CanMafiaShot({ GameId: GameId });
            console.log("Night: ", {
                CanMafiaShot: CanMafiaShot,
                ShotRight: CanMafiaShot ? ShotRight.UserId : "",
                DoctorLectureSaveItself: DoctorLectureSaveItself,
                DoctorSaveItself: DoctorSaveItself,
                AllJokerChoices: Alive.filter(function (user) { return !AllJokerChoices_1.includes(user); }).toString(),
                Seller: Seller,
                SituationRequest: SituationRequest,
                Psychiatrist: Psychiatrist,
                Alive: Alive.toString(),
            });
            _b.SendMessageToParty({
                GameId: GameId,
                Event: Triggers.Night,
                Message: {
                    ShotRight: CanMafiaShot ? ShotRight.UserId : "",
                    DoctorLectureSaveItself: DoctorLectureSaveItself,
                    DoctorSaveItself: DoctorSaveItself,
                    AllJokerChoices: Alive.filter(function (user) { return !AllJokerChoices_1.includes(user); }).toString(),
                    Seller: Seller,
                    SituationRequest: SituationRequest,
                    Psychiatrist: Psychiatrist,
                    Alive: Alive.toString(),
                },
            });
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    MafiaShotRight: ShotRight.UserId,
                },
            });
        }
    };
    FilimoScenario.CanMafiaShot = function (_a) {
        var GameId = _a.GameId;
        var MafiaShotIsDisable = _b.GetPartyInfo({ GameId: GameId }).MafiaShotIsDisable;
        return !MafiaShotIsDisable;
    };
    FilimoScenario.ShotRight = function (_a) {
        var GameId = _a.GameId;
        try {
            var DisconnectedUsers = _b.DisconnectedUsers({ GameId: GameId });
            var _c = _b.GetPartyInfo({ GameId: GameId }), Alive = _c.Alive, MafiaShotIsDisable = _c.MafiaShotIsDisable;
            if (MafiaShotIsDisable) {
                return "";
            }
            else {
                for (var _i = 0, MafiaRoles_2 = MafiaRoles; _i < MafiaRoles_2.length; _i++) {
                    var Role = MafiaRoles_2[_i];
                    var User = _b.GetUserByRole({ GameId: GameId, Role: Role });
                    if (User === undefined) {
                        continue;
                    }
                    var IsConnected = !DisconnectedUsers.includes(User.UserId);
                    var IsAlive = Alive.includes(User.UserId);
                    if (IsConnected && IsAlive) {
                        return { UserId: User.UserId, UserRole: User.UserRole };
                    }
                    else {
                        console.log("[Shot Right] ".concat(User.UserId, " => IsConnected: ").concat(IsConnected, " IsAlive: ").concat(IsAlive));
                    }
                }
            }
        }
        catch (e) {
            console.trace(e);
            return "";
        }
    };
    FilimoScenario.LastChanceCard = function (_a) {
        var GameId = _a.GameId, _c = _a.TargetId, TargetId = _c === void 0 ? "" : _c, _d = _a.UserRole, UserRole = _d === void 0 ? -1 : _d, SocketNode = _a.SocketNode;
        var _e = _b.GetPartyInfo({
            GameId: GameId,
        }), LastChanceCardCode = _e.LastChanceCardCode, RightToChooseCard = _e.RightToChooseCard;
        var IsCorrect = true;
        var hasAccess = _b.ioTools.GetQuery(SocketNode).userId === RightToChooseCard;
        var isTargetNotEmpty = TargetId !== "" || LastChanceCardCode === LastChance.Insomnia;
        var CanUse = hasAccess && isTargetNotEmpty;
        TargetId
            ? console.log("[INFO]LastChanceCard: ", {
                hasAccess: hasAccess,
                isTargetNotEmpty: isTargetNotEmpty,
                isFinalShot: LastChanceCardCode === LastChance.FinalShot,
            })
            : void 0;
        if (CanUse) {
            if (LastChanceCardCode === LastChance.RedCarpet) {
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        RedCarpet: TargetId,
                    },
                });
            }
            else if (LastChanceCardCode === LastChance.FinalShot) {
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        MafiaChoice: TargetId,
                        MafiaShotIsDisable: true,
                    },
                });
                _b.StartNight({ GameId: GameId });
            }
            else if (LastChanceCardCode === LastChance.GreenPath) {
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        GreenPath: TargetId,
                    },
                });
            }
            else if (LastChanceCardCode === LastChance.BeautifulMind &&
                UserRole !== -1) {
                var SelectedUserRole = _b.GetUserRole(TargetId, GameId);
                IsCorrect = SelectedUserRole === UserRole;
                if (!IsCorrect) {
                    _b.PushToKills({ GameId: GameId, Kill: TargetId });
                }
            }
            else if (LastChanceCardCode === LastChance.Insomnia) {
                _b.StartDay({ GameId: GameId, SocketNode: SocketNode });
            }
            console.log("LastChanceResult", {
                IsCorrect: IsCorrect,
                LastChanceCardCode: LastChanceCardCode,
                TargetId: TargetId,
                UserRole: UserRole,
            });
            if ([LastChance.GreenPath, LastChance.RedCarpet].includes(LastChanceCardCode)) {
                _b.SendMessageToParty({
                    GameId: GameId,
                    Event: Triggers.LastChanceResult,
                    Message: {
                        IsCorrect: IsCorrect,
                        LastChanceCardCode: LastChanceCardCode,
                        TargetId: TargetId,
                        UserRole: UserRole,
                    },
                });
            }
        }
    };
    FilimoScenario.LastChanceEnd = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "LastChanceCard", Count: 1 });
        var LastChanceCard = _b.GameConfigTools.Get({
            GameId: GameId,
            Path: "LastChanceCard",
        });
        if (LastChanceCard === 1) {
            console.log("LastChanceEnd: ".concat(LastChanceCard));
            var LastChanceCardCode = _b.GetPartyInfo({ GameId: GameId }).LastChanceCardCode;
            if (LastChanceCardCode === LastChance.Insomnia) {
                console.log("StartDay From Insomnia");
                _b.StartDay({ GameId: GameId, SocketNode: SocketNode });
            }
            else {
                console.log("StartNight From LastChanceCard");
                _b.StartNight({ GameId: GameId });
            }
        }
    };
    FilimoScenario.GetUserRole = function (UserId, GameId) {
        var UsersData = _b.GetPartyInfo({ GameId: GameId }).UsersData;
        var UserInfo = UsersData.find(function (user) {
            return user.UserId === UserId;
        });
        if (UserInfo === undefined) {
            console.trace("can't read the user role: ", UsersData);
            return Sides.Hidden;
        }
        return UserInfo.UserRole;
    };
    FilimoScenario.ScoreBoardService = {
        CorrectVote: function (GameId, UserId) {
            var UserRole = FilimoScenario.GetUserRole(UserId, GameId);
            FilimoScenario.PartiesInfo[GameId]["Scores"][UserId].Score +=
                Scores[RolesName[UserRole]].CorrectVote;
            FilimoScenario.PartiesInfo[GameId]["Scores"][UserId].CorrectVote += 1;
            console.log("[ScoreBoardService]: CorrectVote For User ".concat(UserId));
        },
        SetRoleAndSide: function (GameId, UserId, Role) {
            FilimoScenario.PartiesInfo[GameId]["Scores"][UserId].Role = Role;
            FilimoScenario.PartiesInfo[GameId]["Scores"][UserId].Side =
                MafiaRoles.includes(Role) ? Sides.Mafia : Sides.Citizen;
        },
        Shot: function (GameId) {
            var _a = FilimoScenario.GetPartyInfo({
                GameId: GameId,
            }), UsersData = _a.UsersData, MafiaShotRight = _a.MafiaShotRight;
            var MafiaSniperRole = FilimoScenario.GetUserRole(MafiaShotRight, GameId);
            var MafiaGroup = UsersData.filter(function (user) {
                return MafiaRoles.includes(user.UserRole);
            });
            console.log("Score Board Shot Right: ".concat(MafiaShotRight));
            if (!MafiaShotRight) {
                console.log("[INFO]: Mafia Shot is Disabled");
                return;
            }
            for (var _i = 0, MafiaGroup_1 = MafiaGroup; _i < MafiaGroup_1.length; _i++) {
                var mafia = MafiaGroup_1[_i];
                console.log("[ScoreBoardService]: MafiaGroupShot For User ".concat(mafia.UserId));
                FilimoScenario.PartiesInfo[GameId]["Scores"][mafia.UserId].Score +=
                    Scores.MafiaShot.MafiaShot;
            }
            FilimoScenario.PartiesInfo[GameId]["Scores"][MafiaShotRight].Score +=
                Scores[RolesName[MafiaSniperRole]].MafiaShot;
            console.log("[ScoreBoardService]: MafiaShot(MafiaShotRight) For User ".concat(MafiaShotRight));
        },
        DoctorLecture: function (GameId, isSuccess) {
            var DoctorLecture = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.DoctorLecture,
            });
            var score = isSuccess
                ? Scores.DoctorLecture.UseAbility + Scores.DoctorLecture.CorrectAbility
                : Scores.DoctorLecture.UseAbility;
            FilimoScenario.PartiesInfo[GameId]["Scores"][DoctorLecture.UserId].Score += score;
            console.log("[ScoreBoardService]: DoctorLecture.UseAbility For User ".concat(DoctorLecture.UserId));
            if (isSuccess) {
                FilimoScenario.PartiesInfo[GameId]["Scores"][DoctorLecture.UserId].UseAbility += 1;
                console.log("[ScoreBoardService]: DoctorLecture.CorrectAbility For User ".concat(DoctorLecture.UserId));
            }
        },
        Joker: function (GameId, isSuccess) {
            var Joker = FilimoScenario.GetUserByRole({ GameId: GameId, Role: Roles.Joker });
            var score = isSuccess
                ? Scores.Joker.UseAbility + Scores.Joker.CorrectAbility
                : Scores.Joker.UseAbility;
            console.log("[ScoreBoardService]: Joker.UseAbility For User ".concat(Joker.UserId));
            FilimoScenario.PartiesInfo[GameId]["Scores"][Joker.UserId].Score += score;
            if (isSuccess) {
                FilimoScenario.PartiesInfo[GameId]["Scores"][Joker.UserId].UseAbility += 1;
                console.log("[ScoreBoardService]: Joker.CorrectAbility For User ".concat(Joker.UserId));
            }
        },
        Doctor: function (GameId, isSuccess) {
            var Doctor = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.Doctor,
            });
            var score = isSuccess
                ? Scores.Doctor.UseAbility + Scores.Doctor.CorrectAbility
                : Scores.Doctor.UseAbility;
            console.log("[ScoreBoardService]: Doctor.UseAbility For User ".concat(Doctor.UserId));
            FilimoScenario.PartiesInfo[GameId]["Scores"][Doctor.UserId].Score +=
                score;
            if (isSuccess) {
                FilimoScenario.PartiesInfo[GameId]["Scores"][Doctor.UserId].UseAbility += 1;
                console.log("[ScoreBoardService]: Doctor.CorrectAbility For User ".concat(Doctor.UserId));
            }
        },
        Professional: function (GameId, CorrectShot, KillMafia) {
            var Professional = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.Professional,
            });
            console.log("ScoreBoard Professional: ", {
                GameId: GameId,
                CorrectShot: CorrectShot,
                KillMafia: KillMafia,
                Professional: Professional,
            });
            var score = Scores.Professional.UseAbility;
            console.log("[ScoreBoardService]: Professional.UseAbility For User ".concat(Professional.UserId));
            if (CorrectShot) {
                score += Scores.Professional.CorrectShot;
                console.log("[ScoreBoardService]: Professional.CorrectShot For User ".concat(Professional.UserId));
            }
            if (KillMafia) {
                score += Scores.Professional.KillMafia;
                console.log("[ScoreBoardService]: Professional.KillMafia For User ".concat(Professional.UserId));
            }
            FilimoScenario.PartiesInfo[GameId]["Scores"][Professional.UserId].Score +=
                score;
            if (CorrectShot)
                FilimoScenario.PartiesInfo[GameId]["Scores"][Professional.UserId].UseAbility += 1;
        },
        Detective: function (GameId, CorrectInquiry, PositiveInquiry) {
            var Detective = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.Detective,
            });
            var score = Scores.Detective.UseAbility;
            console.log("[ScoreBoardService]: Detective.UseAbility For User ".concat(Detective.UserId));
            if (CorrectInquiry) {
                console.log("[ScoreBoardService]: Detective.CorrectInquiry For User ".concat(Detective.UserId));
                score += Scores.Detective.CorrectInquiry;
            }
            if (PositiveInquiry) {
                console.log("[ScoreBoardService]: Detective.PositiveInquiry For User ".concat(Detective.UserId));
                score += Scores.Detective.PositiveInquiry;
            }
            FilimoScenario.PartiesInfo[GameId]["Scores"][Detective.UserId].Score +=
                score;
            if (CorrectInquiry)
                FilimoScenario.PartiesInfo[GameId]["Scores"][Detective.UserId].UseAbility += 1;
        },
        Psychiatrist: function (GameId, isMafia) {
            var Psychiatrist = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.Psychiatrist,
            });
            var score = Scores.Psychiatrist.UseAbility;
            console.log("[ScoreBoardService]: Psychiatrist.UseAbility For User ".concat(Psychiatrist.UserId));
            if (isMafia) {
                score += Scores.Psychiatrist.MafiaBonus;
                console.log("[ScoreBoardService]: Psychiatrist.MafiaBonus For User ".concat(Psychiatrist.UserId));
            }
            FilimoScenario.PartiesInfo[GameId]["Scores"][Psychiatrist.UserId].Score +=
                score;
            if (isMafia)
                FilimoScenario.PartiesInfo[GameId]["Scores"][Psychiatrist.UserId].UseAbility += 1;
        },
        Seller: function (GameId, SelectedUserId) {
            var SelectedUserRole = FilimoScenario.GetUserRole(SelectedUserId, GameId);
            var Seller = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.Seller,
            });
            var score = Scores.Seller.UseAbility;
            console.log("[ScoreBoardService]: Seller.UseAbility For User ".concat(Seller.UserId));
            score += Scores.Seller[RolesName[SelectedUserRole]] || 0;
            FilimoScenario.PartiesInfo[GameId]["Scores"][Seller.UserId].Score +=
                score;
            if (score > Scores.Seller.UseAbility) {
                console.log("[ScoreBoardService]: Seller.CorrectAbility(".concat(RolesName[SelectedUserRole], ") For User ").concat(Seller.UserId));
                FilimoScenario.PartiesInfo[GameId]["Scores"][Seller.UserId].UseAbility += 1;
            }
        },
        Immortal: function (GameId, isUseful) {
            var Immortal = FilimoScenario.GetUserByRole({
                GameId: GameId,
                Role: Roles.Immortal,
            });
            var score = Scores.Immortal.UseAbility;
            console.log("[ScoreBoardService]: Immortal.UseAbility For User ".concat(Immortal.UserId));
            if (isUseful) {
                console.log("[ScoreBoardService]: Immortal.CorrectAbility For User ".concat(Immortal.UserId));
                score += Scores.Immortal.CorrectAbility;
            }
            FilimoScenario.PartiesInfo[GameId]["Scores"][Immortal.UserId].Score +=
                score;
            if (isUseful)
                FilimoScenario.PartiesInfo[GameId]["Scores"][Immortal.UserId].UseAbility += 1;
        },
        Mayor: function (GameId, Execute, CancelSecondVote) {
            if (Execute === void 0) { Execute = false; }
            if (CancelSecondVote === void 0) { CancelSecondVote = false; }
            var Mayor = FilimoScenario.GetUserByRole({ GameId: GameId, Role: Roles.Mayor });
            var score = Scores.Mayor.UseAbility;
            console.log("[ScoreBoardService]: Mayor Data Execute: ".concat(Execute, " CancelSecondVote: ").concat(CancelSecondVote));
            console.log("[ScoreBoardService]: Mayor.UseAbility For User ".concat(Mayor.UserId));
            if (Execute) {
                console.log("[ScoreBoardService]: Mayor.Execute For User ".concat(Mayor.UserId));
                score += Scores.Mayor.Execute;
            }
            if (CancelSecondVote) {
                console.log("[ScoreBoardService]: Mayor.CancelSecondVote For User ".concat(Mayor.UserId));
                score += Scores.Mayor.CancelSecondVote;
            }
            FilimoScenario.PartiesInfo[GameId]["Scores"][Mayor.UserId].Score += score;
            if (Execute || CancelSecondVote)
                FilimoScenario.PartiesInfo[GameId]["Scores"][Mayor.UserId].UseAbility += 1;
        },
        Court: function (GameId, UserId) {
            FilimoScenario.PartiesInfo[GameId]["Scores"][UserId].Court += 1;
        },
        RewardCalculate: function (rank) {
            var range = function (min, max) { return min + ~~(Math.random() * (max + 1)); };
            var reward = {
                1: "160-180",
                2: "155-160",
                3: "150-155",
                4: "130-135",
                5: "120-129",
                6: "110-119",
                7: "100-109",
                8: "90-99",
                9: "80-89",
                10: "70-79",
                11: "60-69",
                12: "50-59",
            };
            var min = reward[rank].split("-")[0];
            var max = reward[rank].split("-")[1];
            return range(min, max);
        },
        CalculateScoreBoard: function (GameId) {
            var ScoreBoard = Object.values(FilimoScenario.PartiesInfo[GameId]["Scores"]);
            fs.writeFileSync("./ScoreBoard.json", JSON.stringify(ScoreBoard));
            var _a = FilimoScenario.PartiesInfo[GameId], Win = _a.Win, Quit = _a.Quit;
            var Winners = ScoreBoard.filter(function (user) {
                return user.Side === Win;
            }).sort(function (a, b) { return b.Score - a.Score; });
            var Mvp1Index = ScoreBoard.findIndex(function (user) { return Winners[0].UserId === user.UserId; });
            ScoreBoard[Mvp1Index].MvpRank = 1;
            ScoreBoard.sort(function (a, b) { return b.Score - a.Score; });
            var i = 0;
            var rank = 2;
            while (i >= ScoreBoard.length) {
                if (ScoreBoard[i].UserId !== Winners[0].UserId) {
                    ScoreBoard[i].MvpRank = rank;
                    rank++;
                }
                i++;
            }
            var fakeScores = [30, 35, 40, 45];
            ScoreBoard = ScoreBoard.map(function (user) {
                if (user.Score <= 30) {
                    user.Score = fakeScores[~~(Math.random() * fakeScores.length)];
                }
                user.Score = !Quit.includes(user.UserId) ? Filimo(Win, user.Score) : 0;
                return user;
            });
            FilimoScenario.PartiesInfo[GameId]["ScoreBoard"] = ScoreBoard;
            fs.writeFileSync("ScoreBoard-".concat(Date.now(), ".json"), JSON.stringify(FilimoScenario.PartiesInfo[GameId]));
        },
    };
    FilimoScenario.GetUserById = function (UserId, GameId) {
        var UsersData = _b.GetPartyInfo({ GameId: GameId }).UsersData;
        var UserInfo = UsersData.find(function (user) {
            return user.UserId === UserId;
        });
        if (UserInfo === undefined) {
            console.trace("can't find the user: ", UsersData);
            return {
                UserName: "",
                Character: "",
                UserId: "",
                UserRole: 0,
                Index: 0,
                Vip: false,
            };
        }
        return UserInfo;
    };
    FilimoScenario.GetUserSide = function (UserId, GameId) {
        var UserRole = _b.GetUserRole(UserId, GameId);
        if (MafiaRoles.includes(UserRole))
            return Sides.Mafia;
        else if ([
            Roles.Detective,
            Roles.Doctor,
            Roles.Professional,
            Roles.Seller,
            Roles.Immortal,
            Roles.Mayor,
            Roles.Psychiatrist,
            Roles.Citizen,
        ])
            return Sides.Citizen;
        else {
            console.trace("Can't Read the Side: ", UserRole);
            return Sides.Hidden;
        }
    };
    FilimoScenario.Disconnect = function (_a) {
        var SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var UserData, Alive, _c, CurrentTurnUser, GameState, _d, LastChanceCardCode, RightToChooseCard, e_6;
            return __generator(_b, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 12, , 13]);
                        return [4, UserManager.GetUserById(SocketNode.handshake.query.userId)];
                    case 1:
                        UserData = (_e.sent()).Payload;
                        if (!((UserData === null || UserData === void 0 ? void 0 : UserData.GameId) &&
                            this.PartiesInfo[UserData.GameId.toString()] !== undefined)) return [3, 11];
                        Alive = this.GetPartyInfo({
                            GameId: UserData.GameId.toString(),
                        }).Alive;
                        if (!Alive.includes(SocketNode.handshake.query.userId)) return [3, 10];
                        this.PushItemToPartyInfo({
                            _id: UserData.GameId.toString(),
                            Item: UserData._id.toString(),
                            Path: "DisconnectedUsers",
                        });
                        _c = this.GetPartyInfo({
                            GameId: UserData.GameId,
                        }), CurrentTurnUser = _c.CurrentTurnUser, GameState = _c.GameState;
                        return [4, this.SetOfflineTime(UserData._id.toString(), UserData.GameId.toString())];
                    case 2:
                        _e.sent();
                        console.log("[INFO]: Disconnect: ", {
                            CurrentTurnUser: CurrentTurnUser,
                            _id: SocketNode.handshake.query.userId,
                            GameState: GameState,
                        });
                        if (!(CurrentTurnUser === UserData._id.toString())) return [3, 5];
                        if (!(GameState === GameStates.PassTurn)) return [3, 3];
                        this.PassTurn({
                            GameId: UserData.GameId.toString(),
                            SocketNode: SocketNode,
                            IsStarted: false,
                        });
                        return [3, 5];
                    case 3:
                        if (!(GameState === GameStates.CourtSpeak)) return [3, 5];
                        return [4, this.PassCourtSpeak({
                                SocketNode: SocketNode,
                                GameId: UserData.GameId.toString(),
                            })];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        if (!(GameState === GameStates.LastChanceCard)) return [3, 9];
                        _d = this.GetPartyInfo({ GameId: UserData.GameId }), LastChanceCardCode = _d.LastChanceCardCode, RightToChooseCard = _d.RightToChooseCard;
                        if (!(RightToChooseCard === UserData._id.toString())) return [3, 9];
                        if (!(LastChanceCardCode === LastChance.Insomnia)) return [3, 7];
                        console.log("StartDay From Insomnia (Disconnect)");
                        return [4, this.StartDay({
                                GameId: UserData.GameId.toString(),
                                SocketNode: SocketNode,
                            })];
                    case 6:
                        _e.sent();
                        return [3, 9];
                    case 7:
                        console.log("StartDay From LastChanceCard (Disconnect)");
                        return [4, this.StartNight({ GameId: UserData.GameId.toString() })];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9:
                        this.SendMessageToParty({
                            Triggers: Triggers.Opinion,
                            GameId: UserData.GameId.toString(),
                            Message: {
                                UserId: SocketNode.handshake.query.userId,
                                Opinion: Opinions.Disconnect,
                            },
                        });
                        _e.label = 10;
                    case 10: return [2, true];
                    case 11: return [3, 13];
                    case 12:
                        e_6 = _e.sent();
                        console.trace(e_6);
                        return [3, 13];
                    case 13: return [2];
                }
            });
        });
    };
    FilimoScenario.Connect = function (_a) {
        var SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var UserData, GameId, _c, DisconnectedUsers, Alive, Scenario;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0: return [4, UserManager.GetUserById(SocketNode.handshake.query.userId)];
                    case 1:
                        UserData = (_d.sent()).Payload;
                        GameId = UserData.GameId.toString();
                        if (!(UserData.GameId && this.PartiesInfo[GameId] !== undefined)) return [3, 3];
                        _c = this.GetPartyInfo({
                            GameId: GameId,
                        }), DisconnectedUsers = _c.DisconnectedUsers, Alive = _c.Alive, Scenario = _c.Scenario;
                        if (!Alive.includes(SocketNode.handshake.query.userId)) return [3, 3];
                        SocketNode.join(this.RoomsTools.party(GameId));
                        return [4, this.SetOnlineTime(SocketNode.handshake.query.userId, GameId)];
                    case 2:
                        _d.sent();
                        DisconnectedUsers = DisconnectedUsers.filter(function (item) {
                            return item !== SocketNode.handshake.query.userId;
                        });
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: { DisconnectedUsers: __spreadArray([], new Set(DisconnectedUsers), true) },
                        });
                        this.SendMessageToParty({
                            Triggers: Triggers.Opinion,
                            GameId: GameId,
                            Message: {
                                UserId: SocketNode.handshake.query.userId,
                                Opinion: Opinions.Connect,
                            },
                        });
                        this.SendMessageToUser({
                            Triggers: "Rejoin",
                            SocketNode: SocketNode,
                            GameId: GameId,
                            Message: {
                                Scenario: Scenario,
                                GameId: GameId,
                            },
                        });
                        _d.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    FilimoScenario.SecondVoteMaxVote = function (Victims) {
        return Math.max.apply(Math, __spreadArray([], Object.values(Victims), true).map(function (vote) {
            return vote.size;
        }));
    };
    FilimoScenario.SecondVoteMaxVotedUsers = function (Victims, MaxVoteLength) {
        return Object.keys(Victims).filter(function (User) {
            return Victims[User].size === MaxVoteLength;
        });
    };
    return FilimoScenario;
}(CoreScenario));
exports.default = FilimoScenario;
