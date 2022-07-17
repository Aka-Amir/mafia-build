"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var shop_schema_1 = require("../Shop/shop.schema");
exports.filesCollectionName = "colfiles";
var FilesSchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
        required: true
    },
    Platforms: {
        type: Number,
        required: true
    },
    Version: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Require: {
        type: Boolean,
        default: false
    },
    ShopProduct: {
        type: mongoose_1.default.Types.ObjectId,
        ref: shop_schema_1.shopCollectionName,
        required: true
    }
});
var FilesModel = mongoose_1.default.model(exports.filesCollectionName, FilesSchema);
exports.default = FilesModel;
