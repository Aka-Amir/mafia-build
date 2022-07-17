"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMsToHM = exports.groupBy = void 0;
function groupBy(array, callback) {
    return array.reduce(function (r, v, i, a, k) {
        if (k === void 0) { k = callback(v); }
        return ((r[(k === null || k === void 0 ? void 0 : k.toString()) || ""] || (r[(k === null || k === void 0 ? void 0 : k.toString()) || ""] = [])).push(v), r);
    }, {});
}
exports.groupBy = groupBy;
function convertMsToHM(milliseconds) {
    if (milliseconds < 0)
        return "0:0";
    var seconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return "".concat(hours, "-").concat(minutes);
}
exports.convertMsToHM = convertMsToHM;
