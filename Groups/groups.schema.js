"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var groups_enums_1 = require("./groups.enums");
var users_schema_1 = require("../Users/users.schema");
exports.groupsCollectionName = "colgroups";
var groupsCollectionSchema = new mongoose_1.default.Schema({
    Creator: { type: String, required: true },
    Environment: { type: String, default: "Default" },
    IsActive: { type: Boolean, default: true },
    Members: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: users_schema_1.usersCollectionName,
            required: true
        }],
    Mode: { type: Number, default: groups_enums_1.Mode.Voice },
    Scenario: { type: Number, default: groups_enums_1.scenario.Filimo },
    Date: {
        type: Date,
        default: Date.now
    },
    IsInMatchMaking: { type: Boolean, default: false },
    CanStart: { type: Boolean, default: true },
});
var modelGroups = mongoose_1.default.model(exports.groupsCollectionName, groupsCollectionSchema);
exports.default = modelGroups;
