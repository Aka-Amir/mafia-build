"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connection_service_1 = require("../../Core/redis/connection.service");
var GameRedis = (function () {
    function GameRedis() {
    }
    GameRedis.GenerateKey = function (scenario) {
        return "".concat(scenario, "/Price");
    };
    GameRedis.SetPrice = function (scenario, value) {
        return connection_service_1.Redis.Set(this.GenerateKey(scenario), value);
    };
    GameRedis.GetPrice = function (scenario) {
        return connection_service_1.Redis.Get(this.GenerateKey(scenario));
    };
    return GameRedis;
}());
exports.default = GameRedis;
