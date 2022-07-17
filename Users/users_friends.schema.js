"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFirendsCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var users_schema_1 = require("./users.schema");
exports.userFirendsCollectionName = "colFriends";
var Shcema = new mongoose_1.default.Schema({
    From: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: users_schema_1.usersCollectionName,
    },
    To: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: users_schema_1.usersCollectionName,
    },
});
var model = mongoose_1.default.model(exports.userFirendsCollectionName, Shcema);
exports.default = model;
