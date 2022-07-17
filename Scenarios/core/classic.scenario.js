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
var CoreScenario = require("./core.scenario");
var Scores = require("../score/classic.score.json");
var fs = require("fs");
var Classic = require("../../Core/LevelAndXP/LevelAndXP").Classic;
var _a = require("../interfaces/classic.interface"), PartyBasicModel = _a.PartyBasicModel, EnvironmentSetting = _a.EnvironmentSetting, Roles = _a.Roles, Sides = _a.Sides, LastChance = _a.LastChance, Times = _a.Times, MafiaRoles = _a.MafiaRoles, CitizenRoles = _a.CitizenRoles, GameStatus = _a.GameStatus, Opinions = _a.Opinions, GameStates = _a.GameStates, RolesName = _a.RolesName, PartyState = _a.PartyState;
var UserManager = require("../../Users/users.model").default;
var AddUserToFirstTalker = require("../models/game.model").AddUserToFirstTalker;
var GameModel = require("../models/game.model");
var ClassicKeys = require("../events/socket.keys").Classic;
var base = "Classic@";
var Triggers = {
    Speak: base + "Speak",
    IntroNight: base + "IntroNight",
    Willing: base + "Willing",
    ConcludeTheNight: base + "ConcludeTheNight",
    Opinion: base + "UserOpinion",
    ChallengeRequest: base + "ChallengeRequest",
    AcceptChallenge: base + "AcceptChallenge",
    Vote: base + "Vote",
    PassCourtSpeak: base + "PassCourtSpeak",
    ConcludeSituationRequest: base + "ConcludeSituationRequest",
    ExecutionAnimation: base + "ExecutionAnimation",
    Night: base + "Night",
    Day: base + "Day",
    MafiaShot: base + "MafiaShot",
    EndGame: base + "EndGame",
};
var BYPASS = false;
var ClassicScenario = (function (_super) {
    __extends(ClassicScenario, _super);
    function ClassicScenario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassicScenario.JoinToRoom = function (data, socket, cb) {
        if (cb === void 0) { cb = function () {
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var roomName;
            return __generator(this, function (_a) {
                if (data.GameId) {
                    roomName = this.RoomsTools.party(data.GameId.toString());
                    socket.join(roomName);
                }
                console.log("[".concat(Date.now(), "]: ").concat(this.io.sockets.adapter.rooms[this.RoomsTools.party(data.GameId)].length));
                if (this.io.sockets.adapter.rooms[this.RoomsTools.party(data.GameId)].length === 10)
                    cb();
                return [2, true];
            });
        });
    };
    ClassicScenario.FirstVoteVotingRight = function (_a) {
        var GameId = _a.GameId, UserId = _a.UserId;
        return __awaiter(this, void 0, void 0, function () {
            var GameInfo, VoteRightList;
            return __generator(this, function (_c) {
                GameInfo = this.GetPartyInfo({ GameId: GameId });
                VoteRightList = GameInfo.Alive;
                VoteRightList = VoteRightList.filter(function (item) {
                    return !GameInfo.DisconnectedUsers.includes(item) && item !== UserId;
                });
                return [2, VoteRightList];
            });
        });
    };
    ClassicScenario.isSituationRequestUseful = function (ImmortalChoice, SituationRequest, isSniperShot, UsefulSituationRequest) {
        return isSniperShot || UsefulSituationRequest;
    };
    var _b;
    _b = ClassicScenario;
    ClassicScenario.GameConfigs = {};
    ClassicScenario.PartiesInfo = {};
    ClassicScenario.GameConfigTools = {
        Increase: function (_a) {
            var GameId = _a.GameId, Path = _a.Path, _c = _a.Count, Count = _c === void 0 ? 1 : _c;
            return ClassicScenario.GameConfigs[GameId][Path] += Count;
        },
        Get: function (_a) {
            var GameId = _a.GameId, Path = _a.Path;
            return ClassicScenario.GameConfigs[GameId][Path];
        },
        Destroy: function (_a) {
            var GameId = _a.GameId;
            delete ClassicScenario.GameConfigs[GameId];
        },
        ResetInEndPassTurn: function (_a) {
            var GameId = _a.GameId;
            ClassicScenario.GameConfigs[GameId].StartSpeak = 0;
            ClassicScenario.GameConfigs[GameId].SituationRequest = 0;
            ClassicScenario.GameConfigs[GameId].ExecutionAnimation = 0;
        },
        ResetConfigs: function (_a) {
            var GameId = _a.GameId;
            ClassicScenario.GameConfigs[GameId].FirstVote = 0;
            ClassicScenario.GameConfigs[GameId].SecondVote = 0;
        },
        ResetNightConfigs: function (_a) {
            var GameId = _a.GameId;
            ClassicScenario.GameConfigs[GameId].ConcludeTheNight = 0;
        },
    };
    ClassicScenario.ioTools = {
        GetRoomMembersLength: function (RoomName) {
            return ClassicScenario.io.sockets.adapter.rooms[RoomName].length;
        },
        GetQuery: function (SocketNode) {
            return SocketNode.handshake.query;
        },
        GetClients: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.io.of(NameSpace).in(Room).clients(function (error, socketIds) {
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
    ClassicScenario.RoomsTools = {
        Destroy: function (Room, NameSpace) {
            if (NameSpace === void 0) { NameSpace = "/"; }
            this.io.of(NameSpace).in(Room).clients(function (error, socketIds) {
                if (error)
                    throw error;
                socketIds.forEach(function (socketId) { return io.sockets.sockets[socketId].leave(Room); });
            });
        },
        party: function (GameId) {
            return "Party@".concat(GameId);
        }
    };
    ClassicScenario.IsGameGoingOn = function (_a) {
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
    ClassicScenario.RemoveParty = function (_a) {
        var GameId = _a.GameId;
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                IsGameEnded: true,
            }
        });
        delete _b.PartiesInfo[GameId];
    };
    ClassicScenario.GameEndProcess = function (_a) {
        var GameId = _a.GameId, Win = _a.Win;
        console.log("Game Ended");
        var EndTime = Date.now();
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                EndTime: EndTime,
                Win: Win
            }
        });
        _b.ScoreBoardService.CalculateScoreBoard(GameId);
        var _c = _b.GetPartyInfo({ GameId: GameId }), StartTime = _c.StartTime, ScoreBoard = _c.ScoreBoard, Quit = _c.Quit;
        ScoreBoard.forEach(function (user) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_b, function (_a) {
                switch (_a.label) {
                    case 0: return [4, UserManager.IncreasePrimaryCoin(user.UserId, Quit.includes(user.UserId) ? 0 : this.ScoreBoardService.RewardCalculate(user.MvpRank))];
                    case 1:
                        _a.sent();
                        return [4, UserManager.ResetGame({
                                gameId: GameId,
                                userId: user.UserId,
                                win: user.Side === Win,
                                xp: user.Score * user.Booster
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
            Message: ScoreBoard
        });
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.EndGame,
            Message: {
                GameStatus: Win,
                GameTime: _b.msToTime(EndTime - StartTime),
            }
        });
        GameModel.SaveResult(_b.GetPartyInfo({ GameId: GameId }))
            .then(function () { return _b.RemoveParty({ GameId: GameId }); });
        console.log("GameEnded");
    };
    ClassicScenario.msToTime = function (duration) {
        var seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    };
    ClassicScenario.ScoreBoard = function (_a) {
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
            }
        });
    };
    ClassicScenario.CheckIsGameGoingOn = function (_a) {
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
    ClassicScenario.SendMessageToUser = function (_a) {
        var SocketNode = _a.SocketNode, Event = _a.Event, Message = _a.Message, GameId = _a.GameId, _c = _a.asObject, asObject = _c === void 0 ? true : _c;
        var IsGameEnded = _b.GetPartyInfo({ GameId: GameId }).IsGameEnded;
        if (IsGameEnded) {
            return;
        }
        var data = !asObject ? JSON.stringify(Message) : Message;
        data = _b.EncryptData(data);
        _b.io.to(SocketNode.id).emit(Event, data);
    };
    ClassicScenario.SendMessageToParty = function (_a) {
        var GameId = _a.GameId, Event = _a.Event, Message = _a.Message, _c = _a.asObject, asObject = _c === void 0 ? true : _c;
        var IsGameEnded = _b.GetPartyInfo({ GameId: GameId }).IsGameEnded;
        if (IsGameEnded) {
            return;
        }
        var data = !asObject ? JSON.stringify(Message) : Message;
        data = _b.EncryptData(data);
        _b.io.to(_b.RoomsTools.party(GameId)).emit(Event, data);
    };
    ClassicScenario.EncryptData = function (data) {
        return data;
    };
    ClassicScenario.GetUserByRole = function (_a) {
        var GameId = _a.GameId, Role = _a.Role;
        try {
            var UsersData = (_b.GetPartyInfo({ GameId: GameId })).UsersData;
            return UsersData.filter(function (item) { return item.UserRole === Role; });
        }
        catch (e) {
            console.trace(e);
        }
    };
    ClassicScenario.GetUserById = function (_a) {
        var GameId = _a.GameId, UserId = _a.UserId;
        try {
            var UsersData = (_b.GetPartyInfo({ GameId: GameId })).UsersData;
            return UsersData.find(function (item) { return item.UserId === UserId; });
        }
        catch (e) {
            console.trace(e);
        }
    };
    ClassicScenario.InitParty = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _id, Members, GameMode, EnvironmentId, Scenario, BasicData, UsersData, ClassicPrice, _a, _i, _c, user, e_1;
        return __generator(_b, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, , 8]);
                    _id = data._id, Members = data.Members, GameMode = data.GameMode, EnvironmentId = data.EnvironmentId, Scenario = data.Scenario;
                    BasicData = __assign({}, PartyBasicModel);
                    return [4, UserManager.GetUsersInfoByIds(Members)];
                case 1:
                    UsersData = (_d.sent()).Payload;
                    return [4, game_redis_1.default.GetPrice("Classic")];
                case 2:
                    ClassicPrice = _d.sent();
                    return [4, UserManager.GamePay(Members, parseInt(ClassicPrice))];
                case 3:
                    _d.sent();
                    BasicData.UsersData = UsersData.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = {
                                        UserId: item._id,
                                        UserName: item.UserName,
                                        Vip: item.Vip
                                    };
                                    return [4, inventory_model_1.default.GetBooster(item._id.toString())];
                                case 1: return [2, (_a.Booster = _c.sent(),
                                        _a.Character = item.Character,
                                        _a.UserRole = 0,
                                        _a.Index = 0,
                                        _a)];
                            }
                        });
                    }); });
                    _a = BasicData;
                    return [4, Promise.all(BasicData.UsersData)];
                case 4:
                    _a.UsersData = _d.sent();
                    BasicData.Members = Members;
                    BasicData._id = _id;
                    BasicData.IsGameEnded = false;
                    BasicData.Scenario = Scenario;
                    BasicData.StartTime = Date.now();
                    BasicData.Scores = {};
                    for (_i = 0, _c = BasicData.UsersData; _i < _c.length; _i++) {
                        user = _c[_i];
                        BasicData.Scores[user.UserId] = {
                            UserId: user.UserId,
                            UserName: user.UserName,
                            Score: 0,
                            Role: 0,
                            Side: 0,
                            UseAbility: 0,
                            Court: 0,
                            CorrectVote: 0,
                            MvpRank: 0,
                        };
                    }
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
                case 5:
                    _d.sent();
                    return [4, this.SetRoleToUsers(_id)];
                case 6:
                    _d.sent();
                    return [2, true];
                case 7:
                    e_1 = _d.sent();
                    console.trace(e_1);
                    return [2, false];
                case 8: return [2];
            }
        });
    }); };
    ClassicScenario.ResetGameConfigs = function (GameId) {
        _b.GameConfigs[GameId] = {};
        _b.GameConfigTools.ResetConfigs({ GameId: GameId });
        _b.GameConfigTools.ResetNightConfigs({ GameId: GameId });
        _b.GameConfigTools.ResetInEndPassTurn({ GameId: GameId });
    };
    ClassicScenario.EndFirstVoteProcess = function (_a) {
        var GameId = _a.GameId;
        var CourtList = _b.ConcludeFirstVote({ GameId: GameId });
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
                NoonSleepStatus: false,
            }
        });
        if (CourtList.length === 0) {
            console.log("StartDay From End First Vote Proccess");
            _b.StartNight({ GameId: GameId });
        }
        else {
            _b.PassCourtSpeak({ GameId: GameId, IsStarted: true });
        }
    };
    ClassicScenario.CourtSpeak = function (_a) {
        var GameId = _a.GameId;
        try {
            var GameInfo = _b.GetPartyInfo({ GameId: GameId });
            var CourtList = GameInfo.Court;
            var CurrentTurnUser = CourtList.shift();
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    Court: CourtList,
                    GameState: GameStates.CourtSpeak
                }
            });
            if (CurrentTurnUser) {
                var isAlive = GameInfo.Alive.includes(CurrentTurnUser);
                var isOnline = !GameInfo.DisconnectedUsers.includes(CurrentTurnUser);
                if (isAlive && isOnline) {
                    _b.UpdatePartyInfo({
                        _id: GameId,
                        newData: {
                            CurrentTurnUser: CurrentTurnUser
                        }
                    });
                    _b.SendMessageToParty({
                        GameId: GameId,
                        Event: Triggers.PassCourtSpeak,
                        Message: {
                            UserId: CurrentTurnUser
                        }
                    });
                }
                else {
                    console.log("dead user passed => isAlive: ".concat(isAlive, "  isOnline: ").concat(isOnline));
                    _b.CourtSpeak({ GameId: GameId }).then(function () {
                    });
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
    ClassicScenario.PassCourtSpeak = function (_a) {
        var GameId = _a.GameId, _c = _a.SocketNode, SocketNode = _c === void 0 ? null : _c, _d = _a.IsStarted, IsStarted = _d === void 0 ? false : _d;
        var _e = _b.GetPartyInfo({ GameId: GameId }), Court = _e.Court, CurrentTurnUser = _e.CurrentTurnUser;
        if (CurrentTurnUser === (SocketNode === null || SocketNode === void 0 ? void 0 : SocketNode.handshake.query.userId) || IsStarted) {
            if (IsStarted)
                console.log("PassCourtSpeak IsStarted: ".concat(IsStarted));
            else
                console.log("PassCourtSpeak: ".concat(SocketNode.handshake.query.userId));
            if (Court.length === 0) {
                _b.EndCourtSpeakProcess({ GameId: GameId }).then();
            }
            else {
                _b.CourtSpeak({ GameId: GameId });
            }
        }
        return true;
    };
    ClassicScenario.EndCourtSpeakProcess = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, CourtQueue, NoonSleepStatus;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("EndCourtSpeakProcess");
                        _c = this.GetPartyInfo({ GameId: GameId }), CourtQueue = _c.CourtQueue, NoonSleepStatus = _c.NoonSleepStatus;
                        console.log({ NoonSleepStatus: NoonSleepStatus, Section: 2 });
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                GameState: GameStates.SecondVote
                            }
                        });
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.Vote,
                                Message: {
                                    UserId: CourtQueue[0],
                                    IsCourt: true,
                                    NoonSleep: NoonSleepStatus
                                }
                            })];
                    case 1:
                        _d.sent();
                        return [2];
                }
            });
        });
    };
    ClassicScenario.Quit = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_b, function (_c) {
                this.PushItemToPartyInfo({
                    _id: GameId,
                    Path: "Quit",
                    Item: SocketNode.handshake.query.userId
                });
                this.PushToKills({
                    GameId: GameId,
                    Kill: SocketNode.handshake.query.userId,
                });
                return [2];
            });
        });
    };
    ClassicScenario.ConcludeFirstVoteLimit = function (AliveCount) {
        return Math.round((AliveCount - 1) / 2);
    };
    ClassicScenario.StartConcludeTheNight = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var ConcludeTheNight;
            return __generator(_b, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("ConcludeTheNight");
                        this.GameConfigTools.Increase({ GameId: GameId, Path: "ConcludeTheNight", Count: 1 });
                        ConcludeTheNight = this.GameConfigTools.Get({ GameId: GameId, Path: "ConcludeTheNight" });
                        if (!(ConcludeTheNight === 1)) return [3, 2];
                        console.log("Check Start Conclude The Night: ".concat(ConcludeTheNight));
                        return [4, this.ConcludeTheNight({ GameId: GameId })];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    ClassicScenario.SetRoleToUsers = function (GameId) {
        try {
            var PartyInfo = _b.GetPartyInfo({ GameId: GameId });
            var config = {
                "62b061de684c274ef0c2dfaa": Roles.GodFather,
            };
            var configId_1 = {};
            for (var user in config) {
                if (PartyInfo.Members.includes(user)) {
                    configId_1[user] = config[user];
                }
            }
            var membersLength = (PartyInfo.Members.length) - Object.values(configId_1).length;
            var nums = new Set();
            while (nums.size !== membersLength) {
                nums.add(Math.floor(Math.random() * membersLength));
            }
            var indexes = Array.from(nums);
            var RolesInGame = [
                Roles.Citizen, Roles.Citizen, Roles.Citizen, Roles.Immortal, Roles.Detective, Roles.Doctor, Roles.Sniper,
                Roles.GodFather, Roles.Mafia, Roles.Mafia
            ];
            RolesInGame = RolesInGame.filter(function (role) {
                return !(Object.values(configId_1).includes(role));
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
            _b.UpdatePartyInfo({ _id: GameId, newData: { UsersData: PartyInfo.UsersData } });
            return true;
        }
        catch (e) {
            return false;
        }
    };
    ClassicScenario.SetRoleToUsers2 = function (GameId) {
        try {
            var PartyInfo = _b.GetPartyInfo({ GameId: GameId });
            var nums = new Set();
            while (nums.size !== PartyInfo.Members.length) {
                nums.add(Math.floor(Math.random() * PartyInfo.Members.length));
            }
            var indexes = Array.from(nums);
            var RolesInGame = [
                Roles.Citizen, Roles.Citizen, Roles.Citizen, Roles.Immortal, Roles.Detective, Roles.Doctor, Roles.Sniper,
                Roles.GodFather, Roles.Mafia, Roles.Mafia
            ];
            for (var i = 0; i < RolesInGame.length; i++) {
                var userRole = RolesInGame[indexes[i]];
                PartyInfo.UsersData[i].UserRole = userRole;
                _b.ScoreBoardService.SetRoleAndSide(GameId, PartyInfo.UsersData[i].UserId, userRole);
            }
            _b.UpdatePartyInfo({ _id: GameId, newData: { UsersData: PartyInfo.UsersData } });
            return true;
        }
        catch (e) {
            return false;
        }
    };
    ClassicScenario.SetIndexToUsers = function (GameId) { return __awaiter(void 0, void 0, void 0, function () {
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
                        nums.add((Math.floor(Math.random() * PartyInfo.Members.length)) + 1);
                    }
                    indexes = Array.from(nums);
                    for (index in PartyInfo.Members) {
                        PartyInfo.UsersData[parseInt(index)].Index = indexes[parseInt(index)];
                    }
                    return [4, this.UpdatePartyInfo({ _id: GameId, newData: { UsersData: PartyInfo.UsersData } })];
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
    ClassicScenario.AddUserToFirstTalker = function (_a) {
        var GameId = _a.GameId, UserId = _a.UserId;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_b, function (_c) {
                try {
                    AddUserToFirstTalker({ UserId: UserId, GameId: GameId })
                        .catch(console.trace);
                    return [2, true];
                }
                catch (e) {
                    return [2, false];
                }
                return [2];
            });
        });
    };
    ClassicScenario.EnvSetting = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var BasicEnvData, PartyInfo;
        return __generator(_b, function (_a) {
            try {
                BasicEnvData = __assign({}, EnvironmentSetting);
                PartyInfo = this.GetPartyInfo({ GameId: data.GameId });
                BasicEnvData.MaxSize = PartyInfo.MemberLimit;
                BasicEnvData.EnvironmentID = PartyInfo.EnvironmentID;
                BasicEnvData.GameId = data.GameId;
                BasicEnvData.PartyID = data.GameId;
                BasicEnvData.PartyState = PartyInfo.PartyState;
                BasicEnvData.InGameRoles = Roles;
                BasicEnvData.GameTitle = PartyInfo.GameTitle;
                BasicEnvData.Scenario = PartyInfo.Scenario;
                BasicEnvData.GameTimes = Times;
                BasicEnvData.GameMode = PartyInfo.GameMode;
                this.SendMessageToUser({
                    Message: BasicEnvData,
                    GameId: data.GameId,
                    Event: ClassicKeys.EnvSetting,
                    SocketNode: data.SocketNode,
                });
            }
            catch (e) {
                return [2, false];
            }
            return [2];
        });
    }); };
    ClassicScenario.SpeakList = function (_a) {
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
                var SpeakList = __spreadArray(__spreadArray([], (UsersList.slice(Index)), true), (UsersList.slice(0, Index)), true);
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
                var SpeakList = __spreadArray(__spreadArray([], (UsersList.slice(Index + 2)), true), (UsersList.slice(0, Index + 2)), true);
                SpeakList = SpeakList.filter(function (user) {
                    return PartyInfo_1.Alive.includes(user.UserId);
                });
                _b.UpdatePartyInfo({
                    _id: GameId, newData: {
                        Starter: SpeakList[0].UserId,
                        SpeakList: SpeakList,
                        VoteList: SpeakList,
                    }
                });
                return true;
            }
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    ClassicScenario.Execute = function (GameId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var IsStarted, e_3;
        return __generator(_b, function (_a) {
            switch (_a.label) {
                case 0:
                    IsStarted = this.GetPartyInfo({ GameId: GameId }).IsStarted;
                    if (!(!IsStarted || BYPASS)) return [3, 4];
                    console.log("IsStarted?: ".concat(IsStarted));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    this.UpdatePartyInfo({
                        _id: GameId,
                        newData: { IsStarted: true, _id: GameId }
                    });
                    return [4, this.StartDay({ GameId: GameId, SocketNode: data.SocketNode })];
                case 2:
                    _a.sent();
                    return [2, true];
                case 3:
                    e_3 = _a.sent();
                    console.trace(e_3);
                    return [2, false];
                case 4: return [2];
            }
        });
    }); };
    ClassicScenario.StartIntroNight = function (_a) {
        var GameId = _a.GameId;
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.IntroNight,
            Message: {
                GameState: true
            },
        });
    };
    ClassicScenario.GetPartyInfo = function (_a) {
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
    ClassicScenario.UpdatePartyInfo = function (_a) {
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
    ClassicScenario.PushItemToPartyInfo = function (_a) {
        var _id = _a._id, Path = _a.Path, Item = _a.Item;
        try {
            _b.PartiesInfo[_id][Path].push(Item);
        }
        catch (e) {
            console.log("PushItemToPartyInfo: ", {
                _id: _id,
                Path: Path,
                Item: Item,
                PartiesInfo: _b.PartiesInfo[_id][Path]
            });
            console.trace(e);
            return false;
        }
    };
    ClassicScenario.IncreaseItemFromPartyInfo = function (_a) {
        var _id = _a._id, Path = _a.Path, Count = _a.Count;
        try {
            _b.PartiesInfo[_id][Path] += Count;
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    ClassicScenario.ChallengeRequest = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId;
        try {
            if (_b.IsIntroductionDay({ GameId: GameId }))
                return;
            var CurrentTurnUser = _b.GetPartyInfo({ GameId: GameId }).CurrentTurnUser;
            var UserId = _b.ioTools.GetQuery(SocketNode).userId;
            if (CurrentTurnUser !== UserId) {
                _b.PushItemToPartyInfo({
                    _id: GameId,
                    Path: "ChallengeList",
                    Item: UserId
                });
                _b.SendMessageToParty({
                    GameId: GameId,
                    Event: Triggers.ChallengeRequest,
                    Message: {
                        Challenge: UserId
                    }
                });
            }
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    ClassicScenario.AcceptChallenge = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId, Challenger = _a.Challenger;
        try {
            var _c = _b.GetPartyInfo({ GameId: GameId }), ChallengeList = _c.ChallengeList, CurrentTurnUser = _c.CurrentTurnUser;
            var UserId = _b.ioTools.GetQuery(SocketNode).userId;
            console.log("AcceptChallenge: ", {
                ChallengeList: ChallengeList,
                CurrentTurnUser: CurrentTurnUser,
                UserId: UserId
            });
            var isChallengerInChallengeList = ChallengeList === null || ChallengeList === void 0 ? void 0 : ChallengeList.includes(Challenger);
            var canUserAcceptChallenge = CurrentTurnUser === UserId;
            var isUserAcceptingChallengeOfAnotherUser = Challenger !== UserId;
            if (isChallengerInChallengeList && canUserAcceptChallenge && isUserAcceptingChallengeOfAnotherUser) {
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        Challenge: Challenger,
                        ChallengeList: [],
                    }
                });
                _b.SendMessageToParty({
                    GameId: GameId,
                    Event: Triggers.AcceptChallenge,
                    Message: {
                        Challenge: Challenger,
                    }
                });
            }
        }
        catch (e) {
            console.trace(e);
            return false;
        }
    };
    ClassicScenario.Ready = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var UserInfo_1, PartyInfo, isMember, e_4;
        var _this = _b;
        var _a;
        return __generator(_b, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4, UserManager.GetUserById(data.UserId)];
                case 1:
                    UserInfo_1 = (_c.sent()).Payload;
                    PartyInfo = this.GetPartyInfo({ GameId: UserInfo_1.GameId });
                    isMember = (_a = PartyInfo.Members) === null || _a === void 0 ? void 0 : _a.includes(data.UserId);
                    if (!isMember) return [3, 3];
                    return [4, this.JoinToRoom({ GameId: UserInfo_1.GameId.toString() }, data.SocketNode, function () {
                            _this.Execute(UserInfo_1.GameId, data).then();
                        })];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [2, true];
                case 4:
                    e_4 = _c.sent();
                    console.trace(e_4);
                    return [2, false];
                case 5: return [2];
            }
        });
    }); };
    ClassicScenario.PassTurn = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode, _c = _a.IsStarted, IsStarted = _c === void 0 ? false : _c;
        var GameInfo = _b.GetPartyInfo({ GameId: GameId });
        var SpeakList = GameInfo.SpeakList || [];
        if (IsStarted) {
            console.log("SPEAK LIST: ", GameInfo.SpeakList);
        }
        if (GameInfo.CurrentTurnUser === (SocketNode === null || SocketNode === void 0 ? void 0 : SocketNode.handshake.query.userId) || IsStarted) {
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
    ClassicScenario.Speak = function (_a) {
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
                    UserId: GameInfo.Challenge
                };
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        ChallengeList: [],
                        Challenge: "",
                    }
                });
            }
            if (currentTurnUser) {
                _b.UpdatePartyInfo({ _id: GameId, newData: { CurrentTurnUser: currentTurnUser.UserId } });
                var isAlive = GameInfo.Alive.includes(currentTurnUser.UserId);
                var isOnline = !GameInfo.DisconnectedUsers.includes(currentTurnUser.UserId);
                var isNotSilence = GameInfo.PsychiatristChoice !== currentTurnUser.UserId;
                if (!isNotSilence) {
                    _b.UpdatePartyInfo({ _id: GameId, newData: { PsychiatristChoice: "" } });
                }
                if (isAlive && isOnline && isNotSilence) {
                    _b.SendMessageToParty({
                        GameId: GameId,
                        Event: Triggers.Speak,
                        Message: {
                            UserId: currentTurnUser.UserId,
                            Challenge: Challenge,
                            IsIntroductionDay: _b.IsIntroductionDay({ GameId: GameId })
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
    ClassicScenario.EndPassTurnProcess = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, VoteList_1, NoonSleepStatus_1, e_5;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.Speak,
                                Message: {
                                    UserId: "End",
                                }
                            })];
                    case 1:
                        _d.sent();
                        this.GameConfigTools.ResetInEndPassTurn({ GameId: GameId });
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                GameState: GameStates.FirstVote,
                                NoonSleepStatus: false,
                                MafiaChoice: "",
                                DetectiveChoice: "",
                                DoctorChoice: "",
                                SniperChoice: "",
                            }
                        });
                        console.log("End Pass Turn Process");
                        if (this.IsIntroductionDay({ GameId: GameId })) {
                            console.log("Introduction Night");
                            this.StartNight({ GameId: GameId });
                            return [2];
                        }
                        _c = this.GetPartyInfo({ GameId: GameId }), VoteList_1 = _c.VoteList, NoonSleepStatus_1 = _c.NoonSleepStatus;
                        setTimeout(function () {
                            console.log({ NoonSleepStatus: NoonSleepStatus_1, Section: 1 });
                            ClassicScenario.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.Vote,
                                Message: {
                                    UserId: VoteList_1[0].UserId,
                                    IsCourt: false,
                                    NoonSleep: NoonSleepStatus_1
                                }
                            });
                        }, 5000);
                        return [3, 3];
                    case 2:
                        e_5 = _d.sent();
                        console.trace(e_5);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ClassicScenario.Users = function (data) {
        var PartyInfo = _b.GetPartyInfo({ GameId: data.GameId });
        var Users = PartyInfo.UsersData.map(function (user) {
            try {
                var UserSide = _b.GetUserSide(user.UserId, data.GameId);
                var GetUserRole = _b.GetUserRoles(user.UserId, data.GameId);
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
                return __assign({ IsOnline: !(PartyInfo.DisconnectedUsers.includes(user.UserId)), IsAlive: PartyInfo.Alive.includes(user.UserId), UserRole: UserRole, UserSide: UserSide }, user);
            }
            catch (e) {
                console.trace(e);
            }
        });
        _b.SendMessageToUser({
            Message: Users,
            GameId: data.GameId,
            Event: ClassicKeys.Users,
            SocketNode: data.SocketNode,
        });
    };
    ClassicScenario.ConcludeFirstVote = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), Votes = _c.Votes, Alive = _c.Alive;
        var VoteLimit = (Math.round(Alive.length / 2));
        var Victims = {};
        var TrueVotes = Votes.filter(function (vote) {
            return vote.IsVoted;
        });
        for (var _i = 0, TrueVotes_1 = TrueVotes; _i < TrueVotes_1.length; _i++) {
            var Vote = TrueVotes_1[_i];
            Victims[Vote.VictimId] === undefined ?
                Victims[Vote.VictimId] = new Set([Vote.UserId.toString()]) :
                Victims[Vote.VictimId].add(Vote.UserId.toString());
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
            TrueVotesLength: TrueVotes.length
        });
        return CourtList;
    };
    ClassicScenario.Vote = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var SocketNode_1, _a, NoonSleep_1, _c, IsCourt_1, UserId, GameId_1, VictimId, IsVoted, UserSide, TargetSide, NextUser_1, e_6;
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
                    else {
                        this.ScoreBoardService.IncorrectVote(GameId_1, UserId);
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
                        }
                    });
                    NextUser_1 = IsCourt_1 ?
                        this.NextSecondVote({ SocketNode: SocketNode_1, GameId: GameId_1, UserId: VictimId }) :
                        this.NextFirstVote({ SocketNode: SocketNode_1, GameId: GameId_1, UserId: VictimId });
                    if (!(!!NextUser_1 && SocketNode_1)) return [3, 1];
                    setTimeout(function () {
                        _this.SendMessageToUser({
                            Message: {
                                UserId: NextUser_1,
                                IsCourt: IsCourt_1,
                                NoonSleep: NoonSleep_1
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
                            NoonSleep: NoonSleep_1
                        },
                        GameId: GameId_1,
                        Event: Triggers.Vote,
                        SocketNode: SocketNode_1,
                    })];
                case 2:
                    _d.sent();
                    if (IsCourt_1) {
                        this.EndSecondVoteForUser({ SocketNode: SocketNode_1, GameId: GameId_1 });
                    }
                    else {
                        this.EndFirstVoteForUser({ SocketNode: SocketNode_1, GameId: GameId_1 });
                    }
                    _d.label = 3;
                case 3: return [2, true];
                case 4:
                    e_6 = _d.sent();
                    console.trace(e_6);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); };
    ClassicScenario.NextFirstVote = function (_a) {
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
    ClassicScenario.EndFirstVoteForUser = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), DisconnectedUsers = _c.DisconnectedUsers, Alive = _c.Alive, Kills = _c.Kills;
        var connectedUser = Alive.filter(function (item) { return !Kills.includes(item); });
        connectedUser = Alive.filter(function (item) { return !DisconnectedUsers.includes(item); });
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "FirstVote" });
        var MemberLength = _b.GameConfigTools.Get({ GameId: GameId, Path: "FirstVote" });
        if (MemberLength >= connectedUser.length) {
            setTimeout(function () {
                _b.EndFirstVoteProcess({ GameId: GameId });
            }, 1000);
        }
    };
    ClassicScenario.NextSecondVote = function (_a) {
        var _c = _a.GameId, GameId = _c === void 0 ? "" : _c, _d = _a.UserId, UserId = _d === void 0 ? "" : _d;
        var CourtQueue = _b.GetPartyInfo({ GameId: GameId }).CourtQueue;
        var UserIndex = CourtQueue.indexOf(UserId);
        if ((UserIndex + 1) === CourtQueue.length) {
            return "";
        }
        else {
            return CourtQueue[UserIndex + 1];
        }
    };
    ClassicScenario.EndSecondVoteForUser = function (_a) {
        var SocketNode = _a.SocketNode, GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var MembersLength;
            return __generator(_b, function (_c) {
                this.GameConfigTools.Increase({ GameId: GameId, Path: "SecondVote" });
                MembersLength = this.GameConfigTools.Get({ GameId: GameId, Path: "SecondVote" });
                console.log("".concat(this.ioTools.GetQuery(SocketNode).userId, "@EndSecondVoteForUser"), MembersLength);
                if (MembersLength === 1) {
                    setTimeout(function () {
                        ClassicScenario.EndSecondVoteProcess({ GameId: GameId });
                    }, 1000);
                }
                return [2];
            });
        });
    };
    ClassicScenario.ConcludeSecondVote = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), Votes = _c.Votes, Alive = _c.Alive;
        var CourtQueue = _b.GetPartyInfo({ GameId: GameId }).CourtQueue;
        var Victims = {};
        var _loop_1 = function (Victim) {
            Victims[Victim] = Votes.filter(function (vote) {
                return vote.IsVoted && vote.IsCourt && vote.VictimId.toString() === Victim;
            }).map(function (vote) { return vote.UserId.toString(); });
            Victims[Victim] = new Set(Victims[Victim]);
        };
        for (var _i = 0, CourtQueue_1 = CourtQueue; _i < CourtQueue_1.length; _i++) {
            var Victim = CourtQueue_1[_i];
            _loop_1(Victim);
        }
        var MaxVoteLength = _b.SecondVoteMaxVote(Victims);
        var MaxVotedUsers = _b.SecondVoteMaxVotedUsers(Victims, MaxVoteLength);
        console.log("ConcludeSecondVote: ", {
            MaxVotedUsers: MaxVotedUsers,
            MaxVoteLength: MaxVoteLength,
            Victims: Victims,
            CourtQueueLength: CourtQueue.length,
            AliveLength: Alive.length,
        });
        if (MaxVoteLength >= _b.ConcludeFirstVoteLimit(Alive.length)) {
            if (MaxVotedUsers.length === 1) {
                _b.UserExecute({ GameId: GameId, UserId: MaxVotedUsers[0], DieByRecord: false });
            }
            else {
                var UsersRecords = {};
                for (var _d = 0, MaxVotedUsers_1 = MaxVotedUsers; _d < MaxVotedUsers_1.length; _d++) {
                    var user = MaxVotedUsers_1[_d];
                    UsersRecords[user] = _b.GetRecord({ GameId: GameId, UserId: user });
                }
                var MaxRecordLength_1 = Math.max.apply(Math, (Object.values(UsersRecords)));
                var MaxRecordUsers = Object.entries(UsersRecords)
                    .filter(function (_a) {
                    var _ = _a[0], record = _a[1];
                    return record === MaxRecordLength_1;
                })
                    .map(function (_a) {
                    var _c;
                    var userId = _a[0], record = _a[1];
                    return _c = {}, _c[userId] = record, _c;
                });
                if (Object.values(MaxRecordUsers).length === 1) {
                    var killedUsers = Object.keys(MaxRecordUsers);
                    _b.UserExecute({ GameId: GameId, UserId: killedUsers[0], DieByRecord: true });
                }
                else {
                    _b.StartNight({ GameId: GameId });
                }
            }
        }
        else {
            _b.StartNight({ GameId: GameId });
        }
    };
    ClassicScenario.EndSecondVoteProcess = function (_a) {
        var GameId = _a.GameId;
        console.log("EndSecondVoteProcess");
        _b.ConcludeSecondVote({ GameId: GameId });
        return true;
    };
    ClassicScenario.EndWilling = function (_a) {
        var GameId = _a.GameId, ExecutionAnimation = _a.ExecutionAnimation;
        if (ExecutionAnimation)
            _b.StartExecutionAnimation({ GameId: GameId });
        else
            _b.StartNight({ GameId: GameId });
    };
    ClassicScenario.GetCitizenGroup = function (_a) {
        var GameId = _a.GameId;
        var Alive = _b.GetPartyInfo({ GameId: GameId }).Alive;
        var MafiaGroup = _b.GetMafiaGroup({ GameId: GameId });
        var Citizens = Alive.filter(function (userId) { return !MafiaGroup.includes(userId); });
        return Citizens;
    };
    ClassicScenario.GetRandomCitizen = function (_a) {
        var GameId = _a.GameId;
        var CitizenGroup = _b.GetCitizenGroup({ GameId: GameId });
        return CitizenGroup[~~(Math.random() * CitizenGroup.length)];
    };
    ClassicScenario.GetMafiaGroup = function (_a) {
        var GameId = _a.GameId;
        var MafiaIds = [];
        for (var _i = 0, MafiaRoles_1 = MafiaRoles; _i < MafiaRoles_1.length; _i++) {
            var role = MafiaRoles_1[_i];
            var users = _b.GetUserByRole({ GameId: GameId, Role: role });
            MafiaIds.push(users.map(function (u) { return u.UserId; }));
        }
        return MafiaIds.flat();
    };
    ClassicScenario.StartExecutionAnimation = function (_a) {
        var GameId = _a.GameId;
        _b.SendMessageToParty({
            GameId: GameId,
            Event: Triggers.ExecutionAnimation,
            Message: {
                Mode: (~~(Math.random() * 3) + 1)
            }
        });
    };
    ClassicScenario.ExecutionAnimation = function (_a) {
        var GameId = _a.GameId;
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "ExecutionAnimation" });
        var countExecutionAnimation = _b.GameConfigTools.Get({ GameId: GameId, Path: "ExecutionAnimation" });
        if (countExecutionAnimation === 1) {
            _b.StartNight({ GameId: GameId });
        }
    };
    ClassicScenario.UserExecute = function (_a) {
        var GameId = _a.GameId, UserId = _a.UserId, DieByRecord = _a.DieByRecord;
        var ImmortalShield = _b.GetPartyInfo({ GameId: GameId }).ImmortalShield;
        var Kills = [UserId];
        var SelectedUserRole = _b.GetUserRoles(UserId, GameId);
        var User = _b.GetUserById({ UserId: UserId, GameId: GameId });
        if (SelectedUserRole === Roles.Immortal && ImmortalShield > 0) {
            _b.IncreaseItemFromPartyInfo({
                _id: GameId,
                Path: "ImmortalShield",
                Count: -1
            });
            _b.SendMessageToParty({
                GameId: GameId,
                Event: Triggers.Willing,
                Message: {
                    DieByRecord: DieByRecord,
                    ExecutionAnimation: User.Vip,
                    IsImmortal: true,
                    UserId: UserId
                }
            });
        }
        else {
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    SituationRequestStatus: true
                }
            });
            _b.SendMessageToParty({
                GameId: GameId,
                Event: Triggers.Willing,
                Message: {
                    DieByRecord: DieByRecord,
                    ExecutionAnimation: User.Vip,
                    IsImmortal: false,
                    UserId: UserId
                }
            });
            _b.PushToKills({ GameId: GameId, Kills: Kills });
        }
    };
    ClassicScenario.UseAbility = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var SocketNode, GameId, UserRole, Target, UserId, SenderRole, MafiaShotRight;
        return __generator(_b, function (_a) {
            SocketNode = data.SocketNode, GameId = data.GameId, UserRole = data.UserRole, Target = data.Target;
            UserId = this.ioTools.GetQuery(SocketNode).userId;
            console.log("UseAbility: ", {
                GameId: GameId,
                UserRole: UserRole,
                Target: Target,
            });
            SenderRole = this.GetUserRoles(UserId, GameId);
            MafiaShotRight = this.GetPartyInfo({ GameId: GameId }).MafiaShotRight;
            if (UserRole === Roles.GodFather && UserId === MafiaShotRight) {
                this.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        MafiaChoice: Target
                    }
                });
            }
            console.log("UseAbility(Validation): ", {
                SenderRole: SenderRole,
                UserRole: UserRole,
                UserId: UserId,
                MafiaShotRight: MafiaShotRight
            });
            if (SenderRole === UserRole && Target !== "") {
                if ([Roles.Doctor, Roles.Sniper].includes(UserRole)) {
                    this.LimitedAbility({
                        GameId: GameId,
                        Target: Target,
                        UserId: UserId,
                        UserRole: UserRole
                    });
                }
                if ([Roles.Detective].includes(UserRole)) {
                    this.UnLimitedAbility({
                        GameId: GameId,
                        Target: Target,
                        UserRole: UserRole
                    });
                }
            }
            return [2];
        });
    }); };
    ClassicScenario.UnLimitedAbility = function (_a) {
        var _c, _d, _e;
        var GameId = _a.GameId, Target = _a.Target, UserRole = _a.UserRole;
        var PartyInfoPath = (_c = {},
            _c[Roles.Detective] = { Action: "DetectiveChoice" },
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
                _e)
        });
    };
    ClassicScenario.LimitedAbility = function (_a) {
        var _c, _d, _e;
        var GameId = _a.GameId, Target = _a.Target, UserId = _a.UserId, UserRole = _a.UserRole;
        var PartyInfoPath = (_c = {},
            _c[Roles.Doctor] = { Action: "DoctorChoice", Path: "DoctorSaveItself" },
            _c[Roles.Sniper] = { Action: "SniperChoice", Path: "SniperShotCount" },
            _c);
        var _f = _b.GetPartyInfo({ GameId: GameId }), _g = PartyInfoPath[UserRole].Path, AbilityCount = _f[_g];
        console.log("LimitedAbility: ", {
            GameId: GameId,
            Target: Target,
            UserId: UserId,
            UserRole: UserRole,
            AbilityCount: AbilityCount,
        });
        if (([Roles.Doctor].includes(UserRole) &&
            Target === UserId &&
            AbilityCount > 0) ||
            ([Roles.Sniper].includes(UserRole) &&
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
                Count: -1
            });
        }
        else if (Target !== UserId && [Roles.Doctor].includes(UserRole)) {
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: (_e = {},
                    _e[PartyInfoPath[UserRole].Action] = Target,
                    _e),
            });
        }
    };
    ClassicScenario.IsIntroductionDay = function (_a) {
        var GameId = _a.GameId;
        var DayCount = _b.GetPartyInfo({ GameId: GameId }).DayCount;
        return DayCount === 1;
    };
    ClassicScenario.IsIntroductionNight = function (_a) {
        var GameId = _a.GameId;
        var NightCount = _b.GetPartyInfo({ GameId: GameId }).NightCount;
        return NightCount === 1;
    };
    ClassicScenario.StartDay = function (_a) {
        var GameId = _a.GameId;
        var PartyStatus = _b.CheckIsGameGoingOn({ GameId: GameId });
        console.log("PartyStatus: ".concat(PartyStatus));
        if (PartyStatus === GameStatus.Continue) {
            _b.SetDayData({ GameId: GameId });
            var _c = _b.GetPartyInfo({ GameId: GameId }), Alive = _c.Alive, Kills = _c.Kills, DayCount = _c.DayCount;
            console.log("GameId: ".concat(GameId));
            console.log("\n    \n    \n      [START DAY ".concat(DayCount, "]\n  \n  \n    \n    "));
            console.log("Triggers.Day: ".concat(DayCount));
            _b.SendMessageToParty({
                GameId: GameId,
                Event: Triggers.Day,
                Message: {
                    Alive: Alive.toString(),
                    Kills: Kills.toString(),
                    DayCount: DayCount
                },
            });
            _b.SpeakList({ GameId: GameId });
        }
    };
    ClassicScenario.StartSpeak = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "StartSpeak" });
        var MemberLength = _b.GameConfigTools.Get({ GameId: GameId, Path: "StartSpeak" });
        console.log("StartSpeakRequest: ".concat(MemberLength));
        if (MemberLength === 1) {
            setTimeout(function () {
                _b.PassTurn({ GameId: GameId, SocketNode: SocketNode, IsStarted: true });
            }, 1000);
        }
    };
    ClassicScenario.UserOpinion = function (_a) {
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
            }
        });
    };
    ClassicScenario.SetDayData = function (_a) {
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
                GameState: GameStates.PassTurn
            }
        });
    };
    ClassicScenario.SetNightData = function (_a) {
        var GameId = _a.GameId;
        console.log("SetNightData");
        _b.GameConfigTools.ResetNightConfigs({ GameId: GameId });
        _b.UpdatePartyInfo({
            _id: GameId,
            newData: {
                GameState: GameStates.Night,
            }
        });
        _b.IncreaseNightCount({ GameId: GameId });
    };
    ClassicScenario.DisconnectedUsers = function (_a) {
        var GameId = _a.GameId;
        var DisconnectedUsers = _b.GetPartyInfo({ GameId: GameId }).DisconnectedUsers;
        return DisconnectedUsers;
    };
    ClassicScenario.IncreaseDayCount = function (_a) {
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
            }
        });
    };
    ClassicScenario.IncreaseNightCount = function (_a) {
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
            }
        });
    };
    ClassicScenario.KilledUsers = function (_a) {
        var GameId = _a.GameId;
        var Kills = _b.GetPartyInfo({ GameId: GameId }).Kills;
        return Kills;
    };
    ClassicScenario.PushToKills = function (_a) {
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
                Item: Kill
            });
        }
        for (var _i = 0, UniqueKills_1 = UniqueKills; _i < UniqueKills_1.length; _i++) {
            var User = UniqueKills_1[_i];
            if (User !== "" && !PartyKills.includes(User)) {
                _b.PushItemToPartyInfo({
                    _id: GameId,
                    Path: "Kills",
                    Item: User
                });
            }
        }
        _b.CalculateAlive({ GameId: GameId });
        _b.CheckIsGameGoingOn({ GameId: GameId });
        return true;
    };
    ClassicScenario.CalculateAlive = function (_a) {
        var GameId = _a.GameId;
        var _c = _b.GetPartyInfo({ GameId: GameId }), Alive = _c.Alive, Kills = _c.Kills;
        _b.UpdatePartyInfo({ _id: GameId, newData: { Alive: Alive.filter(function (item) { return !Kills.includes(item); }) } });
    };
    ClassicScenario.ConcludeTheNight = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var PartyInfo, NightKills, Detective;
            return __generator(_b, function (_c) {
                switch (_c.label) {
                    case 0:
                        PartyInfo = this.GetPartyInfo({ GameId: GameId });
                        NightKills = [];
                        Detective = 0;
                        if (PartyInfo.MafiaChoice === "" && PartyInfo.NightCount !== 1)
                            PartyInfo.MafiaChoice = this.GetRandomCitizen({ GameId: GameId });
                        if (PartyInfo.MafiaChoice !== "")
                            NightKills.push(this.ConcludeMafiaShot(__assign({ GameId: GameId }, PartyInfo)));
                        if (PartyInfo.SniperChoice !== "")
                            NightKills.push(this.ConcludeSniperShot(__assign({ GameId: GameId }, PartyInfo)));
                        if (PartyInfo.DetectiveChoice !== "")
                            Detective = this.ConcludeDetective(__assign({ GameId: GameId }, PartyInfo)) ? 1 : 2;
                        NightKills = NightKills.filter(function (item) { return item !== ""; });
                        this.PushToKills({
                            GameId: GameId,
                            Kills: NightKills
                        });
                        console.log("PartyInfo: ", {
                            MafiaChoice: PartyInfo.MafiaChoice,
                            DetectiveChoice: PartyInfo.DetectiveChoice,
                            DoctorChoice: PartyInfo.DoctorChoice,
                            SniperChoice: PartyInfo.SniperChoice,
                        });
                        console.log("ConcludeTheNight(ConcludeTheNight): ", {
                            NightKills: NightKills.toString(),
                            Detective: Detective,
                            SituationRequestStatus: PartyInfo.SituationRequestStatus,
                        });
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.ConcludeTheNight,
                                Message: {
                                    NightKills: NightKills.toString(),
                                    Detective: Detective,
                                    SituationRequest: PartyInfo.SituationRequestStatus,
                                }
                            })];
                    case 1:
                        _c.sent();
                        if (PartyInfo.SituationRequestStatus === false) {
                            this.StartDay({ GameId: GameId });
                        }
                        return [2];
                }
            });
        });
    };
    ClassicScenario.SituationRequest = function (_a) {
        var GameId = _a.GameId, Vote = _a.Vote;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(_b, function (_c) {
                this.IncreaseItemFromPartyInfo({ _id: GameId, Path: "SituationRequestCount", Count: Vote ? 1 : 0 });
                return [2];
            });
        });
    };
    ClassicScenario.StartConcludeSituationRequest = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var SituationRequestLength;
            return __generator(_b, function (_c) {
                this.GameConfigTools.Increase({ GameId: GameId, Path: "SituationRequest" });
                SituationRequestLength = this.GameConfigTools.Get({ GameId: GameId, Path: "SituationRequest" });
                console.log("StartConcludeSituationRequestCount: ".concat(SituationRequestLength));
                if (SituationRequestLength === 1) {
                    console.log("StartConcludeSituationRequest");
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.ConcludeSituationRequest({ GameId: GameId })];
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
    ClassicScenario.ConcludeSituationRequest = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, SituationRequestCount, Alive, SituationRequest, UsersData, Kills_1;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.GetPartyInfo({ GameId: GameId }), SituationRequestCount = _c.SituationRequestCount, Alive = _c.Alive, SituationRequest = _c.SituationRequest, UsersData = _c.UsersData;
                        console.log("ConcludeSituationRequest: ", {
                            SituationRequestCount: SituationRequestCount,
                            AliveLength: Alive.length,
                            SituationRequest: SituationRequest
                        });
                        if (!(Math.round(SituationRequestCount / 2) >= Alive.length && SituationRequest > 0)) return [3, 2];
                        return [4, this.KilledUsers({ GameId: GameId })];
                    case 1:
                        Kills_1 = _d.sent();
                        UsersData = UsersData.filter(function (user) {
                            return Kills_1.includes(user.UserId);
                        });
                        UsersData = UsersData.map(function (user) {
                            if (MafiaRoles.includes(user.UserRole)) {
                                return Sides.Mafia;
                            }
                            else {
                                return Sides.Citizen;
                            }
                        });
                        this.IncreaseItemFromPartyInfo({
                            _id: GameId,
                            Path: "SituationRequest",
                            Count: -1
                        });
                        this.SendMessageToParty({
                            GameId: GameId,
                            Event: Triggers.ConcludeSituationRequest,
                            Message: {
                                Mafia: UsersData.filter(function (item) { return item === Sides.Mafia; }).length,
                                Citizen: UsersData.filter(function (item) { return item === Sides.Citizen; }).length,
                            }
                        });
                        _d.label = 2;
                    case 2:
                        this.StartDay({ GameId: GameId, SocketNode: SocketNode });
                        return [2];
                }
            });
        });
    };
    ClassicScenario.ConcludeSeller = function (_a) {
        var GameId = _a.GameId, SellerChoice = _a.SellerChoice;
        var UsersData = _b.GetPartyInfo({ GameId: GameId }).UsersData;
        var SellerChoiceRole = _b.GetUserRoles(SellerChoice, GameId);
        var Side = Sides.Citizen;
        (MafiaRoles.includes(SellerChoiceRole)) ?
            Side = Sides.Mafia :
            Side = Sides.Citizen;
        UsersData = UsersData.map(function (user) {
            if (user.UserId === SellerChoice)
                user.UserRole = Side === Sides.Citizen ?
                    Roles.Citizen : Roles.Mafia;
            return user;
        });
        _b.UpdatePartyInfo({ _id: GameId, newData: { UsersData: UsersData } });
        return true;
    };
    ClassicScenario.ConcludeMafiaShot = function (_a) {
        var GameId = _a.GameId, MafiaChoice = _a.MafiaChoice, DoctorChoice = _a.DoctorChoice, ImmortalShield = _a.ImmortalShield;
        var Kill = "";
        console.log("[INFO]: Mafia Shot");
        if (MafiaChoice !== DoctorChoice) {
            console.log("[INFO]: Doctor Save Faild");
            var SelectedUserRole = _b.GetUserRoles(MafiaChoice, GameId);
            if (SelectedUserRole === Roles.Immortal && ImmortalShield > 0) {
                console.log("[INFO]: Immortal Armore Save Him");
                return "";
            }
            else {
                console.log("[INFO]: Mafia Shot Success");
                Kill = MafiaChoice;
            }
        }
        console.log("[INFO]: Mafia Shot Kill: ".concat(Kill));
        _b.ScoreBoardService.Shot(GameId, Boolean(Kill));
        _b.ScoreBoardService.Doctor(GameId, MafiaChoice === DoctorChoice);
        return Kill;
    };
    ClassicScenario.ConcludeSniperShot = function (_a) {
        var GameId = _a.GameId, SniperChoice = _a.SniperChoice;
        var Kill = "";
        var SelectedUserSide = _b.GetUserSide(SniperChoice, GameId);
        var SelectedUser = _b.GetUserRoles(SniperChoice, GameId);
        if (SelectedUserSide === Sides.Mafia) {
            if (SelectedUser !== Roles.GodFather) {
                Kill = SniperChoice;
            }
        }
        else if (SelectedUserSide === Sides.Citizen) {
            var SniperInfo = _b.GetUserByRole({ GameId: GameId, Role: Roles.Sniper });
            Kill = SniperInfo[0].UserId;
            console.log("SniperInfo: ", {
                UserId: SniperInfo[0].UserId,
            });
        }
        _b.ScoreBoardService.Sniper(GameId, SelectedUserSide === Sides.Citizen, Kill === SniperChoice);
        console.log("ConcludeSniperShot: ", {
            SniperChoice: SniperChoice,
            SelectedUserSide: SelectedUserSide,
            SelectedUser: SelectedUser,
            Kill: Kill,
        });
        return Kill;
    };
    ClassicScenario.ConcludeDetective = function (_a) {
        var GameId = _a.GameId, DetectiveChoice = _a.DetectiveChoice;
        var DetectiveChoiceRole = (_b.GetUserRoles(DetectiveChoice, GameId));
        var Result = [Roles.Mafia].includes(DetectiveChoiceRole);
        _b.ScoreBoardService.Detective(GameId, MafiaRoles.includes(DetectiveChoiceRole), Result);
        return Result;
    };
    ClassicScenario.StartNight = function (_a) {
        var GameId = _a.GameId;
        console.log("Start Night");
        _b.SendMessageToParty({
            GameId: GameId,
            Event: "testScoreBoard",
            Message: _b.GetPartyInfo({ GameId: GameId })
        });
        var PartyStatus = _b.CheckIsGameGoingOn({ GameId: GameId });
        if (PartyStatus === GameStatus.Continue) {
            _b.SetNightData({ GameId: GameId });
            var IsIntroductionNight = _b.IsIntroductionNight({ GameId: GameId });
            var _c = _b.GetPartyInfo({ GameId: GameId }), DoctorSaveItself = _c.DoctorSaveItself, Alive = _c.Alive, SniperShotCount = _c.SniperShotCount;
            var ShotRight = _b.ShotRight({ GameId: GameId });
            console.log("Night: ", {
                ShotRight: ShotRight.UserId,
                DoctorSaveItself: DoctorSaveItself,
                Alive: Alive.toString(),
                IsIntroductionNight: IsIntroductionNight
            });
            _b.SendMessageToParty({
                GameId: GameId,
                Event: Triggers.Night,
                Message: {
                    ShotRight: ShotRight.UserId,
                    DoctorSaveItself: DoctorSaveItself,
                    Alive: Alive.toString(),
                    SniperShotCount: SniperShotCount,
                    IsIntro: IsIntroductionNight
                }
            });
            _b.UpdatePartyInfo({
                _id: GameId,
                newData: {
                    MafiaShotRight: ShotRight.UserId,
                }
            });
        }
    };
    ClassicScenario.CanMafiaShot = function (_a) {
        var GameId = _a.GameId;
        return __awaiter(void 0, void 0, void 0, function () {
            var MafiaShotIsDisable;
            return __generator(_b, function (_c) {
                MafiaShotIsDisable = this.GetPartyInfo({ GameId: GameId }).MafiaShotIsDisable;
                return [2, !MafiaShotIsDisable];
            });
        });
    };
    ClassicScenario.ShotRight = function (_a) {
        var GameId = _a.GameId;
        try {
            var DisconnectedUsers = ClassicScenario.DisconnectedUsers({ GameId: GameId });
            var _c = ClassicScenario.GetPartyInfo({ GameId: GameId }), Alive = _c.Alive, ShotRightQueue = _c.ShotRightQueue;
            var shotRightQueue = [];
            if (ShotRightQueue.length === 0 || !Array.isArray(ShotRightQueue)) {
                var _loop_2 = function (Role) {
                    var Users = ClassicScenario.GetUserByRole({ GameId: GameId, Role: Role });
                    if (Users === undefined) {
                        return "continue";
                    }
                    var UsersInfo = Users.map(function (usr) {
                        return { UserId: usr.UserId, UserRole: Role };
                    });
                    shotRightQueue = shotRightQueue.concat(UsersInfo);
                };
                for (var _i = 0, MafiaRoles_2 = MafiaRoles; _i < MafiaRoles_2.length; _i++) {
                    var Role = MafiaRoles_2[_i];
                    _loop_2(Role);
                }
                _b.UpdatePartyInfo({
                    _id: GameId,
                    newData: {
                        ShotRightQueue: shotRightQueue
                    }
                });
                console.log("ShotRight: ", { shotRightQueue: shotRightQueue });
            }
            else {
                shotRightQueue = ShotRightQueue;
            }
            for (var _d = 0, shotRightQueue_1 = shotRightQueue; _d < shotRightQueue_1.length; _d++) {
                var User = shotRightQueue_1[_d];
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
        catch (e) {
            console.trace(e);
            return "";
        }
    };
    ClassicScenario.LastChanceCard = function (_a) {
        var GameId = _a.GameId, _c = _a.TargetId, TargetId = _c === void 0 ? "" : _c, _d = _a.UserRole, UserRole = _d === void 0 ? -1 : _d, SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var _e, LastChanceCardCode, RightToChooseCard, IsCorrect, hasAccess, isTargetNotEmpty, CanUse, SelectedUserRole;
            return __generator(_b, function (_f) {
                switch (_f.label) {
                    case 0:
                        _e = this.GetPartyInfo({ GameId: GameId }), LastChanceCardCode = _e.LastChanceCardCode, RightToChooseCard = _e.RightToChooseCard;
                        IsCorrect = true;
                        hasAccess = this.ioTools.GetQuery(SocketNode).userId === RightToChooseCard;
                        isTargetNotEmpty = (TargetId !== "" || LastChanceCardCode === LastChance.Insomnia);
                        CanUse = hasAccess &&
                            isTargetNotEmpty;
                        TargetId ? console.log("[INFO]LastChanceCard: ", {
                            hasAccess: hasAccess,
                            isTargetNotEmpty: isTargetNotEmpty,
                            isFinalShot: LastChanceCardCode === LastChance.FinalShot
                        }) : void 0;
                        if (!CanUse) return [3, 12];
                        if (!(LastChanceCardCode === LastChance.RedCarpet)) return [3, 1];
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                RedCarpet: TargetId
                            }
                        });
                        return [3, 10];
                    case 1:
                        if (!(LastChanceCardCode === LastChance.FinalShot)) return [3, 3];
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                MafiaChoice: TargetId,
                                MafiaShotIsDisable: true,
                            }
                        });
                        return [4, this.StartNight({ GameId: GameId })];
                    case 2:
                        _f.sent();
                        return [3, 10];
                    case 3:
                        if (!(LastChanceCardCode === LastChance.GreenPath)) return [3, 4];
                        this.UpdatePartyInfo({
                            _id: GameId,
                            newData: {
                                GreenPath: TargetId
                            }
                        });
                        return [3, 10];
                    case 4:
                        if (!(LastChanceCardCode === LastChance.BeautifulMind && UserRole !== -1)) return [3, 8];
                        return [4, this.GetUserRoles(TargetId, GameId)];
                    case 5:
                        SelectedUserRole = _f.sent();
                        IsCorrect = SelectedUserRole === UserRole;
                        if (!!IsCorrect) return [3, 7];
                        return [4, this.PushToKills({ GameId: GameId, Kill: TargetId })];
                    case 6:
                        _f.sent();
                        _f.label = 7;
                    case 7: return [3, 10];
                    case 8:
                        if (!(LastChanceCardCode === LastChance.Insomnia)) return [3, 10];
                        return [4, this.StartDay({ GameId: GameId, SocketNode: SocketNode })];
                    case 9:
                        _f.sent();
                        _f.label = 10;
                    case 10:
                        console.log("LastChanceResult", {
                            IsCorrect: IsCorrect,
                            LastChanceCardCode: LastChanceCardCode,
                            TargetId: TargetId,
                            UserRole: UserRole
                        });
                        if (![LastChance.GreenPath, LastChance.RedCarpet].includes(LastChanceCardCode)) return [3, 12];
                        return [4, this.SendMessageToParty({
                                GameId: GameId,
                                Event: Triggers.LastChanceResult,
                                Message: {
                                    IsCorrect: IsCorrect,
                                    LastChanceCardCode: LastChanceCardCode,
                                    TargetId: TargetId,
                                    UserRole: UserRole,
                                }
                            })];
                    case 11:
                        _f.sent();
                        _f.label = 12;
                    case 12: return [2];
                }
            });
        });
    };
    ClassicScenario.LastChanceEnd = function (_a) {
        var GameId = _a.GameId, SocketNode = _a.SocketNode;
        _b.GameConfigTools.Increase({ GameId: GameId, Path: "LastChanceCard", Count: 1 });
        var LastChanceCard = _b.GameConfigTools.Get({ GameId: GameId, Path: "LastChanceCard" });
        if (LastChanceCard === 1) {
            console.log("LastChanceEnd: ".concat(LastChanceCard));
            var LastChanceCardCode = _b.GetPartyInfo({ GameId: GameId }).LastChanceCardCode;
            if (LastChanceCardCode === LastChance.Insomnia) {
                console.log("StartDay From Insomnia");
                _b.StartDay({ GameId: GameId, SocketNode: SocketNode });
            }
            else {
                console.log("StartDay From LastChanceCard");
                _b.StartNight({ GameId: GameId });
            }
        }
    };
    ClassicScenario.GetUserRoles = function (UserId, GameId) {
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
    ClassicScenario.ScoreBoardService = {
        CorrectVote: function (GameId, UserId) {
            var UserRole = ClassicScenario.GetUserRoles(UserId, GameId);
            var key = RolesName[UserRole];
            var ShotRightQueue = ClassicScenario.GetPartyInfo({ GameId: GameId }).ShotRightQueue;
            if ([Roles.Mafia].includes(UserRole)) {
                key = RolesName[UserRole] + ShotRightQueue.findIndex(function (user) { return user.UserId === UserId; });
            }
            ClassicScenario.PartiesInfo[GameId]["Scores"][UserId].Score += Scores[key].CorrectVote;
            ClassicScenario.PartiesInfo[GameId]["Scores"][UserId].CorrectVote += 1;
        },
        IncorrectVote: function (GameId, UserId) {
            var UserRole = ClassicScenario.GetUserRoles(UserId, GameId);
            var key = RolesName[UserRole];
            var ShotRightQueue = ClassicScenario.GetPartyInfo({ GameId: GameId }).ShotRightQueue;
            if ([Roles.Mafia].includes(UserRole)) {
                key = RolesName[UserRole] + ShotRightQueue.findIndex(function (user) { return user.UserId === UserId; });
            }
            try {
                ClassicScenario.PartiesInfo[GameId]["Scores"][UserId].Score += Scores[key].IncorrectVote;
            }
            catch (e) {
                console.trace(e);
                console.trace("IncorrectVote: ", { UserRole: UserRole });
            }
        },
        SetRoleAndSide: function (GameId, UserId, Role) {
            ClassicScenario.PartiesInfo[GameId]["Scores"][UserId].Role = Role;
            ClassicScenario.PartiesInfo[GameId]["Scores"][UserId].Side = MafiaRoles.includes(Role) ? Sides.Mafia : Sides.Citizen;
        },
        Shot: function (GameId, isSuccess) {
            var _a = ClassicScenario.GetPartyInfo({ GameId: GameId }), UsersData = _a.UsersData, MafiaShotRight = _a.MafiaShotRight, ShotRightQueue = _a.ShotRightQueue;
            var MafiaSniperRole = ClassicScenario.GetUserRoles(MafiaShotRight, GameId);
            var MafiaGroup = UsersData.filter(function (user) { return MafiaRoles.includes(user.UserRole); });
            console.log("Score Board Shot Right: ".concat(MafiaShotRight));
            if (!MafiaShotRight) {
                console.log("[INFO]: Mafia Shot is Disabled");
                return;
            }
            if (isSuccess) {
                var index = ShotRightQueue.indexOf(MafiaShotRight);
                var MafiaSniperScores = MafiaSniperRole !== Roles.Mafia ? Scores[RolesName[MafiaSniperRole]] : Scores["".concat(RolesName[MafiaSniperRole]).concat(index)];
                for (var _i = 0, MafiaGroup_1 = MafiaGroup; _i < MafiaGroup_1.length; _i++) {
                    var mafia = MafiaGroup_1[_i];
                    ClassicScenario.PartiesInfo[GameId]["Scores"][mafia.UserId].Score += Scores.MafiaShot.MafiaShot;
                }
                ClassicScenario.PartiesInfo[GameId]["Scores"][MafiaShotRight].Score += MafiaSniperScores.MafiaShot;
            }
            ClassicScenario.PartiesInfo[GameId]["Scores"][MafiaShotRight].Score += MafiaSniperScores.ShotRight;
        },
        Doctor: function (GameId, isSuccess) {
            var Doctor = ClassicScenario.GetUserByRole({ GameId: GameId, Role: Roles.Doctor })[0];
            var score = isSuccess ? Scores.Doctor.UseAbility + Scores.Doctor.CorrectAbility : Scores.Doctor.UseAbility;
            ClassicScenario.PartiesInfo[GameId]["Scores"][Doctor.UserId].Score += score;
            if (isSuccess)
                ClassicScenario.PartiesInfo[GameId]["Scores"][Doctor.UserId].UseAbility += 1;
        },
        Sniper: function (GameId, isSuccess, isMafiaKilled) {
            var Sniper = ClassicScenario.GetUserByRole({ GameId: GameId, Role: Roles.Sniper })[0];
            var score = Scores.Sniper.UseAbility;
            if (isSuccess) {
                score += Scores.Sniper.CorrectAbility;
                ClassicScenario.PartiesInfo[GameId]["Scores"][Sniper.UserId].UseAbility += 1;
            }
            if (isMafiaKilled)
                score += Scores.Sniper.KillMafia;
            ClassicScenario.PartiesInfo[GameId]["Scores"][Sniper.UserId].Score += score;
        },
        Detective: function (GameId, CorrectInquiry, PositiveInquiry) {
            var Detective = ClassicScenario.GetUserByRole({ GameId: GameId, Role: Roles.Detective })[0];
            var score = Scores.Detective.UseAbility;
            if (CorrectInquiry)
                score += Scores.Detective.CorrectInquiry;
            if (PositiveInquiry)
                score += Scores.Detective.PositiveInquiry;
            ClassicScenario.PartiesInfo[GameId]["Scores"][Detective.UserId].Score += score;
            if (CorrectInquiry)
                ClassicScenario.PartiesInfo[GameId]["Scores"][Detective.UserId].UseAbility += 1;
        },
        RewardCalculate: function (rank) {
            var range = function (min, max) { return min + ~~(Math.random() * (max + 1)); };
            var reward = {
                1: "65-75",
                2: "60-64",
                3: "50-55",
                4: "40-45",
                5: "35-39",
                6: "30-34",
                7: "25-30",
                8: "20-24",
                9: "15-19",
                10: "10-14",
            };
            var min = reward[rank].split("-")[0];
            var max = reward[rank].split("-")[1];
            return range(min, max);
        },
        Court: function (GameId, UserId) {
            ClassicScenario.PartiesInfo[GameId]["Scores"][UserId].Court += 1;
        },
        CalculateScoreBoard: function (GameId) {
            var ScoreBoard = Object.values(ClassicScenario.PartiesInfo[GameId]["Scores"]);
            var _a = ClassicScenario.GetPartyInfo({ GameId: GameId }), Win = _a.Win, Quit = _a.Quit;
            var Winners = ScoreBoard.filter(function (user) {
                return user.Side === Win;
            }).sort(function (a, b) { return b.Score - a.Score; });
            var Mvp1Index = ScoreBoard.findIndex(function (user) { return Winners[0].UserId === user.UserId; });
            ScoreBoard[Mvp1Index].MvpRank = 1;
            ScoreBoard.sort(function (a, b) { return b.Score - a.Score; });
            var i = 0;
            var rank = 2;
            while (true) {
                if (ScoreBoard[i] === undefined)
                    break;
                if (ScoreBoard[i].UserId !== Winners[0].UserId) {
                    ScoreBoard[i].MvpRank = rank;
                    rank++;
                }
                if (i > ScoreBoard.length)
                    break;
                i++;
            }
            var fakeScores = [30, 35, 40, 45];
            ScoreBoard = ScoreBoard.map(function (user) {
                if (user.Score <= 30) {
                    user.Score = fakeScores[~~(Math.random() * fakeScores.length)];
                }
                user.Score = !Quit.includes(user.UserId) ? Classic(Win, user.Score) : 0;
                return user;
            });
            fs.writeFileSync("SCOREBOARD.json", JSON.stringify(ScoreBoard));
            ClassicScenario.PartiesInfo[GameId]["ScoreBoard"] = ScoreBoard;
        },
    };
    ClassicScenario.GetUserSide = function (UserId, GameId) {
        var UserRole = _b.GetUserRoles(UserId, GameId);
        if (MafiaRoles.includes(UserRole))
            return Sides.Mafia;
        else if (CitizenRoles.includes(UserRole))
            return Sides.Citizen;
        else
            return Sides.Hidden;
    };
    ClassicScenario.Disconnect = function (_a) {
        var SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var UserData, Alive, _c, CurrentTurnUser, GameState, _d, LastChanceCardCode, RightToChooseCard, e_7;
            return __generator(_b, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 11, , 12]);
                        return [4, UserManager
                                .GetUserById(SocketNode.handshake.query.userId)];
                    case 1:
                        UserData = (_e.sent()).Payload;
                        if (!(UserData.GameId && this.PartiesInfo[UserData.GameId.toString()] !== undefined)) return [3, 10];
                        Alive = this.GetPartyInfo({ GameId: UserData.GameId.toString() }).Alive;
                        if (!Alive.includes(SocketNode.handshake.query.userId)) return [3, 9];
                        this.PushItemToPartyInfo({
                            _id: UserData.GameId.toString(),
                            Item: UserData._id.toString(),
                            Path: "DisconnectedUsers",
                        });
                        _c = this.GetPartyInfo({ GameId: UserData.GameId }), CurrentTurnUser = _c.CurrentTurnUser, GameState = _c.GameState;
                        console.log("[INFO]: Disconnect: ", {
                            CurrentTurnUser: CurrentTurnUser,
                            _id: SocketNode.handshake.query.userId,
                            GameState: GameState,
                        });
                        if (!(CurrentTurnUser === UserData._id.toString())) return [3, 4];
                        if (!(GameState === GameStates.PassTurn)) return [3, 2];
                        this.PassTurn({
                            GameId: UserData.GameId.toString(),
                            SocketNode: SocketNode,
                            IsStarted: false
                        });
                        return [3, 4];
                    case 2:
                        if (!(GameState === GameStates.CourtSpeak)) return [3, 4];
                        return [4, this.PassCourtSpeak({ SocketNode: SocketNode, GameId: UserData.GameId.toString() })];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        if (!(GameState === GameStates.LastChanceCard)) return [3, 8];
                        _d = this.GetPartyInfo({ GameId: UserData.GameId }), LastChanceCardCode = _d.LastChanceCardCode, RightToChooseCard = _d.RightToChooseCard;
                        if (!(RightToChooseCard === UserData._id.toString())) return [3, 8];
                        if (!(LastChanceCardCode === LastChance.Insomnia)) return [3, 6];
                        console.log("StartDay From Insomnia (Disconnect)");
                        return [4, this.StartDay({ GameId: UserData.GameId.toString(), SocketNode: SocketNode })];
                    case 5:
                        _e.sent();
                        return [3, 8];
                    case 6:
                        console.log("StartDay From LastChanceCard (Disconnect)");
                        return [4, this.StartNight({ GameId: UserData.GameId.toString() })];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8:
                        this.SendMessageToParty({
                            Triggers: Triggers.Opinion,
                            GameId: UserData.GameId.toString(),
                            Message: {
                                UserId: SocketNode.handshake.query.userId,
                                Opinion: Opinions.Disconnect
                            }
                        });
                        _e.label = 9;
                    case 9: return [2, true];
                    case 10: return [3, 12];
                    case 11:
                        e_7 = _e.sent();
                        console.trace(e_7);
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    ClassicScenario.Connect = function (_a) {
        var SocketNode = _a.SocketNode;
        return __awaiter(void 0, void 0, void 0, function () {
            var UserData, GameId, _c, DisconnectedUsers, Alive, Scenario;
            return __generator(_b, function (_d) {
                switch (_d.label) {
                    case 0: return [4, UserManager
                            .GetUserById(SocketNode.handshake.query.userId)];
                    case 1:
                        UserData = (_d.sent()).Payload;
                        GameId = UserData.GameId.toString();
                        if (UserData.GameId && this.PartiesInfo[GameId] !== undefined) {
                            _c = this.GetPartyInfo({ GameId: GameId }), DisconnectedUsers = _c.DisconnectedUsers, Alive = _c.Alive, Scenario = _c.Scenario;
                            if (Alive.includes(SocketNode.handshake.query.userId)) {
                                SocketNode.join(this.RoomsTools.party(GameId));
                                DisconnectedUsers = DisconnectedUsers.filter(function (item) {
                                    return item !== SocketNode.handshake.query.userId;
                                });
                                this.UpdatePartyInfo({
                                    _id: GameId,
                                    newData: { DisconnectedUsers: __spreadArray([], new Set(DisconnectedUsers), true) }
                                });
                                this.SendMessageToParty({
                                    Triggers: Triggers.Opinion,
                                    GameId: GameId,
                                    Message: {
                                        UserId: SocketNode.handshake.query.userId,
                                        Opinion: Opinions.Connect
                                    }
                                });
                                this.SendMessageToUser({
                                    Triggers: "Rejoin",
                                    SocketNode: SocketNode,
                                    GameId: GameId,
                                    Message: {
                                        Scenario: Scenario,
                                        GameId: GameId
                                    }
                                });
                            }
                        }
                        return [2];
                }
            });
        });
    };
    ClassicScenario.SecondVoteMaxVote = function (Victims) {
        return Math.max.apply(Math, __spreadArray([], Object.values(Victims), true).map(function (vote) {
            return vote.size;
        }));
    };
    ClassicScenario.SecondVoteMaxVotedUsers = function (Victims, MaxVoteLength) {
        return Object.keys(Victims).filter(function (User) {
            return Victims[User].size === MaxVoteLength;
        });
    };
    return ClassicScenario;
}(CoreScenario));
exports.default = ClassicScenario;
