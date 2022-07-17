"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketAbstract = (function () {
    function SocketAbstract() {
    }
    SocketAbstract.__ctor__ = function (_io) {
        this.io = _io;
    };
    SocketAbstract._emitToRoom = function (room, event, message) {
        console.log("\n            date: ".concat(Date.now(), "\n            room: ").concat(room, "\n            event: ").concat(event, "\n            message: ").concat(JSON.stringify(message), "\n        "));
        this.io.in(room).emit(event, message);
    };
    SocketAbstract._connect = function (_socket) {
    };
    SocketAbstract._disconnect = function (_socket) {
    };
    SocketAbstract._disconnecting = function (_socket) {
    };
    return SocketAbstract;
}());
exports.default = SocketAbstract;
