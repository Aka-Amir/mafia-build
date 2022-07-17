"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = (function () {
    function Events(className) {
        this.Create = "";
        this.Join = "";
        this.Info = "";
        this.Invite = "";
        this.Leave = "";
        this.StartGroup = "";
        this.MatchMaking = "";
        var Keys = Object.keys(this);
        for (var _i = 0, Keys_1 = Keys; _i < Keys_1.length; _i++) {
            var key = Keys_1[_i];
            Object.defineProperty(this, key, {
                value: "".concat(className, "@").concat(key)
            });
        }
    }
    return Events;
}());
exports.default = new Events("GroupsWs");
