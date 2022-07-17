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
var report_schema_1 = __importDefault(require("./report.schema"));
var utils_service_1 = require("../utils/utils.service");
var report_interface_1 = require("./report.interface");
var users_model_1 = __importDefault(require("../Users/users.model"));
var Punishments = {
    rudity: {
        negetivePoint: 70,
        banTime: {
            hour: 3,
        }
    },
    collude: {
        negetivePoint: 40,
        banTime: {
            hour: 1,
            minute: 30
        }
    },
    hack: {
        negetivePoint: 100,
        banTime: {
            day: 10
        }
    },
    announceRole: {
        negetivePoint: 60,
        banTime: {
            hour: 2
        }
    },
};
var ReportModel = (function () {
    function ReportModel() {
    }
    ReportModel.Create = function (UserId, GameId, ReporterId, ReportType, Message) {
        return __awaiter(this, void 0, void 0, function () {
            var newReport, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newReport = new report_schema_1.default();
                        newReport.UserId = UserId;
                        newReport.GameId = GameId;
                        newReport.ReporterId = ReporterId;
                        newReport.ReportType = ReportType;
                        newReport.Message = Message;
                        return [4, newReport.save()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 3: return [2];
                }
            });
        });
    };
    ReportModel.CalculateBehaviourScore = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            var allReports, reportGroupByGameId, punishments, groupId, reports, validReports, _i, validReports_1, validReport, negetivePoint, Time, _a, punishments_1, punishment, time, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4, report_schema_1.default.find({ UserId: UserId })];
                    case 1:
                        allReports = _b.sent();
                        reportGroupByGameId = (0, utils_service_1.groupBy)(allReports, function (report) { return report.GameId; });
                        punishments = [];
                        for (groupId in reportGroupByGameId) {
                            reports = Object.values((0, utils_service_1.groupBy)(reportGroupByGameId[groupId], function (report) { return report.ReportType; }));
                            validReports = reports.filter(function (item) { return item.length === 4; });
                            for (_i = 0, validReports_1 = validReports; _i < validReports_1.length; _i++) {
                                validReport = validReports_1[_i];
                                punishments.push(validReport[0].ReportType);
                            }
                        }
                        if (!(punishments.length !== 0)) return [3, 4];
                        negetivePoint = 0;
                        Time = {
                            year: 0,
                            month: 0,
                            day: 0,
                            hour: 0,
                            minute: 0,
                        };
                        for (_a = 0, punishments_1 = punishments; _a < punishments_1.length; _a++) {
                            punishment = punishments_1[_a];
                            negetivePoint += Punishments[report_interface_1.ReportTypes[punishment]].negetivePoint;
                            for (time in Punishments[report_interface_1.ReportTypes[punishment]].banTime) {
                                Time[time] += Punishments[report_interface_1.ReportTypes[punishment]].banTime[time];
                            }
                        }
                        return [4, users_model_1.default.BanUser(UserId, Time)];
                    case 2:
                        _b.sent();
                        return [4, users_model_1.default.ResetBehaviourScore(UserId)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2, {
                            Message: "Success",
                            Status: status_1.default.PROCCESS_SUCCESS,
                        }];
                    case 5:
                        error_2 = _b.sent();
                        return [2, { Message: "Failed", Status: status_1.default.PROCCESS_FAILED }];
                    case 6: return [2];
                }
            });
        });
    };
    return ReportModel;
}());
exports.default = ReportModel;
