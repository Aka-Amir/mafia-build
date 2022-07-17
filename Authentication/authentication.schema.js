"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = exports.authCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = new mongoose_1.default.Schema({
    Username: {
        type: String,
        unique: true,
    },
    Password: String,
    PhoneNumber: {
        type: String,
        unique: true,
    },
    Token: String,
    IsValidate: {
        type: Boolean,
        default: false,
    },
    InviteCode: {
        type: String,
        default: "",
    },
    ConfirmationCode: String,
});
exports.authCollectionName = "colAuth";
exports.model = mongoose_1.default.model(exports.authCollectionName, Schema);
exports.default = exports.model;
