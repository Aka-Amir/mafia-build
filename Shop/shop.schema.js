"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopCollectionName = void 0;
var mongoose_1 = require("mongoose");
var shop_interface_1 = require("./shop.interface");
exports.shopCollectionName = "colShop";
var ShopSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Type: {
        type: Number,
        required: true
    },
    SKU: {
        type: String,
        default: ""
    },
    Description: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: function () { return Date.now(); }
    },
    Price: {
        type: Number,
        required: true
    },
    PaymentType: {
        type: Number,
        required: true
    },
    Category: {
        type: Number,
        required: true
    },
    EnabledFor: {
        type: Number,
        default: true,
    },
    Balance: {
        type: Number,
        default: 0,
    },
    Rarity: {
        type: Number,
        default: shop_interface_1.Rarity.Common,
    },
    Item: {
        type: String,
        default: "",
    },
    Offer: {
        type: Number,
        required: true
    },
    Booster: {
        type: Number,
        required: true
    },
    ActiveForVip: {
        type: Boolean,
        default: false,
    },
    VipGift: {
        type: Boolean,
        default: false,
    },
    ExpireDate: {
        type: Number,
        default: null
    },
    IsUnique: {
        type: Boolean,
        default: true
    },
    IsUniqueType: {
        type: Boolean,
        required: true
    }
});
var ShopModel = (0, mongoose_1.model)(exports.shopCollectionName, ShopSchema);
exports.default = ShopModel;
