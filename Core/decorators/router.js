"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Post = exports.Put = exports.Get = exports.RouterModule = void 0;
var colors_1 = __importDefault(require("../developmentUtils/colors"));
var App_module_1 = __importStar(require("../modules/App.module"));
var getDateSchema = function () {
    var date = new Date();
    return "".concat(date.getFullYear(), "/").concat(date.getDay(), "/").concat(date.getMonth(), "@").concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), ":").concat(date.getMilliseconds());
};
var app = (0, App_module_1.default)();
var event = (0, App_module_1.getEvent)();
function RouterModule(base, middleWares) {
    return function (Ctor) {
        event.on("start", function () {
            console.log("Activating MiddleWares");
            if (!!middleWares && middleWares.length > 0) {
                var _loop_1 = function (mw) {
                    app.use(function (req, res, next) {
                        if (req.path.startsWith(base)) {
                            console.log(req.body);
                            mw(req, res, next);
                        }
                        else
                            next();
                    });
                };
                for (var _i = 0, middleWares_1 = middleWares; _i < middleWares_1.length; _i++) {
                    var mw = middleWares_1[_i];
                    _loop_1(mw);
                }
            }
            console.log("\n Starting Http Methods Of ".concat(Ctor.name, " - ").concat(base, ": "));
            if (!!Ctor.prototype._get) {
                for (var _a = 0, _b = Ctor.prototype._get; _a < _b.length; _a++) {
                    var __router__ = _b[_a];
                    app.get(base + __router__.Route, __router__.CallBack);
                    console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Listening").concat(colors_1.default.Reset, "] ") +
                        "".concat(colors_1.default.FgCyan, "GET : '").concat(base + __router__.Route, "' => ").concat(Ctor.name, ".").concat(__router__.Name, " ").concat(colors_1.default.Reset));
                }
            }
            if (!!Ctor.prototype._post) {
                for (var _c = 0, _d = Ctor.prototype._post; _c < _d.length; _c++) {
                    var __router__ = _d[_c];
                    app.post(base + __router__.Route, __router__.CallBack);
                    console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Listening").concat(colors_1.default.Reset, "] ") +
                        "".concat(colors_1.default.FgYellow, "POST : '").concat(base + __router__.Route, "' => ").concat(Ctor.name, ".").concat(__router__.Name, " ").concat(colors_1.default.Reset));
                }
            }
            if (!!Ctor.prototype._put) {
                for (var _e = 0, _f = Ctor.prototype._put; _e < _f.length; _e++) {
                    var __router__ = _f[_e];
                    app.put(base + __router__.Route, __router__.CallBack);
                    console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Listening").concat(colors_1.default.Reset, "] ") +
                        "".concat(colors_1.default.FgMagenta, "PUT : '").concat(base + __router__.Route, "' => ").concat(Ctor.name, ".").concat(__router__.Name, " ").concat(colors_1.default.Reset));
                }
            }
            if (!!Ctor.prototype._delete) {
                for (var _g = 0, _h = Ctor.prototype._delete; _g < _h.length; _g++) {
                    var __router__ = _h[_g];
                    app.delete(base + __router__.Route, __router__.CallBack);
                    console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Listening").concat(colors_1.default.Reset, "] ") +
                        "".concat(colors_1.default.FgRed, "DELETE : '").concat(base + __router__.Route, "' => ").concat(Ctor.name, ".").concat(__router__.Name, " ").concat(colors_1.default.Reset));
                }
            }
            event.emit("listening", "");
        });
    };
}
exports.RouterModule = RouterModule;
function Get(route, middleWares) {
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        if (!target["_get"]) {
            Object.defineProperty(target, "_get", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: [],
            });
        }
        target["_get"].push({
            Route: route,
            CallBack: !!middleWares ? __spreadArray(__spreadArray([], middleWares, true), [original], false) : original,
            Name: propertyKey,
        });
        console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Registered").concat(colors_1.default.Reset, "] ").concat(colors_1.default.FgCyan, "GET : '").concat(route, "' => ").concat(propertyKey, " ").concat(colors_1.default.Reset));
        return descriptor;
    };
}
exports.Get = Get;
function Put(route, middleWares) {
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        if (!target["_put"]) {
            Object.defineProperty(target, "_put", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: [],
            });
        }
        target["_put"].push({
            Route: route,
            CallBack: !!middleWares ? __spreadArray(__spreadArray([], middleWares, true), [original], false) : original,
            Name: propertyKey,
        });
        console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Registered").concat(colors_1.default.Reset, "] ").concat(colors_1.default.FgMagenta, "PUT : '").concat(target["routerBase"] + route, "' => ").concat(propertyKey, " ").concat(colors_1.default.Reset));
        return descriptor;
    };
}
exports.Put = Put;
function Post(route, middleWares) {
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        if (!target["_post"]) {
            Object.defineProperty(target, "_post", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: [],
            });
        }
        target["_post"].push({
            Route: route,
            CallBack: !!middleWares ? __spreadArray(__spreadArray([], middleWares, true), [original], false) : original,
            Name: propertyKey,
        });
        console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Registered").concat(colors_1.default.Reset, "] ").concat(colors_1.default.FgYellow, "POST : '").concat(route, "' => ").concat(propertyKey, " ").concat(colors_1.default.Reset));
        return descriptor;
    };
}
exports.Post = Post;
function Delete(route, middleWares) {
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        if (!target["_delete"]) {
            Object.defineProperty(target, "_delete", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: [],
            });
        }
        target["_delete"].push({
            Route: route,
            CallBack: !!middleWares ? __spreadArray(__spreadArray([], middleWares, true), [original], false) : original,
            Name: propertyKey,
        });
        console.log("[".concat(getDateSchema(), " - ").concat(colors_1.default.FgGreen, "Registered").concat(colors_1.default.Reset, "] ").concat(colors_1.default.FgRed, "DELETE : '").concat(route, "' => ").concat(propertyKey, " ").concat(colors_1.default.Reset));
        return descriptor;
    };
}
exports.Delete = Delete;
