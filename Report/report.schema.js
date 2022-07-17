"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var users_schema_1 = require("../Users/users.schema");
var game_model_1 = require("../Scenarios/models/game.model");
exports.reportCollectionName = "colReport";
var Schema = new mongoose_1.default.Schema({
    UserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: users_schema_1.usersCollectionName,
        require: true,
    },
    GameId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: game_model_1.gameCollectionName,
        require: true,
    },
    ReporterId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: users_schema_1.usersCollectionName,
        require: true,
    },
    ReportType: {
        type: Number,
        require: true,
    },
    Message: {
        type: String,
        default: "",
    },
    Date: {
        type: Date,
        default: Date.now
    }
});
var model = mongoose_1.default.model(exports.reportCollectionName, Schema);
exports.default = model;
