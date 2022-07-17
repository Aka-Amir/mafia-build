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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var classic_scenario_1 = __importDefault(require("../core/classic.scenario"));
var interface_1 = require("../services/interface");
var socket_abs_1 = __importDefault(require("../../Core/interface/socket.abs"));
var IInitParty = {
    _id: String(),
    Members: Array(),
    GameMode: Number()
};
var IPassCourtSpeak = {
    GameId: String(),
};
var IEnvSetting = {
    UserId: String(),
    GameId: String(),
};
var ISituationRequest = {
    Vote: Boolean(),
    GameId: String(),
};
var IUserOpinion = {
    Opinion: Number(),
    GameId: String(),
};
var IChallengeRequest = {
    GameId: String()
};
var IAcceptChallenge = {
    GameId: String(),
    Challenger: String(),
};
var IUseAbility = {
    GameId: String(),
    UserRole: Number(),
};
var IVote = {
    UserId: String(),
    VictimId: String(),
    GameId: String(),
};
var Classic = (function (_super) {
    __extends(Classic, _super);
    function Classic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Classic.__ctor__ = function (_io) {
        this.io = _io;
        classic_scenario_1.default.io = _io;
    };
    Classic.InitParty = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, isValid, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        isValid = (0, interface_1.CheckValidation)(IInitParty, data);
                        if (!isValid) return [3, 2];
                        return [4, classic_scenario_1.default.InitParty(data)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.trace(e_1);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.SetIo = function (io) {
        classic_scenario_1.default.io = io;
    };
    Classic.Ready = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        console.log("Ready: ".concat(JSON.stringify(input)));
                        return [4, classic_scenario_1.default.Ready(data)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_2 = _a.sent();
                        console.trace(e_2);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.EnvSetting = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.EnvSetting(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.PassTurn = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        console.log("[PassTurn]: ".concat(input.UserId));
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.PassTurn(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_4 = _a.sent();
                        console.trace(e_4);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.Quit = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.Quit(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.ExecutionAnimation = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.ExecutionAnimation(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.Users = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        console.log("Get Users");
                        return [4, classic_scenario_1.default.Users(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_7 = _a.sent();
                        console.trace(e_7);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.ConcludeSituationRequest = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        console.log("ConcludeSituationRequestTrigger");
                        return [4, classic_scenario_1.default.StartConcludeSituationRequest(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_8 = _a.sent();
                        console.trace(e_8);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.Willing = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.EndWilling(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.log(input);
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_9 = _a.sent();
                        console.trace(e_9);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.SituationRequest = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(ISituationRequest, data)) return [3, 2];
                        return [4, classic_scenario_1.default.SituationRequest(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_10 = _a.sent();
                        console.trace(e_10);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.UserOpinion = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IUserOpinion, data)) return [3, 2];
                        return [4, classic_scenario_1.default.UserOpinion(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_11 = _a.sent();
                        console.trace(e_11);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.ChallengeRequest = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IChallengeRequest, data)) return [3, 2];
                        return [4, classic_scenario_1.default.ChallengeRequest(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_12 = _a.sent();
                        console.trace(e_12);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.AcceptChallenge = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IAcceptChallenge, data)) return [3, 2];
                        return [4, classic_scenario_1.default.AcceptChallenge(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_13 = _a.sent();
                        console.trace(e_13);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.UseAbility = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IUseAbility, data)) return [3, 2];
                        return [4, classic_scenario_1.default.UseAbility(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_14 = _a.sent();
                        console.trace(e_14);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.Vote = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, isValid, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        isValid = (0, interface_1.CheckValidation)(IVote, data);
                        if (!isValid) return [3, 2];
                        return [4, classic_scenario_1.default.Vote(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_15 = _a.sent();
                        console.trace(e_15);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.PassCourtSpeak = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, isValid, e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        isValid = (0, interface_1.CheckValidation)(IPassCourtSpeak, data);
                        if (!isValid) return [3, 2];
                        return [4, classic_scenario_1.default.PassCourtSpeak(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_16 = _a.sent();
                        console.trace(e_16);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.Count = function () {
    };
    Classic.VoteList = function () {
    };
    Classic.ConcludeTheNight = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.StartConcludeTheNight(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_17 = _a.sent();
                        console.trace(e_17);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Classic.StartSpeak = function (input, SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (input.UserId !== SocketNode.handshake.query.userId)
                            return [2];
                        data = __assign(__assign({}, input), { SocketNode: SocketNode });
                        if (!(0, interface_1.CheckValidation)(IEnvSetting, data)) return [3, 2];
                        return [4, classic_scenario_1.default.StartSpeak(data)];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        console.trace("Schema Error");
                        return [2, false];
                    case 3: return [3, 5];
                    case 4:
                        e_18 = _a.sent();
                        console.log(e_18);
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    Classic._disconnect = function (SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var e_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Disconnected: ".concat(SocketNode.handshake.query.UserId));
                        return [4, classic_scenario_1.default.Disconnect({ SocketNode: SocketNode })];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        e_19 = _a.sent();
                        console.trace(e_19);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    Classic._connect = function (SocketNode) {
        return __awaiter(this, void 0, void 0, function () {
            var e_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Connect: ".concat(SocketNode.handshake.query.UserId));
                        return [4, classic_scenario_1.default.Connect({ SocketNode: SocketNode })];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        e_20 = _a.sent();
                        console.trace(e_20);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return Classic;
}(socket_abs_1.default));
exports.default = Classic;
