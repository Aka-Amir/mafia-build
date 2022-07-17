"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMS = void 0;
var TrezSMSClient = require("trez-sms-client");
var SMS = (function () {
    function SMS() {
    }
    var _a;
    _a = SMS;
    SMS.username = "redtree";
    SMS.password = "1542201422";
    SMS.client = new TrezSMSClient(_a.username, _a.password);
    SMS.groupId = _a.client.getRandomGroupId();
    SMS.sender = "500022122122";
    SMS.sendMessage = function (receiver, message) {
        return _a.client.sendMessage(_a.sender, [receiver], message, _a.groupId);
    };
    SMS.OTP = function (Mobile, Message) {
        return _a.client.manualSendCode(Mobile, Message);
    };
    return SMS;
}());
exports.SMS = SMS;
exports.default = SMS;
