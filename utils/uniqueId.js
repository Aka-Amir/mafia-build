"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
function generateId() {
    return Math.floor(1000 + Math.random() * 9000);
}
exports.generateId = generateId;
exports.default = generateId;
