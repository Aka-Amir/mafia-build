"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = void 0;
var express_1 = __importDefault(require("express"));
var events_1 = __importDefault(require("events"));
var App = (function () {
    function App() {
    }
    App.http = null;
    App.events = null;
    return App;
}());
function getApp() {
    if (App.http === null)
        App.http = (0, express_1.default)();
    return App.http;
}
exports.default = getApp;
function getEvent() {
    if (App.events === null)
        App.events = new events_1.default();
    return App.events;
}
exports.getEvent = getEvent;
