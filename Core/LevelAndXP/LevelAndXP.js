"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classic = exports.Filimo = void 0;
function Filimo(winState, score) {
    return score + (winState ? 10 : 0);
}
exports.Filimo = Filimo;
function Classic(winState, score) {
    return score + (winState ? 10 : 0);
}
exports.Classic = Classic;
