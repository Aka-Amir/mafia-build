"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
var redis_manager_1 = __importDefault(require("../../utils/redis-manager"));
exports.Redis = new redis_manager_1.default();
exports.default = exports.Redis;
