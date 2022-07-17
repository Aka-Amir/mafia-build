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
exports.GroupsWs = void 0;
var socket_abs_1 = __importDefault(require("../Core/interface/socket.abs"));
var groups_model_1 = __importDefault(require("./groups.model"));
var groups_enums_1 = require("./groups.enums");
var groups_events_ws_1 = __importDefault(require("./groups.events.ws"));
var status_1 = __importDefault(require("../Core/status"));
var filimo_data_layer_1 = __importDefault(require("../Scenarios/data/filimo.data.layer"));
var classic_data_layer_1 = __importDefault(require("../Scenarios/data/classic.data.layer"));
var matchmaking_service_1 = __importDefault(require("../Scenarios/services/matchmaking.service"));
var game_model_1 = require("../Scenarios/models/game.model");
var users_model_1 = __importDefault(require("../Users/users.model"));
var model_redis_1 = require("./model.redis");
var game_redis_1 = __importDefault(require("../Scenarios/models/game.redis"));
var GroupData = (function () {
    function GroupData() {
    }
    GroupData.CreateGroup = function (groupId) {
        this.GroupMembersCount[groupId] = {
            membersCount: 1,
            scenario: groups_enums_1.scenario.Classic
        };
    };
    GroupData.ChangeScenario = function (groupId, scenario) {
        this.GroupMembersCount[groupId].scenario = scenario;
    };
    GroupData.AddMember = function (groupId) {
        this.GroupMembersCount[groupId].membersCount += 1;
    };
    GroupData.RemoveMember = function (groupId) {
        this.GroupMembersCount[groupId].membersCount -= 1;
    };
    GroupData.GetMembersCount = function (groupId) {
        return this.GroupMembersCount[groupId].membersCount;
    };
    GroupData.GetScenario = function (groupId) {
        return this.GroupMembersCount[groupId].scenario;
    };
    GroupData.RemoveGroup = function (groupId) {
        delete this.GroupMembersCount[groupId];
    };
    GroupData.GroupMembersCount = {};
    return GroupData;
}());
var GroupsWs = (function (_super) {
    __extends(GroupsWs, _super);
    function GroupsWs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupsWs._canStart = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var GroupInfo, Environments, canStart, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, groups_model_1.default.Get(groupId)];
                    case 1:
                        GroupInfo = (_a.sent()).Payload;
                        return [4, model_redis_1.GroupRedis.GetAllEnvironments(groupId)];
                    case 2:
                        Environments = _a.sent();
                        canStart = true;
                        for (userId in Environments) {
                            if (!Environments[userId].includes(GroupInfo.Environment)) {
                                canStart = false;
                            }
                        }
                        if (!(GroupInfo.CanStart !== canStart)) return [3, 4];
                        return [4, groups_model_1.default.ChangeGroupCanStart(groupId, canStart)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4, GroupsWs.Info({ groupId: groupId, sendToAll: true }, undefined)];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    GroupsWs.Create = function (data, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("GroupsWs@Create");
                        return [4, groups_model_1.default.Create(socket.handshake.query.userId)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (!(ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload)) return [3, 4];
                        socket.join("Group@".concat(ModelResponse.Payload._id));
                        return [4, model_redis_1.GroupRedis.SetEnvironment(socket.handshake.query.userId, ModelResponse.Payload._id, data.environments)];
                    case 2:
                        _a.sent();
                        GroupData.CreateGroup(ModelResponse.Payload._id);
                        socket.emit(groups_events_ws_1.default.Create, {
                            groupId: ModelResponse.Payload._id
                        });
                        return [4, GroupsWs._canStart(ModelResponse.Payload._id)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        socket.emit(groups_events_ws_1.default.Create, "");
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    GroupsWs.Invite = function (data, _socket) {
        return __awaiter(this, void 0, void 0, function () {
            var groupScenario, groupMembersCount, scenarioName;
            return __generator(this, function (_a) {
                groupScenario = GroupData.GetScenario(data.groupId);
                groupMembersCount = GroupData.GetMembersCount(data.groupId);
                scenarioName = groups_enums_1.scenario[groupScenario];
                console.log("INVITE: ", {
                    scenarioName: scenarioName,
                    scenarioCode: groupScenario,
                    membersLength: groupMembersCount,
                    membersLimit: groups_enums_1.membersLimit[scenarioName]
                });
                if (groupMembersCount >= groups_enums_1.membersLimit[scenarioName]) {
                    return [2];
                }
                GroupsWs._emitToRoom(data.invitedUserId, groups_events_ws_1.default.Invite, {
                    groupId: data.groupId,
                    userName: data.userName
                });
                return [2];
            });
        });
    };
    GroupsWs.Join = function (data, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var groupScenario, scenarioPrice, userData, groupMembersCount, scenarioName, ModelResponse, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        groupScenario = GroupData.GetScenario(data.groupId);
                        return [4, game_redis_1.default.GetPrice(groups_enums_1.scenario[groupScenario])];
                    case 1:
                        scenarioPrice = _a.sent();
                        return [4, users_model_1.default.GetUserById(socket.handshake.query.userId)];
                    case 2:
                        userData = (_a.sent()).Payload;
                        if (userData.PrimaryCoin < parseInt(scenarioPrice)) {
                            socket.emit("GroupsWs@ChangeScenario", { Status: status_1.default.NOT_ENOUGH_COIN });
                            return [2];
                        }
                        groupMembersCount = GroupData.GetMembersCount(data.groupId);
                        scenarioName = groups_enums_1.scenario[groupScenario];
                        console.log("Join: ", {
                            scenarioName: scenarioName,
                            scenarioCode: groupScenario,
                            membersLength: groupMembersCount,
                            membersLimit: groups_enums_1.membersLimit[scenarioName]
                        });
                        if (groupMembersCount >= groups_enums_1.membersLimit[scenarioName]) {
                            return [2];
                        }
                        GroupData.AddMember(data.groupId);
                        return [4, groups_model_1.default.AddMember(socket.handshake.query.userId, data.groupId)];
                    case 3:
                        ModelResponse = _a.sent();
                        socket.emit(groups_events_ws_1.default.Join, { Status: ModelResponse.Status });
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload) {
                            socket.join("Group@".concat(data.groupId), function (err) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, model_redis_1.GroupRedis.SetEnvironment(socket.handshake.query.userId, data.groupId, data.environments)];
                                        case 1:
                                            _a.sent();
                                            return [4, GroupsWs._canStart(data.groupId)];
                                        case 2:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); });
                        }
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        socket.emit(groups_events_ws_1.default.Join, { Status: status_1.default.PROCCESS_FAILED });
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    GroupsWs.ChangeMode = function (data, socket) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, groups_model_1.default.Get(data.groupId)];
                    case 1:
                        ModelResponse = _b.sent();
                        if (!(((_a = ModelResponse === null || ModelResponse === void 0 ? void 0 : ModelResponse.Payload) === null || _a === void 0 ? void 0 : _a.Creator) === socket.handshake.query.userId)) return [3, 4];
                        return [4, groups_model_1.default.ChangeMode(data.groupId, data.mode)];
                    case 2:
                        if (!((_b.sent()).Status === status_1.default.PROCCESS_SUCCESS)) return [3, 4];
                        return [4, GroupsWs.Info({ groupId: data.groupId, sendToAll: true }, undefined)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    GroupsWs.ChangeEnvironment = function (data, socket) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, groups_model_1.default.Get(data.groupId)];
                    case 1:
                        ModelResponse = _b.sent();
                        if (!(((_a = ModelResponse === null || ModelResponse === void 0 ? void 0 : ModelResponse.Payload) === null || _a === void 0 ? void 0 : _a.Creator) === socket.handshake.query.userId)) return [3, 4];
                        return [4, groups_model_1.default.ChangeEnvironment(data.groupId, data.environment)];
                    case 2:
                        if (!((_b.sent()).Status === status_1.default.PROCCESS_SUCCESS)) return [3, 4];
                        return [4, GroupsWs._canStart(data.groupId)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    GroupsWs.ChangeScenario = function (data, socket) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var scenarioPrice, userData, ModelResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, game_redis_1.default.GetPrice(groups_enums_1.scenario[data.scenario])];
                    case 1:
                        scenarioPrice = _b.sent();
                        return [4, users_model_1.default.GetUserById(socket.handshake.query.userId)];
                    case 2:
                        userData = (_b.sent()).Payload;
                        if (userData.PrimaryCoin < parseInt(scenarioPrice)) {
                            socket.emit("GroupsWs@ChangeScenario", { Status: status_1.default.NOT_ENOUGH_COIN });
                            return [2];
                        }
                        return [4, groups_model_1.default.Get(data.groupId)];
                    case 3:
                        ModelResponse = _b.sent();
                        if (!(((_a = ModelResponse === null || ModelResponse === void 0 ? void 0 : ModelResponse.Payload) === null || _a === void 0 ? void 0 : _a.Creator) === socket.handshake.query.userId)) return [3, 6];
                        return [4, groups_model_1.default.ChangeScenario(data.groupId, data.scenario)];
                    case 4:
                        if (!((_b.sent()).Status === status_1.default.PROCCESS_SUCCESS)) return [3, 6];
                        GroupData.ChangeScenario(data.groupId, data.scenario);
                        return [4, GroupsWs.Info({ groupId: data.groupId, sendToAll: true }, undefined)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    GroupsWs.SetEnvironments = function (data, socket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, model_redis_1.GroupRedis.SetEnvironment(socket.handshake.query.userId, data.groupId, data.environments)];
                    case 1:
                        _a.sent();
                        return [4, GroupsWs._canStart(data.groupId)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    GroupsWs.Leave = function (data, socket) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var canLeave, ModelResponse, IsCreatorLeft, IsRemoved, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        canLeave = data.userId == socket.handshake.query.userId;
                        return [4, groups_model_1.default.Get(data.groupId)];
                    case 1:
                        ModelResponse = _b.sent();
                        if (ModelResponse.Payload && !canLeave) {
                            canLeave = ModelResponse.Payload.Creator === socket.handshake.query.userId;
                        }
                        if (!(canLeave && ModelResponse.Payload)) return [3, 8];
                        IsCreatorLeft = ((_a = ModelResponse.Payload) === null || _a === void 0 ? void 0 : _a.Creator.toString()) === data.userId;
                        if (!(IsCreatorLeft && ModelResponse.Payload.Members.length === 1)) return [3, 3];
                        GroupData.RemoveGroup(data.groupId);
                        return [4, groups_model_1.default.DeleteGroup(data.groupId).catch(console.trace)];
                    case 2:
                        _b.sent();
                        socket.emit(groups_events_ws_1.default.Leave, { Status: status_1.default.PROCCESS_SUCCESS });
                        return [3, 7];
                    case 3: return [4, groups_model_1.default.RemoveMember(data.userId, data.groupId, IsCreatorLeft, ModelResponse.Payload.Members[1]._id)];
                    case 4:
                        IsRemoved = _b.sent();
                        socket.emit(groups_events_ws_1.default.Leave, { Status: IsRemoved.Status });
                        if (!(IsRemoved.Status === status_1.default.PROCCESS_SUCCESS)) return [3, 7];
                        GroupData.RemoveMember(data.groupId);
                        return [4, model_redis_1.GroupRedis.RemoveMember(data.groupId, data.userId)];
                    case 5:
                        _b.sent();
                        return [4, GroupsWs.Info({ groupId: data.groupId, sendToAll: true }, undefined)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3, 9];
                    case 8:
                        socket.emit(groups_events_ws_1.default.Leave, { Status: status_1.default.FORBIDDEN });
                        _b.label = 9;
                    case 9: return [3, 11];
                    case 10:
                        e_2 = _b.sent();
                        console.trace(e_2);
                        return [3, 11];
                    case 11: return [2];
                }
            });
        });
    };
    GroupsWs.Info = function (data, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, groups_model_1.default.Get(data.groupId)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Payload && ModelResponse.Status === status_1.default.PROCCESS_SUCCESS) {
                            response = {
                                creator: ModelResponse.Payload.Creator.toString(),
                                environment: ModelResponse.Payload.Environment.toString(),
                                isActive: ModelResponse.Payload.IsActive.toString(),
                                mode: ModelResponse.Payload.Mode.toString(),
                                scenario: ModelResponse.Payload.Scenario.toString(),
                                members: ModelResponse.Payload.Members,
                                canStart: ModelResponse.Payload.CanStart,
                            };
                            if (data.sendToAll && socket == undefined) {
                                GroupsWs._emitToRoom("Group@".concat(data.groupId), groups_events_ws_1.default.Info, response);
                            }
                            else {
                                socket === null || socket === void 0 ? void 0 : socket.emit(groups_events_ws_1.default.Info, response);
                            }
                        }
                        return [2];
                }
            });
        });
    };
    GroupsWs.StopMatchMaking = function (data, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, groups_model_1.default.ChangeMatchMakingState(data.groupId, "cancel")];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS) {
                            GroupsWs._emitToRoom("Group@".concat(data.groupId), groups_events_ws_1.default.MatchMaking, { status: false });
                        }
                        return [2];
                }
            });
        });
    };
    GroupsWs._disconnecting = function (socket) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var UserRooms, userId, groupId;
            return __generator(this, function (_b) {
                UserRooms = Object.keys(socket.rooms);
                userId = socket.handshake.query.userId;
                groupId = (_a = UserRooms.find(function (room) { return room.startsWith("Group@"); })) === null || _a === void 0 ? void 0 : _a.replace("Group@", "");
                console.log("_disconnecting");
                if (!userId || !groupId)
                    return [2];
                console.log("fuck data _disconnecting");
                this.Leave({ groupId: groupId, userId: userId }, socket);
                return [2];
            });
        });
    };
    GroupsWs.StartGroup = function (data, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var response, ModelResponse, Members, gameId, AllGroups, MatchMakingResult, gameId, _i, _a, groupId, Members, gameId, AllGroups, MatchMakingResult, gameId, _b, _c, groupId, e_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 33, , 34]);
                        return [4, groups_model_1.default.ChangeMatchMakingState(data.groupId, "start")];
                    case 1:
                        response = _d.sent();
                        return [4, groups_model_1.default.Get(data.groupId)];
                    case 2:
                        ModelResponse = _d.sent();
                        console.log("StartGroup: ", {
                            ModelStatus: ModelResponse.Status,
                            Payload: !!ModelResponse.Payload,
                            ResponseStatus: response.Status,
                            ModelResponse: JSON.stringify(ModelResponse)
                        });
                        if (!(ModelResponse.Status === status_1.default.PROCCESS_SUCCESS &&
                            response.Status === status_1.default.PROCCESS_SUCCESS &&
                            ModelResponse.Payload)) return [3, 32];
                        if (!(ModelResponse.Payload.Scenario === groups_enums_1.scenario.Filimo)) return [3, 17];
                        Members = ModelResponse.Payload.Members.map(function (user) { return user._id.toString(); });
                        if (!(ModelResponse.Payload.Members.length === groups_enums_1.membersLimit.Filimo)) return [3, 8];
                        return [4, (0, game_model_1.CreateParty)()];
                    case 3:
                        gameId = _d.sent();
                        GroupData.RemoveGroup(data.groupId);
                        return [4, model_redis_1.GroupRedis.DeleteGroup(data.groupId)];
                    case 4:
                        _d.sent();
                        return [4, users_model_1.default.SetGameIdToUsers(ModelResponse.Payload.Members.map(function (item) { return item._id; }), gameId)];
                    case 5:
                        _d.sent();
                        return [4, filimo_data_layer_1.default.InitParty({
                                _id: gameId,
                                Members: Members,
                                EnvironmentId: ModelResponse.Payload.Environment,
                                GameMode: ModelResponse.Payload.Mode,
                                Scenario: ModelResponse.Payload.Scenario
                            }, socket)];
                    case 6:
                        _d.sent();
                        GroupsWs._emitToRoom("Group@".concat(data.groupId), groups_events_ws_1.default.StartGroup, { gameId: gameId });
                        return [4, groups_model_1.default.DeleteGroup(data.groupId)];
                    case 7:
                        _d.sent();
                        return [3, 17];
                    case 8: return [4, groups_model_1.default.GetAll(true)];
                    case 9:
                        AllGroups = (_d.sent()).Payload;
                        AllGroups = AllGroups.map(function (group) {
                            return {
                                Members: JSON.parse(JSON.stringify(group.Members)),
                                _id: group._id.toString(),
                                Date: group.Date,
                                Mode: group.Mode,
                                Scenario: group.Scenario,
                                State: 0,
                                Gender: 0,
                            };
                        });
                        console.log("Groups Len ".concat(AllGroups.length));
                        console.log("Members Len ".concat(Members.length));
                        return [4, (0, matchmaking_service_1.default)(AllGroups, {
                                Members: JSON.parse(JSON.stringify(Members)),
                                _id: ModelResponse.Payload._id.toString(),
                                Date: ModelResponse.Payload.Date,
                                Mode: ModelResponse.Payload.Mode,
                                Scenario: ModelResponse.Payload.Scenario,
                                State: 0,
                                Gender: 0,
                            }, groups_enums_1.membersLimit.Filimo, undefined, 0, 0, undefined)];
                    case 10:
                        MatchMakingResult = _d.sent();
                        if (!(MatchMakingResult !== null)) return [3, 16];
                        return [4, (0, game_model_1.CreateParty)()];
                    case 11:
                        gameId = _d.sent();
                        GroupData.RemoveGroup(data.groupId);
                        return [4, model_redis_1.GroupRedis.DeleteGroup(data.groupId)];
                    case 12:
                        _d.sent();
                        return [4, users_model_1.default.SetGameIdToUsers(ModelResponse.Payload.Members.map(function (item) { return item._id; }), gameId)];
                    case 13:
                        _d.sent();
                        return [4, filimo_data_layer_1.default.InitParty({
                                _id: gameId,
                                Members: Members,
                                EnvironmentId: ModelResponse.Payload.Environment,
                                GameMode: ModelResponse.Payload.Mode,
                                Scenario: ModelResponse.Payload.Scenario
                            }, socket)];
                    case 14:
                        _d.sent();
                        for (_i = 0, _a = MatchMakingResult.MatchedGroupsId; _i < _a.length; _i++) {
                            groupId = _a[_i];
                            GroupsWs._emitToRoom("Group@".concat(groupId), groups_events_ws_1.default.StartGroup, { gameId: gameId });
                        }
                        return [4, groups_model_1.default.DeleteGroups(MatchMakingResult.MatchedGroupsId)];
                    case 15:
                        _d.sent();
                        return [3, 17];
                    case 16:
                        GroupsWs._emitToRoom("Group@".concat(data.groupId), groups_events_ws_1.default.MatchMaking, { status: true });
                        _d.label = 17;
                    case 17:
                        if (!(ModelResponse.Payload.Scenario === groups_enums_1.scenario.Classic)) return [3, 32];
                        console.log("Classic SCENARIO");
                        Members = ModelResponse.Payload.Members.map(function (user) { return user._id.toString(); });
                        console.log("MEMBERS COUNT: ".concat(ModelResponse.Payload.Members.length));
                        if (!(ModelResponse.Payload.Members.length === groups_enums_1.membersLimit.Classic)) return [3, 23];
                        console.log("START GROUP");
                        return [4, (0, game_model_1.CreateParty)()];
                    case 18:
                        gameId = _d.sent();
                        GroupData.RemoveGroup(data.groupId);
                        return [4, model_redis_1.GroupRedis.DeleteGroup(data.groupId)];
                    case 19:
                        _d.sent();
                        return [4, users_model_1.default.SetGameIdToUsers(ModelResponse.Payload.Members.map(function (item) { return item._id; }), gameId)];
                    case 20:
                        _d.sent();
                        return [4, classic_data_layer_1.default.InitParty({
                                _id: gameId,
                                Members: Members,
                                EnvironmentId: ModelResponse.Payload.Environment,
                                GameMode: ModelResponse.Payload.Mode,
                                Scenario: ModelResponse.Payload.Scenario
                            }, socket)];
                    case 21:
                        _d.sent();
                        GroupsWs._emitToRoom("Group@".concat(data.groupId), groups_events_ws_1.default.StartGroup, { gameId: gameId });
                        return [4, groups_model_1.default.DeleteGroup(data.groupId)];
                    case 22:
                        _d.sent();
                        return [3, 32];
                    case 23:
                        console.log("MATCH MAKING");
                        return [4, groups_model_1.default.GetAll(true)];
                    case 24:
                        AllGroups = (_d.sent()).Payload;
                        AllGroups = AllGroups.map(function (group) {
                            return {
                                Members: JSON.parse(JSON.stringify(group.Members)),
                                _id: group._id.toString(),
                                Date: group.Date,
                                Mode: group.Mode,
                                Scenario: group.Scenario,
                                State: 0,
                                Gender: 0,
                            };
                        });
                        return [4, (0, matchmaking_service_1.default)(AllGroups, {
                                Members: JSON.parse(JSON.stringify(Members)),
                                _id: ModelResponse.Payload._id.toString(),
                                Date: ModelResponse.Payload.Date,
                                Mode: ModelResponse.Payload.Mode,
                                Scenario: ModelResponse.Payload.Scenario,
                                State: 0,
                                Gender: 0,
                            }, groups_enums_1.membersLimit.Classic, undefined, 0, 0, undefined)];
                    case 25:
                        MatchMakingResult = _d.sent();
                        if (!(MatchMakingResult !== null)) return [3, 31];
                        return [4, (0, game_model_1.CreateParty)()];
                    case 26:
                        gameId = _d.sent();
                        GroupData.RemoveGroup(data.groupId);
                        return [4, model_redis_1.GroupRedis.DeleteGroup(data.groupId)];
                    case 27:
                        _d.sent();
                        return [4, users_model_1.default.SetGameIdToUsers(ModelResponse.Payload.Members.map(function (item) { return item._id; }), gameId)];
                    case 28:
                        _d.sent();
                        return [4, classic_data_layer_1.default.InitParty({
                                _id: gameId,
                                Members: Members,
                                EnvironmentId: ModelResponse.Payload.Environment,
                                GameMode: ModelResponse.Payload.Mode,
                                Scenario: ModelResponse.Payload.Scenario
                            }, socket)];
                    case 29:
                        _d.sent();
                        for (_b = 0, _c = MatchMakingResult.MatchedGroupsId; _b < _c.length; _b++) {
                            groupId = _c[_b];
                            GroupsWs._emitToRoom("Group@".concat(groupId), groups_events_ws_1.default.StartGroup, { gameId: gameId });
                        }
                        return [4, groups_model_1.default.DeleteGroups(MatchMakingResult.MatchedGroupsId)];
                    case 30:
                        _d.sent();
                        return [3, 32];
                    case 31:
                        GroupsWs._emitToRoom("Group@".concat(data.groupId), groups_events_ws_1.default.MatchMaking, { status: true });
                        _d.label = 32;
                    case 32: return [3, 34];
                    case 33:
                        e_3 = _d.sent();
                        console.trace(e_3);
                        return [3, 34];
                    case 34: return [2];
                }
            });
        });
    };
    return GroupsWs;
}(socket_abs_1.default));
exports.GroupsWs = GroupsWs;
