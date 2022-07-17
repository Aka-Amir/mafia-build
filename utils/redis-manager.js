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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
var redis_1 = require("redis");
var RedisManager = (function () {
    function RedisManager() {
    }
    RedisManager.prototype.setAuthentication = function (config) {
        this.config = config !== null ? config : { url: "redis://localhost:6379" };
    };
    RedisManager.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client = (0, redis_1.createClient)(this.config);
                        return [4, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    RedisManager.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.disconnect()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    RedisManager.prototype.Get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.GET(key)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    RedisManager.prototype.Set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.SET(key, value)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    RedisManager.prototype.Delete = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = typeof keys === "string" ? [keys] : keys;
                        return [4, this.client.DEL(keys)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    RedisManager.prototype.GetAllKeys = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pattern =
                            typeof pattern === "string"
                                ? pattern
                                : "".concat((pattern === null || pattern === void 0 ? void 0 : pattern.$start) || "", "*").concat((pattern === null || pattern === void 0 ? void 0 : pattern.$end) || "");
                        return [4, this.client.KEYS(pattern || "*")];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    RedisManager.prototype.DeleteByPatter = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.Delete;
                        return [4, this.GetAllKeys(pattern)];
                    case 1: return [4, _a.apply(this, [_b.sent()])];
                    case 2: return [2, _b.sent()];
                }
            });
        });
    };
    return RedisManager;
}());
exports.RedisManager = RedisManager;
exports.default = RedisManager;
