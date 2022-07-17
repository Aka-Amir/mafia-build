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
var App_module_1 = __importStar(require("./App.module"));
var colors_1 = __importDefault(require("../developmentUtils/colors"));
var connection_service_1 = __importDefault(require("../redis/connection.service"));
var http_1 = __importDefault(require("http"));
var expressApp = (0, App_module_1.default)();
var event = (0, App_module_1.getEvent)();
var SocketDataParser = function (data) {
    try {
        return JSON.parse(data);
    }
    catch (_e) {
        return {};
    }
};
var App = function (modules) { return __awaiter(void 0, void 0, void 0, function () {
    var Start, _i, _a, middleware, server, _b, _c, m;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log("Initializing...");
                Start = function () {
                    return new Promise(function (resolve) {
                        var ready = 0;
                        event.on("listening", function () {
                            ready++;
                            if (ready !== modules.Modules.length)
                                return;
                            console.log("Starting app ... ");
                            if (!!modules.SocketModules) {
                                var server_1 = http_1.default.createServer(expressApp);
                                var io_1 = require("socket.io")(server_1, {
                                    cors: {
                                        origin: "*",
                                        methods: ["GET", "POST"],
                                        credentials: true,
                                    },
                                    pingInterval: 700,
                                    pingTimeout: 10000
                                });
                                io_1.on("connection", function (_socket) {
                                    if (modules.SocketModules) {
                                        var _loop_1 = function (socketModule) {
                                            var base = socketModule.name;
                                            socketModule.__ctor__(io_1);
                                            _socket.on("disconnect", function () {
                                                socketModule._disconnect(_socket);
                                            });
                                            _socket.on("disconnecting", function () {
                                                socketModule._disconnecting(_socket);
                                            });
                                            if (!socketModule.io)
                                                throw new Error("Bad socket module @ " + base);
                                            var _loop_2 = function (name_1, fn) {
                                                if (typeof fn !== "function")
                                                    return "continue";
                                                if (name_1[0] === "_")
                                                    return "continue";
                                                var trigger = "".concat(base, "@").concat(name_1);
                                                _socket.on(trigger, function (data) { return fn(SocketDataParser(data), _socket); });
                                            };
                                            for (var _b = 0, _c = Object.entries(socketModule); _b < _c.length; _b++) {
                                                var _d = _c[_b], name_1 = _d[0], fn = _d[1];
                                                _loop_2(name_1, fn);
                                            }
                                            socketModule._connect(_socket);
                                        };
                                        for (var _i = 0, _a = modules.SocketModules; _i < _a.length; _i++) {
                                            var socketModule = _a[_i];
                                            _loop_1(socketModule);
                                        }
                                        _socket.emit("init", { Message: true });
                                    }
                                });
                                server_1.listen(process.env.SOCKET_PORT || 4700);
                                console.log("\n ".concat(colors_1.default.FgGreen, " > [").concat("listening".toLocaleUpperCase(), "::SOCKET] ").concat(colors_1.default.Reset).concat(colors_1.default.FgCyan, " ws://localhost:4700 ").concat(colors_1.default.Reset));
                                console.log("\n ".concat(colors_1.default.FgGreen, " > [").concat("listening".toLocaleUpperCase(), "::SOCKET] ").concat(colors_1.default.Reset).concat(colors_1.default.FgCyan, " ws://localhost:4700 ").concat(colors_1.default.Reset));
                            }
                            var server = http_1.default
                                .createServer(expressApp)
                                .listen(process.env.PORT || 4500);
                            console.log("\n ".concat(colors_1.default.FgGreen, " > [").concat("listening".toLocaleUpperCase(), "::HTTP] ").concat(colors_1.default.Reset).concat(colors_1.default.FgCyan, " http://localhost:4500 ").concat(colors_1.default.Reset, " \n"));
                            resolve(server);
                        });
                        event.emit("start", "");
                    });
                };
                expressApp.use(function (req, res, next) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Credentials", "true");
                    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
                    res.header("Access-Control-Expose-Headers", "Content-Length");
                    res.header("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, X-Requested-With, Range");
                    next();
                });
                if (!!modules.Middlewares) {
                    console.log("Setting up ".concat(modules.Middlewares.length, " middlewares..."));
                    for (_i = 0, _a = modules.Middlewares; _i < _a.length; _i++) {
                        middleware = _a[_i];
                        console.log(middleware);
                        expressApp.use(middleware);
                    }
                }
                if (!modules.UseRedis) return [3, 1];
                connection_service_1.default.setAuthentication(modules.RedisConfig || null);
                connection_service_1.default.connect()
                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!!modules.DatabaseConnection) return [3, 1];
                                console.log("Setting up database connection");
                                server = modules
                                    .DatabaseConnection()
                                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, Start()];
                                            case 1: return [2, _a.sent()];
                                        }
                                    });
                                }); })
                                    .catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!!modules.stopOnError) return [3, 2];
                                                return [4, Start()];
                                            case 1: return [2, _a.sent()];
                                            case 2:
                                                console.trace(err);
                                                return [2, null];
                                        }
                                    });
                                }); });
                                return [3, 3];
                            case 1: return [4, Start()];
                            case 2:
                                server = _a.sent();
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
                return [3, 4];
            case 1:
                if (!!!modules.DatabaseConnection) return [3, 2];
                console.log("Setting up database connection");
                server = modules
                    .DatabaseConnection()
                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, Start()];
                            case 1: return [2, _a.sent()];
                        }
                    });
                }); })
                    .catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!modules.stopOnError) return [3, 2];
                                return [4, Start()];
                            case 1: return [2, _a.sent()];
                            case 2:
                                console.trace(err);
                                return [2, null];
                        }
                    });
                }); });
                return [3, 4];
            case 2: return [4, Start()];
            case 3:
                server = _d.sent();
                _d.label = 4;
            case 4:
                console.log("Wrapping up modules");
                for (_b = 0, _c = modules.Modules; _b < _c.length; _b++) {
                    m = _c[_b];
                    new m(expressApp);
                }
                return [2, server];
        }
    });
}); };
exports.default = App;
