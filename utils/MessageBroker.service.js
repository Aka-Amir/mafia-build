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
exports.MessageBrokerService = exports.SmsBroker = exports.MailBroker = exports.Protocol = exports.Purpose = void 0;
var sms_1 = __importDefault(require("./sms"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var html_template_generator_1 = require("./html-template.generator");
var Purpose;
(function (Purpose) {
    Purpose[Purpose["confirmation"] = 0] = "confirmation";
    Purpose[Purpose["info"] = 1] = "info";
    Purpose[Purpose["commercial"] = 2] = "commercial";
})(Purpose = exports.Purpose || (exports.Purpose = {}));
var Protocol;
(function (Protocol) {
    Protocol[Protocol["mail"] = 0] = "mail";
    Protocol[Protocol["sms"] = 1] = "sms";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
var Broker = (function () {
    function Broker(purpose) {
    }
    return Broker;
}());
var MailBroker = (function (_super) {
    __extends(MailBroker, _super);
    function MailBroker(purpose) {
        var _this = _super.call(this, purpose) || this;
        if (purpose === Purpose.confirmation) {
            _this._generator = new html_template_generator_1.TemplateGenerator(html_template_generator_1.ETemplateModel.emailVerification, "".concat(__dirname, "/assets"));
        }
        else {
            throw new Error("Not Implemented " + purpose.toString() + " Mail Type");
        }
        return _this;
    }
    MailBroker.prototype.SetTarget = function (targetUser) {
        this._target = targetUser;
    };
    MailBroker.prototype.SetData = function (data) {
        this._data = data;
    };
    MailBroker.prototype.Send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, transporter_1, response_1, transporter, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        html = this._generator.EmailVerification(this._data.payload);
                        if (!(process.env.SESSION === "prod")) return [3, 2];
                        transporter_1 = nodemailer_1.default
                            .createTransport({
                            port: 110,
                            service: "mail.mafia-nights.ir",
                            auth: {
                                user: "support",
                                pass: "ZV+I(NdbcEQT",
                            },
                        });
                        return [4, transporter_1.sendMail({
                                from: "support@mafia-nights.ir",
                                to: this._target,
                                subject: this._data.Subject,
                                html: html,
                            })];
                    case 1:
                        response_1 = _a.sent();
                        return [2, {
                                exit: 0,
                                payload: response_1
                            }];
                    case 2:
                        transporter = nodemailer_1.default
                            .createTransport({
                            service: "gmail",
                            auth: {
                                user: "supo.amirkhalili@gmail.com",
                                pass: "Amir-khalili-82",
                            },
                        });
                        return [4, transporter.sendMail({
                                from: "supo.amirkhalili@gmail.com",
                                to: this._target,
                                subject: this._data.Subject,
                                html: html,
                            })];
                    case 3:
                        response = _a.sent();
                        return [2, {
                                exit: 0,
                                payload: response
                            }];
                    case 4:
                        e_1 = _a.sent();
                        return [2, {
                                exit: -1,
                                payload: e_1
                            }];
                    case 5: return [2];
                }
            });
        });
    };
    return MailBroker;
}(Broker));
exports.MailBroker = MailBroker;
var SmsBroker = (function (_super) {
    __extends(SmsBroker, _super);
    function SmsBroker(purpose) {
        var _this = _super.call(this, purpose) || this;
        _this._purpose = purpose;
        return _this;
    }
    SmsBroker.prototype.SetTarget = function (targetUser) {
        this._target = targetUser;
    };
    SmsBroker.prototype.Send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _i, _a, item, _b, _c, response, _d, _e, item, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!(this._purpose === Purpose.confirmation)) return [3, 7];
                        if (!(this._target instanceof Array)) return [3, 5];
                        response = {};
                        _i = 0, _a = this._target;
                        _h.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        item = _a[_i];
                        _b = response;
                        _c = item;
                        return [4, sms_1.default.OTP(item, this._data)];
                    case 2:
                        _b[_c] = _h.sent();
                        _h.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, response];
                    case 5: return [4, sms_1.default.OTP(this._target, this._data)];
                    case 6: return [2, _h.sent()];
                    case 7:
                        if (!(this._target instanceof Array)) return [3, 12];
                        response = {};
                        _d = 0, _e = this._target;
                        _h.label = 8;
                    case 8:
                        if (!(_d < _e.length)) return [3, 11];
                        item = _e[_d];
                        _f = response;
                        _g = item;
                        return [4, sms_1.default.sendMessage(item, this._data)];
                    case 9:
                        _f[_g] = _h.sent();
                        _h.label = 10;
                    case 10:
                        _d++;
                        return [3, 8];
                    case 11: return [2, response];
                    case 12: return [4, sms_1.default.sendMessage(this._target, this._data)];
                    case 13: return [2, _h.sent()];
                }
            });
        });
    };
    SmsBroker.prototype.SetData = function (data) {
        this._data = data;
    };
    return SmsBroker;
}(Broker));
exports.SmsBroker = SmsBroker;
function MessageBrokerService(config) {
    if (config.protocol === Protocol.mail) {
        return new MailBroker(config.purpose);
    }
    else {
        return new SmsBroker(config.purpose);
    }
}
exports.MessageBrokerService = MessageBrokerService;
exports.default = MessageBrokerService;
