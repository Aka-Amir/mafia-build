"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.adminsCollectionName = "colAdmins";
var Schema = new mongoose_1.default.Schema({
    Username: {
        type: String,
        unique: true,
        require: true,
    },
    Password: {
        type: String,
        require: true,
    },
    Access: {
        type: Object,
        require: true,
    },
});
var model = mongoose_1.default.model(exports.adminsCollectionName, Schema);
exports.default = model;
