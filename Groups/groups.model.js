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
var status_2 = __importDefault(require("../Core/status"));
var groups_schema_1 = __importDefault(require("./groups.schema"));
var groups_enums_1 = require("./groups.enums");
var GroupModel = (function () {
    function GroupModel() {
    }
    GroupModel.Create = function (creatorId) {
        return __awaiter(this, void 0, void 0, function () {
            var newModelGroup, record, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newModelGroup = new groups_schema_1.default({
                            Creator: creatorId,
                            Members: [creatorId],
                        });
                        return [4, newModelGroup.save()];
                    case 1:
                        record = _a.sent();
                        return [2, {
                                Message: "Ok",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: {
                                    _id: record._id.toString()
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        console.trace(err_1);
                        return [2, {
                                Message: "Can't save",
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.Get = function (GroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default
                                .findOne({ _id: GroupId })
                                .populate("Members", { _id: 1, Online: 1, Nickname: 1, AvatarId: 1 })
                                .exec()];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            return [2, {
                                    Message: "Ok",
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Payload: JSON.parse(JSON.stringify(data.toObject()))
                                }];
                        }
                        else {
                            return [2, {
                                    Message: "Group not found",
                                    Status: status_1.default.NOT_FOUND
                                }];
                        }
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.GetAll = function (inMatchMaking) {
        if (inMatchMaking === void 0) { inMatchMaking = false; }
        return __awaiter(this, void 0, void 0, function () {
            var data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.find({ IsInMatchMaking: inMatchMaking }).exec()];
                    case 1:
                        data = _a.sent();
                        return [2, {
                                Message: 'Ok',
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: data
                            }];
                    case 2:
                        err_3 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: "Failed"
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.ChangeMatchMakingState = function (groupId, state) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.updateOne({ _id: groupId }, { $set: { IsInMatchMaking: state === "start" } })
                                .exec()];
                    case 1:
                        _a.sent();
                        return [2, { Status: status_2.default.PROCCESS_SUCCESS, Message: "Updated !" }];
                    case 2:
                        e_1 = _a.sent();
                        return [2, { Status: status_2.default.PROCCESS_FAILED, Message: "Failed to update" }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.AddMember = function (UserId, GroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var IsItInGroup, scenarioName, maxMembersAlowed, currentMemberCount, updatedModel, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4, this.IsItUserInGroup(UserId, GroupId)];
                    case 1:
                        IsItInGroup = _a.sent();
                        if (!(IsItInGroup.Status == status_1.default.PROCCESS_SUCCESS)) return [3, 2];
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: 'User aleady exists'
                            }];
                    case 2:
                        scenarioName = groups_enums_1.scenario[IsItInGroup.Payload.Scenario];
                        maxMembersAlowed = groups_enums_1.membersLimit[scenarioName];
                        currentMemberCount = IsItInGroup.Payload.Members.length;
                        if (!(IsItInGroup.Payload && currentMemberCount < maxMembersAlowed)) return [3, 4];
                        return [4, groups_schema_1.default.findOneAndUpdate({ _id: GroupId }, {
                                $push: {
                                    Members: UserId
                                }
                            }).exec()];
                    case 3:
                        updatedModel = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: 'Ok',
                                Payload: {
                                    Members: updatedModel.Members
                                }
                            }];
                    case 4: return [2, {
                            Status: status_1.default.PROCCESS_FAILED,
                            Message: 'Max of member limit'
                        }];
                    case 5: return [3, 7];
                    case 6:
                        err_4 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: "Can't update"
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    GroupModel.IsItUserInGroup = function (UserId, GroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.findOne({ _id: GroupId }).exec()];
                    case 1:
                        data = _a.sent();
                        if (data && data.Members.includes(UserId)) {
                            return [2, {
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Message: 'UserId Exists in GroupId',
                                    Payload: data
                                }];
                        }
                        else {
                            return [2, {
                                    Status: status_1.default.NOT_FOUND,
                                    Message: 'UserId not exists in GroupId',
                                    Payload: data
                                }];
                        }
                        return [3, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.trace(err_5);
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: 'Error found'
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.DeleteGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.deleteOne({ _id: groupId }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Status: status_2.default.PROCCESS_SUCCESS,
                                Message: "Removed"
                            }];
                    case 2:
                        e_2 = _a.sent();
                        console.trace(e_2);
                        return [2, {
                                Status: status_2.default.PROCCESS_FAILED,
                                Message: "Faild to Remove Group"
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.DeleteGroups = function (groupIds) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _i, groupIds_1, groupId, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = [];
                        for (_i = 0, groupIds_1 = groupIds; _i < groupIds_1.length; _i++) {
                            groupId = groupIds_1[_i];
                            query.push({ _id: groupId });
                        }
                        return [4, groups_schema_1.default.deleteMany({
                                $or: query
                            }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Status: status_2.default.PROCCESS_SUCCESS,
                                Message: "Removed"
                            }];
                    case 2:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        return [2, {
                                Status: status_2.default.PROCCESS_FAILED,
                                Message: "Faild to Remove Group"
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.RemoveMember = function (UserId, GroupId, IsCreatorLeft, NewCreator) {
        return __awaiter(this, void 0, void 0, function () {
            var newData, groupData, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4, this.IsItUserInGroup(UserId, GroupId)];
                    case 1:
                        if (!((_a.sent()).Status == status_1.default.PROCCESS_SUCCESS)) return [3, 5];
                        newData = { $pull: { Members: UserId } };
                        if (IsCreatorLeft)
                            newData["$set"] = { Creator: NewCreator };
                        return [4, groups_schema_1.default.findOneAndUpdate({ _id: GroupId }, newData).exec()];
                    case 2:
                        groupData = _a.sent();
                        if (!(groupData.Members.length === 0)) return [3, 4];
                        return [4, groupData.delete({ _id: GroupId })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2, {
                            Status: status_1.default.PROCCESS_SUCCESS,
                            Message: 'UserId added to groupId'
                        }];
                    case 5: return [2, {
                            Status: status_1.default.NOT_FOUND,
                            Message: 'UserId not found in GroupId'
                        }];
                    case 6: return [3, 8];
                    case 7:
                        err_6 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: "Can't update"
                            }];
                    case 8: return [2];
                }
            });
        });
    };
    GroupModel.ChangeMode = function (GroupId, Mode) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.updateOne({ _id: GroupId }, { Mode: Mode }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: 'Mode changed'
                            }];
                    case 2:
                        err_7 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: 'Failed updateOne'
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.ChangeGroupStatus = function (GroupId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.updateOne({ _id: GroupId }, { IsActive: status }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: 'Ok',
                                Status: status_1.default.PROCCESS_SUCCESS
                            }];
                    case 2:
                        err_8 = _a.sent();
                        return [2, {
                                Message: 'Failed to change status',
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.ChangeGroupCanStart = function (GroupId, CanStart) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.updateOne({ _id: GroupId }, { CanStart: CanStart }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: 'Ok',
                                Status: status_1.default.PROCCESS_SUCCESS
                            }];
                    case 2:
                        err_9 = _a.sent();
                        return [2, {
                                Message: 'Failed to change status',
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.ActiveGroup = function (GroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var Result, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.ChangeGroupStatus(GroupId, true)];
                    case 1:
                        Result = _a.sent();
                        if (Result.Status == status_1.default.PROCCESS_SUCCESS) {
                            return [2, {
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Message: 'Group Actived',
                                    Payload: true
                                }];
                        }
                        else {
                            return [2, Result];
                        }
                        return [3, 3];
                    case 2:
                        err_10 = _a.sent();
                        return [2, {
                                Message: 'Failed',
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.DeactiveGroup = function (GroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var Result, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.ChangeGroupStatus(GroupId, false)];
                    case 1:
                        Result = _a.sent();
                        if (Result.Status == status_1.default.PROCCESS_SUCCESS) {
                            return [2, {
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Message: 'Group deactived',
                                    Payload: true
                                }];
                        }
                        else {
                            return [2, Result];
                        }
                        return [3, 3];
                    case 2:
                        err_11 = _a.sent();
                        return [2, {
                                Message: 'Failed',
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.ChangeScenario = function (GroupId, Scenario) {
        return __awaiter(this, void 0, void 0, function () {
            var err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.updateOne({ _id: GroupId }, { Scenario: Scenario }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: 'Scenario changed'
                            }];
                    case 2:
                        err_12 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: 'Failed'
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    GroupModel.ChangeEnvironment = function (GroupId, Environment) {
        return __awaiter(this, void 0, void 0, function () {
            var err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, groups_schema_1.default.updateOne({ _id: GroupId }, { Environment: Environment }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: 'Environment changed'
                            }];
                    case 2:
                        err_13 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: 'Failed'
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    return GroupModel;
}());
exports.default = GroupModel;
