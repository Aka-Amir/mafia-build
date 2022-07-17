"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var ZarinPal = (function () {
    function ZarinPal() {
    }
    ZarinPal.PaymentRequest = function (amount, description) {
        var _this = this;
        return new Promise(function (resolve) {
            var options = {
                method: 'POST',
                url: "".concat(_this.Url, "/request.json"),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    merchant_id: _this.Merchant,
                    amount: amount,
                    callback_url: _this.callbackURL,
                    description: description,
                })
            };
            (0, request_1.default)(options, function (error, response) {
                var _a;
                var body = JSON.parse(response.body);
                if (((_a = body === null || body === void 0 ? void 0 : body.errors) === null || _a === void 0 ? void 0 : _a.code) == undefined) {
                    resolve(__assign({ url: "".concat(ZarinPal.PaymentUrl, "/").concat(body.data.authority), status: true }, body.data));
                }
                else {
                    resolve({
                        status: false,
                        errors: {
                            code: body.errors.code,
                            message: body.errors.message,
                        }
                    });
                }
            });
        });
    };
    ZarinPal.PaymentVerify = function (amount, authority) {
        var _this = this;
        return new Promise(function (resolve) {
            var options = {
                method: 'POST',
                url: "".concat(_this.Url, "/verify.json"),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    merchant_id: _this.Merchant,
                    amount: amount,
                    authority: authority
                })
            };
            (0, request_1.default)(options, function (error, response) {
                var _a;
                var body = JSON.parse(response.body);
                if (((_a = body === null || body === void 0 ? void 0 : body.errors) === null || _a === void 0 ? void 0 : _a.code) == undefined) {
                    resolve(__assign({ url: "".concat(ZarinPal.PaymentUrl, "/").concat(body.data.authority), status: true }, body.data));
                }
                else {
                    resolve({
                        status: false,
                        errors: {
                            code: body.errors.code,
                            message: body.errors.message,
                        }
                    });
                }
            });
        });
    };
    ZarinPal.Merchant = "10bacf6e-1b17-41ec-abf2-4c039de24c8e";
    ZarinPal.Url = "https://api.zarinpal.com/pg/v4/payment";
    ZarinPal.PaymentUrl = "https://www.zarinpal.com/pg/StartPay";
    ZarinPal.callbackURL = "http://localhost:4500/zarinpal/verify";
    ZarinPal.resultURL = "http://localhost:4500/shop/zarinpal/result";
    return ZarinPal;
}());
exports.default = ZarinPal;
