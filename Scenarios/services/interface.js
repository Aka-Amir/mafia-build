"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckValidation = void 0;
var CheckValidation = function (Interface, Input) {
    try {
        var result = true;
        for (var _i = 0, _a = Object.keys(Interface); _i < _a.length; _i++) {
            var key = _a[_i];
            var InterfaceKey = typeof Interface[key] === "function" ? Interface[key]() : Interface[key];
            if (!(key in Input) ||
                typeof Input[key] !== typeof InterfaceKey ||
                Input[key] === null) {
                result = false;
            }
        }
        return result;
    }
    catch (e) {
        return false;
    }
};
exports.CheckValidation = CheckValidation;
exports.default = exports.CheckValidation;
