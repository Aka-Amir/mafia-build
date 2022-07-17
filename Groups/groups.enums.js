"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenario = exports.Mode = exports.membersLimit = void 0;
var membersLimit;
(function (membersLimit) {
    membersLimit[membersLimit["Classic"] = 10] = "Classic";
    membersLimit[membersLimit["Filimo"] = 12] = "Filimo";
})(membersLimit = exports.membersLimit || (exports.membersLimit = {}));
var Mode;
(function (Mode) {
    Mode[Mode["Chat"] = 0] = "Chat";
    Mode[Mode["Voice"] = 1] = "Voice";
})(Mode = exports.Mode || (exports.Mode = {}));
var scenario;
(function (scenario) {
    scenario[scenario["Classic"] = 0] = "Classic";
    scenario[scenario["Filimo"] = 1] = "Filimo";
})(scenario = exports.scenario || (exports.scenario = {}));
