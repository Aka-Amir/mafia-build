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
exports.ShopController = void 0;
var router_1 = require("../Core/decorators/router");
var shop_interface_1 = require("./shop.interface");
var shop_model_1 = __importDefault(require("./shop.model"));
var token_auth_1 = __importDefault(require("../utils/token.auth"));
var status_1 = __importDefault(require("../Core/status"));
var auth_guard_1 = require("../middlewares/auth.guard");
var inventory_model_1 = __importDefault(require("../Inventory/inventory.model"));
var users_model_1 = __importDefault(require("../Users/users.model"));
var iab_service_1 = __importDefault(require("../Purchase/iab.service"));
var zarinpal_service_1 = __importDefault(require("../utils/zarinpal.service"));
var game_redis_1 = __importDefault(require("../Scenarios/models/game.redis"));
var zarinpal_model_1 = __importDefault(require("./zarinpal.model"));
var groups_enums_1 = require("../Groups/groups.enums");
var ShopController = (function () {
    function ShopController() {
    }
    ShopController_1 = ShopController;
    ShopController.prototype.Create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_model_1.default.Create(req.body)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS) {
                            auth = token_auth_1.default.Create(ModelResponse, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(ModelResponse);
                        }
                        else {
                            res.status(400).send();
                        }
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
    ShopController.prototype.Update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_model_1.default.Update(req.body._id, req.body.newData)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS) {
                            auth = token_auth_1.default.Create(ModelResponse, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(ModelResponse);
                        }
                        else {
                            res.status(400).send();
                        }
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
    ShopController.prototype.BuyByCoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductInfo, ModelResponse, data, auth, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, shop_model_1.default.GetProductInfo(req.body.productId)];
                    case 1:
                        ProductInfo = (_a.sent()).Payload;
                        if (ProductInfo.PaymentType === shop_interface_1.PaymentType.InAppBilling)
                            throw new Error("");
                        return [4, shop_model_1.default.BuyProductByCoins(req.body.userId, req.body.productId)];
                    case 2:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload) {
                            data = {
                                Message: ModelResponse.Message,
                                Status: ModelResponse.Status,
                                PrimaryCoin: ModelResponse.Payload.PrimaryCoin,
                                SecondaryCoin: ModelResponse.Payload.SecondaryCoin,
                            };
                            auth = token_auth_1.default.Create(data, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(403).send();
                        }
                        return [3, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.trace(e_3);
                        res.status(403).send();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    ShopController.prototype.BuyByBazaar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductInfo, PurchaseResult, Inventory, UserInfo, ModelResponse, auth, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4, shop_model_1.default.GetProductInfo(req.body.productId)];
                    case 1:
                        ProductInfo = (_a.sent()).Payload;
                        if (ProductInfo.PaymentType !== shop_interface_1.PaymentType.InAppBilling)
                            throw new Error("use buy coin route");
                        return [4, iab_service_1.default.CheckInAppPurchaseBazaar(req.body.SKU, req.body.purchaseToken)];
                    case 2:
                        PurchaseResult = _a.sent();
                        if (!(PurchaseResult.status && !PurchaseResult.refund && !PurchaseResult.isUsed)) return [3, 7];
                        return [4, inventory_model_1.default.AddToInventory(req.body.userId, req.body.productId)];
                    case 3:
                        Inventory = _a.sent();
                        if (!(Inventory.Status === status_1.default.PROCCESS_SUCCESS)) return [3, 5];
                        return [4, users_model_1.default.GetUserById(req.body.userId)];
                    case 4:
                        UserInfo = (_a.sent()).Payload;
                        ModelResponse = {
                            Message: "Process Success",
                            Status: status_1.default.PROCCESS_SUCCESS,
                            PrimaryCoin: UserInfo.PrimaryCoin,
                            SecondaryCoin: UserInfo.SecondaryCoin
                        };
                        auth = token_auth_1.default.Create(ModelResponse, req.headers.authId);
                        res.setHeader("auth", auth);
                        res.status(200).send(ModelResponse);
                        return [3, 6];
                    case 5: throw new Error("Can't add to inventory");
                    case 6: return [3, 8];
                    case 7: throw new Error("".concat(PurchaseResult.status ? "process failed" : "", " ").concat(PurchaseResult.isUsed ? "Product used" : "", " ").concat(PurchaseResult.refund ? "Product refunded" : "", " "));
                    case 8: return [3, 10];
                    case 9:
                        e_4 = _a.sent();
                        console.trace(e_4);
                        res.status(403).send();
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    ShopController.prototype.BuyByMyket = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductInfo, PurchaseResult, Inventory, UserInfo, ModelResponse, auth, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4, shop_model_1.default.GetProductInfo(req.body.productId)];
                    case 1:
                        ProductInfo = (_a.sent()).Payload;
                        if (ProductInfo.PaymentType !== shop_interface_1.PaymentType.InAppBilling)
                            throw new Error("use buy coin route");
                        return [4, iab_service_1.default.CheckInAppPurchaseMyket(req.body.SKU, req.body.purchaseToken)];
                    case 2:
                        PurchaseResult = _a.sent();
                        if (!(PurchaseResult.status && !PurchaseResult.refund && !PurchaseResult.IsUsed)) return [3, 7];
                        return [4, inventory_model_1.default.AddToInventory(req.body.userId, req.body.productId)];
                    case 3:
                        Inventory = _a.sent();
                        if (!(Inventory.Status === status_1.default.PROCCESS_SUCCESS)) return [3, 5];
                        return [4, users_model_1.default.GetUserById(req.body.userId)];
                    case 4:
                        UserInfo = (_a.sent()).Payload;
                        ModelResponse = {
                            Message: "Process Success",
                            Status: status_1.default.PROCCESS_SUCCESS,
                            Payload: {
                                PrimaryCoin: UserInfo.PrimaryCoin,
                                SecondaryCoin: UserInfo.SecondaryCoin
                            }
                        };
                        auth = token_auth_1.default.Create(ModelResponse, req.headers.authId);
                        res.setHeader("auth", auth);
                        res.status(200).send(ModelResponse);
                        return [3, 6];
                    case 5: throw new Error("Can't add to inventory");
                    case 6: return [3, 8];
                    case 7: throw new Error("".concat(PurchaseResult.status ? "process failed" : "", " ").concat(PurchaseResult.IsUsed ? "Product used" : "", " ").concat(PurchaseResult.refund ? "Product refunded" : "", " "));
                    case 8: return [3, 10];
                    case 9:
                        e_5 = _a.sent();
                        console.trace(e_5);
                        res.status(403).send();
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    ShopController.prototype.BuyByZarinpal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductInfo_1, e_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_model_1.default.GetProductInfo(req.body.productId)];
                    case 1:
                        ProductInfo_1 = (_a.sent()).Payload;
                        if (ProductInfo_1.PaymentType !== shop_interface_1.PaymentType.InAppBilling)
                            throw new Error("use buy coin route");
                        zarinpal_service_1.default.PaymentRequest(ProductInfo_1.Price, JSON.stringify({
                            userId: req.body.userId,
                            productId: req.body.productId,
                            date: Date.now(),
                            price: ProductInfo_1.Price,
                        }))
                            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var auth;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(response.status === true)) return [3, 2];
                                        return [4, zarinpal_model_1.default.CreatePayment(req.body.userId, req.body.productId, response.authority, ProductInfo_1.Price)];
                                    case 1:
                                        _a.sent();
                                        auth = token_auth_1.default.Create({ Url: response.url }, req.headers.authId);
                                        res.setHeader("auth", auth);
                                        res.status(200).send({ Url: response.url });
                                        return [3, 3];
                                    case 2:
                                        res.status(403).send();
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        }); })
                            .catch(function () {
                            res.status(403).send();
                        });
                        return [3, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.trace(e_6);
                        res.status(403).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ShopController.prototype.Buy = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductInfo, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4, shop_model_1.default.GetProductInfo(req.body.productId)];
                    case 1:
                        ProductInfo = (_a.sent()).Payload;
                        if (!(ProductInfo.PaymentType === shop_interface_1.PaymentType.InAppBilling)) return [3, 8];
                        if (!(req.body.storePlatform === shop_interface_1.StorePlatforms.Bazaar)) return [3, 3];
                        return [4, (new ShopController_1()).BuyByBazaar(req, res)];
                    case 2:
                        _a.sent();
                        return [3, 7];
                    case 3:
                        if (!(req.body.storePlatform === shop_interface_1.StorePlatforms.Myket)) return [3, 5];
                        return [4, (new ShopController_1()).BuyByMyket(req, res)];
                    case 4:
                        _a.sent();
                        return [3, 7];
                    case 5:
                        if (!(req.body.storePlatform === shop_interface_1.StorePlatforms.Zarinpal)) return [3, 7];
                        return [4, (new ShopController_1()).BuyByZarinpal(req, res)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3, 10];
                    case 8: return [4, (new ShopController_1()).BuyByCoin(req, res)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3, 12];
                    case 11:
                        e_7 = _a.sent();
                        console.trace(e_7);
                        res.status(500).send();
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    ShopController.prototype.PaymentVerify = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var Authority, _a, Amount, authority_1, UserId_1, ProductId_1, e_8;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        Authority = req.query.Authority;
                        return [4, zarinpal_model_1.default.GetByAuthority(Authority)];
                    case 1:
                        _a = (_b.sent()).Payload, Amount = _a.Amount, authority_1 = _a.Authority, UserId_1 = _a.UserId, ProductId_1 = _a.ProductId;
                        zarinpal_service_1.default.PaymentVerify(Amount, authority_1)
                            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var Inventory;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(response.status === false)) return [3, 1];
                                        res.redirect("".concat(zarinpal_service_1.default.resultURL, "/").concat(response.errors.code));
                                        return [3, 4];
                                    case 1: return [4, zarinpal_model_1.default.SuccessPayment(authority_1)];
                                    case 2:
                                        _a.sent();
                                        return [4, inventory_model_1.default.AddToInventory(UserId_1, ProductId_1)];
                                    case 3:
                                        Inventory = _a.sent();
                                        if (Inventory.Status === status_1.default.PROCCESS_SUCCESS) {
                                            res.redirect("".concat(zarinpal_service_1.default.resultURL, "/").concat(response.code));
                                        }
                                        else {
                                            throw new Error("Can't add to inventory");
                                        }
                                        _a.label = 4;
                                    case 4: return [2];
                                }
                            });
                        }); })
                            .catch(function () {
                            res.status(500).send();
                        });
                        return [3, 3];
                    case 2:
                        e_8 = _b.sent();
                        console.trace(e_8);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ShopController.prototype.Get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_model_1.default.Get(req.body)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload) {
                            auth = token_auth_1.default.Create(ModelResponse.Payload, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(200).send(ModelResponse.Payload);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        e_9 = _a.sent();
                        console.trace(e_9);
                        res.status(501).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ShopController.prototype.GameScenarioPrice = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ScenarioClassic, ScenarioFilimo, auth, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, game_redis_1.default.GetPrice(groups_enums_1.scenario[0])];
                    case 1:
                        ScenarioClassic = _a.sent();
                        return [4, game_redis_1.default.GetPrice(groups_enums_1.scenario[1])];
                    case 2:
                        ScenarioFilimo = _a.sent();
                        auth = token_auth_1.default.Create({
                            ScenarioClassic: ScenarioClassic,
                            ScenarioFilimo: ScenarioFilimo,
                        }, req.headers.authId);
                        res.setHeader("auth", auth);
                        res.status(200).send({
                            ScenarioClassic: ScenarioClassic,
                            ScenarioFilimo: ScenarioFilimo,
                        });
                        return [3, 4];
                    case 3:
                        e_10 = _a.sent();
                        console.trace(e_10);
                        res.status(501).send();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    var ShopController_1;
    __decorate([
        (0, router_1.Post)("/create")
    ], ShopController.prototype, "Create", null);
    __decorate([
        (0, router_1.Post)("/update")
    ], ShopController.prototype, "Update", null);
    __decorate([
        (0, router_1.Post)("/buy/coin")
    ], ShopController.prototype, "BuyByCoin", null);
    __decorate([
        (0, router_1.Post)("/buy/bazaar")
    ], ShopController.prototype, "BuyByBazaar", null);
    __decorate([
        (0, router_1.Post)("/buy/myket")
    ], ShopController.prototype, "BuyByMyket", null);
    __decorate([
        (0, router_1.Post)("/buy/zarinpal")
    ], ShopController.prototype, "BuyByZarinpal", null);
    __decorate([
        (0, router_1.Post)("/buy")
    ], ShopController.prototype, "Buy", null);
    __decorate([
        (0, router_1.Get)("/zarinpal/verify")
    ], ShopController.prototype, "PaymentVerify", null);
    __decorate([
        (0, router_1.Post)("/get")
    ], ShopController.prototype, "Get", null);
    __decorate([
        (0, router_1.Post)("/scenario")
    ], ShopController.prototype, "GameScenarioPrice", null);
    ShopController = ShopController_1 = __decorate([
        (0, router_1.RouterModule)("/shop", [auth_guard_1.DataAuthentication])
    ], ShopController);
    return ShopController;
}());
exports.ShopController = ShopController;
exports.default = ShopController;
