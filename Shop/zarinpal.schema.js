"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zarinpalCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.zarinpalCollectionName = "colZarinpalFactors";
var Schema = new mongoose_1.default.Schema({
    UserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "colUsers",
    },
    ProductId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "colShop",
    },
    Amount: {
        type: Number,
        required: true,
    },
    Authority: {
        type: String,
        required: true,
    },
    StatusCode: {
        type: Number,
        default: 0,
    }
});
var model = mongoose_1.default.model(exports.zarinpalCollectionName, Schema);
exports.default = model;
