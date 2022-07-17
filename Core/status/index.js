"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status[Status["NOT_FOUND"] = 404] = "NOT_FOUND";
    Status[Status["FAILED_TO_CREATE"] = 0] = "FAILED_TO_CREATE";
    Status[Status["CONFILICT"] = 409] = "CONFILICT";
    Status[Status["USER_BAN"] = 451] = "USER_BAN";
    Status[Status["PROCCESS_SUCCESS"] = 200] = "PROCCESS_SUCCESS";
    Status[Status["PROCCESS_FAILED"] = 500] = "PROCCESS_FAILED";
    Status[Status["TOKE_EXP"] = 620] = "TOKE_EXP";
    Status[Status["NOT_ENOUGH_COIN"] = 403] = "NOT_ENOUGH_COIN";
    Status[Status["FORBIDDEN"] = 403] = "FORBIDDEN";
    Status[Status["INVALID_PARAMETER"] = 400] = "INVALID_PARAMETER";
})(Status || (Status = {}));
exports.default = Status;
