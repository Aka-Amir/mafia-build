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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppBilling = void 0;
var form_data_1 = __importDefault(require("form-data"));
var axios_1 = __importDefault(require("axios"));
var InAppBilling = (function () {
    function InAppBilling() {
    }
    InAppBilling.InitBazaar = function (ClientId, ClientSecret, PackageName, RedirectURL) {
        return __awaiter(this, void 0, void 0, function () {
            var Tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ClientId = ClientId;
                        this.ClientSecret = ClientSecret;
                        this.PackageName = PackageName;
                        this.RedirectURL = RedirectURL;
                        return [4, this.GetAccessToken()];
                    case 1:
                        Tokens = _a.sent();
                        if (Tokens.refresh_token) {
                            this.RefreshToken = Tokens.refresh_token;
                        }
                        else {
                            throw new Error(Tokens.error_description);
                        }
                        return [2];
                }
            });
        });
    };
    InAppBilling.InitMyket = function (XAccessToken) {
        this.XAccessToken = XAccessToken;
    };
    InAppBilling.SetBazaarCode = function (Code) {
        this.Code = Code;
    };
    InAppBilling.GetAccessToken = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var data, Result, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        data = new form_data_1.default();
                        data.append("grant_type", "authorization_code");
                        data.append("client_id", this.ClientId);
                        data.append("code", this.Code);
                        data.append("client_secret", this.ClientSecret);
                        data.append("redirect_uri", this.RedirectURL);
                        return [4, (0, axios_1.default)({
                                method: "POST",
                                url: "https://pardakht.cafebazaar.ir/devapi/v2/auth/token/",
                                data: data,
                                headers: __assign({}, data.getHeaders()),
                            })];
                    case 1:
                        Result = _e.sent();
                        return [2, {
                                access_token: Result.data.access_token,
                                token_type: Result.data.token_type,
                                expires_in: Result.data.expires_in,
                                scope: Result.data.scope,
                                refresh_token: Result.data.refresh_token,
                                error: "",
                                error_description: "",
                            }];
                    case 2:
                        error_1 = _e.sent();
                        return [2, {
                                access_token: "",
                                token_type: "",
                                expires_in: 0,
                                scope: "",
                                refresh_token: "",
                                error: (_b = (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error,
                                error_description: (_d = (_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error_description,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    InAppBilling.GetAccessTokenWithRefreshToken = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var data, Result, error_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        data = new form_data_1.default();
                        data.append("grant_type", "refresh_token");
                        data.append("client_id", this.ClientId);
                        data.append("refresh_token", this.RefreshToken);
                        data.append("client_secret", this.ClientSecret);
                        return [4, (0, axios_1.default)({
                                method: "POST",
                                url: "https://pardakht.cafebazaar.ir/devapi/v2/auth/token/",
                                data: data,
                                headers: __assign({}, data.getHeaders()),
                            })];
                    case 1:
                        Result = _e.sent();
                        return [2, {
                                access_token: Result.data.access_token,
                                token_type: Result.data.token_type,
                                expires_in: Result.data.expires_in,
                                scope: Result.data.scope,
                            }];
                    case 2:
                        error_2 = _e.sent();
                        return [2, {
                                error: (_b = (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error,
                                error_description: (_d = (_c = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error_description,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    InAppBilling.GetCode = function () {
        return "https://pardakht.cafebazaar.ir/devapi/v2/auth/authorize/?response_type=code&access_type=offline&redirect_uri=".concat(this.RedirectURL, "&client_id=").concat(this.ClientId);
    };
    InAppBilling.CheckInAppPurchaseBazaar = function (SKU, purchaseToken) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var access_token, Result, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 3, , 4]);
                        return [4, this.GetAccessTokenWithRefreshToken()];
                    case 1:
                        access_token = (_e.sent())
                            .access_token;
                        return [4, (0, axios_1.default)({
                                method: "GET",
                                url: "https://pardakht.cafebazaar.ir/devapi/v2/api/validate/".concat(this.PackageName, "/inapp/").concat(SKU, "/purchases/").concat(purchaseToken, "?access_token=").concat(access_token),
                            })];
                    case 2:
                        Result = _e.sent();
                        return [2, {
                                status: true,
                                isUsed: Result.data.consumptionState === 0,
                                refund: Result.data.purchaseState === 1,
                                time: Result.data.purchaseTime,
                                developerPayload: Result.data.developerPayload,
                                error: "",
                                error_description: "",
                            }];
                    case 3:
                        e_1 = _e.sent();
                        return [2, {
                                status: false,
                                error: (_b = (_a = e_1 === null || e_1 === void 0 ? void 0 : e_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error,
                                error_description: (_d = (_c = e_1 === null || e_1 === void 0 ? void 0 : e_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error_description,
                                isUsed: false,
                                refund: false,
                                time: 0,
                                developerPayload: "",
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    InAppBilling.CheckInAppPurchaseMyket = function (SKU, PurchaseToken) {
        return __awaiter(this, void 0, void 0, function () {
            var Result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, (0, axios_1.default)({
                                method: "get",
                                headers: {
                                    "X-Access-Token": this.XAccessToken,
                                },
                                url: "https://developer.myket.ir/api/applications/".concat(this.PackageName, "/purchases/products/").concat(SKU, "/tokens/").concat(PurchaseToken),
                            })];
                    case 1:
                        Result = _a.sent();
                        return [2, {
                                status: true,
                                kind: Result.data.kind,
                                purchaseTime: Result.data.purchaseTime,
                                developerPayload: Result.data.developerPayload,
                                purchaseState: Result.data.purchaseState === 0,
                                IsUsed: Result.data.consumptionState === 1,
                                refund: false,
                            }];
                    case 2:
                        e_2 = _a.sent();
                        return [2, {
                                status: false,
                                kind: "",
                                purchaseTime: 0,
                                developerPayload: "",
                                purchaseState: false,
                                IsUsed: true,
                                refund: true,
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    InAppBilling.ClientId = "tzP0rJnZRKqvVrU96jCGoC1eS4Q8Euu9GMcOeqyg";
    InAppBilling.ClientSecret = "xyQWcpz58WWPtmoRuNslYQ71iuuiJoDlx7LiG2p6zwGGQm8ino1Yirzah1vi";
    InAppBilling.RedirectURL = "http://game.mafia-nights.ir:4500/game_setting/baazar";
    InAppBilling.Code = "vyL1xfEPEMtdNmsnNaEpMt13SmsftZ";
    InAppBilling.RefreshToken = "GV4ytnqCocjSEGZlBjEMZtCOFDHJZB";
    InAppBilling.PackageName = "com.RedTree.MafiaNights";
    InAppBilling.XAccessToken = "c93507dc-2a99-4f00-ad8c-05377b18e8cd";
    return InAppBilling;
}());
exports.InAppBilling = InAppBilling;
exports.default = InAppBilling;
