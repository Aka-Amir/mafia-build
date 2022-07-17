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
var inventory_schema_1 = __importDefault(require("./inventory.schema"));
var shop_model_1 = __importDefault(require("../Shop/shop.model"));
var shop_schema_1 = __importDefault(require("../Shop/shop.schema"));
var users_model_1 = __importDefault(require("../Users/users.model"));
var shop_interface_1 = require("../Shop/shop.interface");
var status_1 = __importDefault(require("../Core/status"));
var InventoryModel = (function () {
    function InventoryModel() {
    }
    InventoryModel.AddToInventory = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var productInfo, IsInInventory, _a, _b, MilliSecondsInSecond, ExpireTime, InventoryModel_1, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        return [4, shop_model_1.default.GetProductInfo(productId)];
                    case 1:
                        productInfo = (_c.sent()).Payload;
                        if (!productInfo.IsUnique) return [3, 3];
                        return [4, this.IsInInventory(userId, productId)];
                    case 2:
                        _a = (_c.sent()).Payload;
                        return [3, 4];
                    case 3:
                        _a = false;
                        _c.label = 4;
                    case 4:
                        IsInInventory = _a;
                        if (IsInInventory && productInfo.IsUnique) {
                            return [2, {
                                    Message: "Product Is In Inventory",
                                    Status: status_1.default.PROCCESS_FAILED
                                }];
                        }
                        if (!productInfo.Item) return [3, 6];
                        return [4, users_model_1.default.IncreaseParameter(userId, productInfo.Item, productInfo.Balance)];
                    case 5:
                        _b = _c.sent();
                        return [3, 7];
                    case 6:
                        _b = void 0;
                        _c.label = 7;
                    case 7:
                        _b;
                        return [4, users_model_1.default.IncreaseParameter(userId, shop_interface_1.PaymentType[productInfo.PaymentType], productInfo.Price * -1)];
                    case 8:
                        _c.sent();
                        MilliSecondsInSecond = 1000;
                        ExpireTime = new Date(Date.now() + (productInfo.ExpireDate * MilliSecondsInSecond));
                        if (!(productInfo.Type === shop_interface_1.Type.Vip)) return [3, 10];
                        this.AddVipItemsToInventory(userId, productInfo.ExpireDate ? ExpireTime : null);
                        return [4, users_model_1.default.SetVip(userId, ExpireTime)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        InventoryModel_1 = new inventory_schema_1.default();
                        InventoryModel_1.ExpireDate = productInfo.ExpireDate ? ExpireTime : null;
                        InventoryModel_1.UserId = userId;
                        InventoryModel_1.Type = productInfo.Type;
                        InventoryModel_1.PurchaseCode = productInfo.IsUniqueType ? "".concat(userId, "@").concat(shop_interface_1.Type[productInfo.Type]) : "".concat(userId, "@").concat(shop_interface_1.Type[productInfo.Type], "@").concat(Date.now());
                        InventoryModel_1.ProductId = productId;
                        InventoryModel_1.IsUnique = productInfo.IsUnique;
                        return [4, InventoryModel_1.save()];
                    case 11:
                        _c.sent();
                        return [2, {
                                Message: "Process Success",
                                Status: status_1.default.PROCCESS_SUCCESS
                            }];
                    case 12:
                        e_1 = _c.sent();
                        return [2, {
                                Message: "Process Failed",
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 13: return [2];
                }
            });
        });
    };
    InventoryModel.AddVipItemsToInventory = function (userId, ExpireDate) {
        return __awaiter(this, void 0, void 0, function () {
            var items, _i, items_1, product, InventoryModel_2, _1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4, shop_schema_1.default.find({
                                $or: [
                                    { VipGift: true },
                                    { ActiveForVip: true },
                                ]
                            }).exec()];
                    case 1:
                        items = _a.sent();
                        if (!items)
                            return [2];
                        _i = 0, items_1 = items;
                        _a.label = 2;
                    case 2:
                        if (!(_i < items_1.length)) return [3, 7];
                        product = items_1[_i];
                        InventoryModel_2 = new inventory_schema_1.default();
                        InventoryModel_2.ExpireDate = product.ActiveForVip ? ExpireDate : null;
                        InventoryModel_2.UserId = userId;
                        InventoryModel_2.Type = product.Type;
                        InventoryModel_2.PurchaseCode = product.IsUniqueType ? "".concat(userId, "@").concat(shop_interface_1.Type[product.Type]) : "".concat(userId, "@").concat(shop_interface_1.Type[product.Type], "@").concat(Date.now());
                        InventoryModel_2.ProductId = product._id;
                        InventoryModel_2.IsUnique = product.IsUnique;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, InventoryModel_2.save()];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        _1 = _a.sent();
                        return [3, 6];
                    case 6:
                        _i++;
                        return [3, 2];
                    case 7: return [3, 9];
                    case 8:
                        e_2 = _a.sent();
                        return [2, {
                                Message: "Process Failed",
                                Status: status_1.default.PROCCESS_FAILED
                            }];
                    case 9: return [2];
                }
            });
        });
    };
    InventoryModel.IsInInventory = function (userId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var Response_1, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, inventory_schema_1.default.find({ UserId: userId, ProductId: productId }).exec()];
                    case 1:
                        Response_1 = _a.sent();
                        if (Response_1.length >= 1) {
                            return [2, {
                                    Message: "Process Success",
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Payload: true
                                }];
                        }
                        else {
                            return [2, {
                                    Message: "Process Success",
                                    Status: status_1.default.PROCCESS_SUCCESS,
                                    Payload: false
                                }];
                        }
                        return [3, 3];
                    case 2:
                        e_3 = _a.sent();
                        throw new Error(e_3);
                    case 3: return [2];
                }
            });
        });
    };
    InventoryModel.GetInventory = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var Inventory, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.RemoveExpiredItems(userId)];
                    case 1:
                        _a.sent();
                        return [4, inventory_schema_1.default.find({ UserId: userId }, {
                                ProductId: 1,
                                ExpireDate: 1,
                                IsUnique: 1,
                                Type: 1,
                            }).exec()];
                    case 2:
                        Inventory = _a.sent();
                        return [2, {
                                Message: "Process Success",
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Payload: Inventory
                            }];
                    case 3:
                        e_4 = _a.sent();
                        return [2, {
                                Message: "Process Failed",
                                Status: status_1.default.NOT_FOUND,
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    InventoryModel.RemoveExpiredItems = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, inventory_schema_1.default.deleteMany({
                                UserId: userId,
                                ExpireDate: {
                                    $lt: Date.now()
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_SUCCESS,
                                Message: "Process Success"
                            }];
                    case 2:
                        e_5 = _a.sent();
                        return [2, {
                                Status: status_1.default.PROCCESS_FAILED,
                                Message: e_5
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    InventoryModel.GetBooster = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var UserBooster, ProductInfo, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, inventory_schema_1.default.findOne({ UserId: userId, Type: shop_interface_1.Type.Booster }).exec()];
                    case 1:
                        UserBooster = _a.sent();
                        if (!(UserBooster === null || UserBooster === void 0 ? void 0 : UserBooster.ProductId)) return [3, 3];
                        return [4, shop_model_1.default.GetProductInfo(UserBooster.ProductId)];
                    case 2:
                        ProductInfo = (_a.sent()).Payload;
                        return [2, ProductInfo.Booster];
                    case 3: return [2, 1];
                    case 4: return [3, 6];
                    case 5:
                        e_6 = _a.sent();
                        console.trace(e_6);
                        return [2, 1];
                    case 6: return [2];
                }
            });
        });
    };
    return InventoryModel;
}());
exports.default = InventoryModel;
