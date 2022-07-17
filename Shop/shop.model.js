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
var shop_schema_1 = __importDefault(require("./shop.schema"));
var shop_interface_1 = require("./shop.interface");
var users_schema_1 = __importDefault(require("../Users/users.schema"));
var inventory_model_1 = __importDefault(require("../Inventory/inventory.model"));
var ShopRepository = (function () {
    function ShopRepository() {
    }
    ShopRepository.Create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductModel, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ProductModel = new shop_schema_1.default(data);
                        return [4, ProductModel.save()
                                .catch(function (err) {
                                throw new Error(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Created",
                                Status: status_1.default.PROCCESS_SUCCESS
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2, { Message: error_1, Status: status_1.default.PROCCESS_FAILED }];
                    case 3: return [2];
                }
            });
        });
    };
    ShopRepository.Get = function (_a) {
        var _b = _a.all, all = _b === void 0 ? false : _b;
        return __awaiter(this, void 0, void 0, function () {
            var Query, projection, Data, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        Query = all ? {} : { $not: shop_interface_1.EnabledFor.Disabled };
                        projection = all ? { __v: 0 } : {
                            Name: 1,
                            Type: 1,
                            Description: 1,
                            Price: 1,
                            PaymentType: 1,
                            SKU: 1,
                            EnabledFor: 1,
                            Offer: 1,
                        };
                        return [4, shop_schema_1.default.find(Query, projection).exec()];
                    case 1:
                        Data = _c.sent();
                        return [2, {
                                Message: "Data Fetched",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: Data
                            }];
                    case 2:
                        e_1 = _c.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    ShopRepository.Update = function (_id, newData) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_schema_1.default.updateOne({ _id: _id }, { $set: newData }).exec()];
                    case 1:
                        _a.sent();
                        return [2, {
                                Message: "Data Updated",
                                Status: status_1.default.PROCCESS_SUCCESS,
                            }];
                    case 2:
                        e_2 = _a.sent();
                        return [2, {
                                Message: "Failed",
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    ShopRepository.GetProductInfo = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var Response_1, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, shop_schema_1.default.findById(productId).exec()];
                    case 1:
                        Response_1 = _a.sent();
                        return [2, {
                                Message: Response_1 ? "Data Fetched" : "Not Found",
                                Status: Response_1 ? status_1.default.PROCCESS_SUCCESS : status_1.default.NOT_FOUND,
                                Payload: Response_1
                            }];
                    case 2:
                        e_3 = _a.sent();
                        throw new Error("Can't Fetch");
                    case 3: return [2];
                }
            });
        });
    };
    ShopRepository.Gifts = function (Type) {
        return __awaiter(this, void 0, void 0, function () {
            var Query;
            return __generator(this, function (_a) {
                Query = {
                    Type: Type,
                    $or: [
                        { Rarity: shop_interface_1.Rarity.Common },
                        { Rarity: shop_interface_1.Rarity.Rare },
                        { Rarity: shop_interface_1.Rarity.SuperRare }
                    ],
                };
                return [2, shop_schema_1.default.find(Query).exec()];
            });
        });
    };
    ShopRepository.BoostersGift = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Query;
            return __generator(this, function (_a) {
                Query = {
                    Type: shop_interface_1.Type.Booster,
                    $or: [
                        { Rarity: shop_interface_1.Rarity.Common },
                        { Rarity: shop_interface_1.Rarity.Rare },
                        { Rarity: shop_interface_1.Rarity.SuperRare }
                    ],
                };
                return [2, shop_schema_1.default.find(Query).exec()];
            });
        });
    };
    ShopRepository.BuyProductByCoins = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var ProductInfo, UserInfo, canByWithPrimaryCoin, canByWithSecondaryCoin, CanBuy, Inventory, UserInfo_1, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4, this.GetProductInfo(productId)];
                    case 1:
                        ProductInfo = (_a.sent()).Payload;
                        return [4, users_schema_1.default.findById(userId)];
                    case 2:
                        UserInfo = _a.sent();
                        canByWithPrimaryCoin = ProductInfo.PaymentType === shop_interface_1.PaymentType.PrimaryCoin &&
                            UserInfo.PrimaryCoin >= ProductInfo.Price;
                        canByWithSecondaryCoin = ProductInfo.PaymentType === shop_interface_1.PaymentType.PrimaryCoin &&
                            UserInfo.PrimaryCoin >= ProductInfo.Price;
                        CanBuy = canByWithPrimaryCoin || canByWithSecondaryCoin;
                        if (!CanBuy) return [3, 7];
                        return [4, inventory_model_1.default.AddToInventory(userId, productId)];
                    case 3:
                        Inventory = _a.sent();
                        if (!(Inventory.Status === status_1.default.PROCCESS_SUCCESS)) return [3, 5];
                        return [4, users_schema_1.default.findById(userId)];
                    case 4:
                        UserInfo_1 = _a.sent();
                        return [2, {
                                Message: "Process Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: {
                                    PrimaryCoin: UserInfo_1.PrimaryCoin,
                                    SecondaryCoin: UserInfo_1.SecondaryCoin,
                                },
                            }];
                    case 5: return [2, {
                            Message: "Product Is In Inventory",
                            Status: status_1.default.PROCCESS_FAILED,
                        }];
                    case 6: return [3, 8];
                    case 7: return [2, {
                            Message: "Not Enough Coin",
                            Status: status_1.default.NOT_ENOUGH_COIN,
                        }];
                    case 8: return [3, 10];
                    case 9:
                        e_4 = _a.sent();
                        return [2, {
                                Message: "Can't Buy",
                                Status: status_1.default.PROCCESS_FAILED,
                            }];
                    case 10: return [2];
                }
            });
        });
    };
    return ShopRepository;
}());
exports.default = ShopRepository;
