"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var users_schema_1 = require("../Users/users.schema");
var shop_schema_1 = require("../Shop/shop.schema");
exports.inventoryCollectionName = "colInventory";
var Schema = new mongoose_1.default.Schema({
    UserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: users_schema_1.usersCollectionName,
        required: true
    },
    ProductId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: shop_schema_1.shopCollectionName,
        required: true
    },
    ExpireDate: {
        type: Date,
        default: null
    },
    PurchaseCode: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    Type: {
        type: Number,
        required: true
    },
    IsUnique: {
        type: Boolean,
        default: true
    }
});
var model = mongoose_1.default.model(exports.inventoryCollectionName, Schema);
exports.default = model;
