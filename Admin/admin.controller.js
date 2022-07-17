"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AdminController = void 0;
var router_1 = require("../Core/decorators/router");
var admin_constants_1 = require("./admin.constants");
var admin_middleware_1 = require("./admin.middleware");
var admin_model_1 = __importDefault(require("./admin.model"));
var zarinpal_model_1 = __importDefault(require("../Shop/zarinpal.model"));
var users_model_1 = __importDefault(require("../Users/users.model"));
var shop_model_1 = __importDefault(require("../Shop/shop.model"));
var settings_redis_1 = __importDefault(require("../Settings/settings.redis"));
var status_1 = __importDefault(require("../Core/status"));
var inventory_model_1 = __importDefault(require("../Inventory/inventory.model"));
var AdminController = (function () {
    function AdminController() {
    }
    AdminController.prototype.Signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, admin_model_1.default.Create(req.body.Username, req.body.Password, req.body.Access)];
                    case 1:
                        user = _a.sent();
                        res.status(user.Status).send();
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.trace(e_1);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdminController.prototype.Login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, admin_model_1.default.Login(req.body.Username, req.body.Password)];
                    case 1:
                        user = _a.sent();
                        res.status(user.Status).send(user.Payload);
                        return [3, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.trace(e_2);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdminController.prototype.GetUserCount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var UserCount, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, users_model_1.default.GetUserCount()];
                    case 1:
                        UserCount = _a.sent();
                        res.status(200).send(UserCount.Payload);
                        return [3, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdminController.prototype.ShopStatistics = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ShopStatistics, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, zarinpal_model_1.default.ShopStatistics()];
                    case 1:
                        ShopStatistics = (_a.sent()).Payload;
                        res.status(200).send(ShopStatistics);
                        return [3, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.trace(e_4);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdminController.prototype.Create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_model_1.default.Create(req.body)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS) {
                            res.status(200).send(ModelResponse);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.trace(e_5);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdminController.prototype.CheckToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.status(200).send({ valid: true });
                }
                catch (e) {
                    console.trace(e);
                    res.status(501).send();
                }
                return [2];
            });
        });
    };
    AdminController.prototype.SetScenarioLimit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, settings_redis_1.default.SetScenarioLimit(req.body.Scenario, req.body.Value)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ valid: true });
                        return [3, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.trace(e_6);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdminController.prototype.Test = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, inventory_model_1.default.GetBooster("62b061de684c274ef0c2dfaa")];
                    case 1:
                        data = _a.sent();
                        res.send({ data: data });
                        return [3, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.trace(e_7);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    __decorate([
        (0, router_1.Post)("/signup")
    ], AdminController.prototype, "Signup", null);
    __decorate([
        (0, router_1.Post)("/login")
    ], AdminController.prototype, "Login", null);
    __decorate([
        (0, router_1.Post)("/statistics/users/count", [admin_middleware_1.AdminMiddleware, (0, admin_middleware_1.AdminAccess)(admin_constants_1.AdminSections.Statistics, admin_constants_1.AdminRouteSections.Get)])
    ], AdminController.prototype, "GetUserCount", null);
    __decorate([
        (0, router_1.Post)("/statistics/shop", [admin_middleware_1.AdminMiddleware, (0, admin_middleware_1.AdminAccess)(admin_constants_1.AdminSections.Statistics, admin_constants_1.AdminRouteSections.Get)])
    ], AdminController.prototype, "ShopStatistics", null);
    __decorate([
        (0, router_1.Post)("/shop/create", [admin_middleware_1.AdminMiddleware, (0, admin_middleware_1.AdminAccess)(admin_constants_1.AdminSections.Shop, admin_constants_1.AdminRouteSections.Create)])
    ], AdminController.prototype, "Create", null);
    __decorate([
        (0, router_1.Get)("/token/check", [admin_middleware_1.AdminMiddleware])
    ], AdminController.prototype, "CheckToken", null);
    __decorate([
        (0, router_1.Post)("/set_scenario_limit", [admin_middleware_1.AdminMiddleware])
    ], AdminController.prototype, "SetScenarioLimit", null);
    __decorate([
        (0, router_1.Post)("/test")
    ], AdminController.prototype, "Test", null);
    AdminController = __decorate([
        (0, router_1.RouterModule)("/admin")
    ], AdminController);
    return AdminController;
}());
exports.AdminController = AdminController;
