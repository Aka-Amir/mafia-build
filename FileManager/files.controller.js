"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.FilesController = void 0;
var files_model_1 = __importDefault(require("./files.model"));
var router_1 = require("../Core/decorators/router");
var auth_guard_1 = require("../middlewares/auth.guard");
var token_auth_1 = __importDefault(require("../utils/token.auth"));
var status_1 = __importDefault(require("../Core/status"));
var FilesController = (function () {
    function FilesController() {
    }
    FilesController.prototype.Create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, files_model_1.default.Create(req.body)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS &&
                            ModelResponse.Payload) {
                            if (req.files) {
                                try {
                                    req.files.payload.mv("".concat(__dirname, "/../public/").concat(ModelResponse.Payload && ModelResponse.Payload._id, ".assetbundle"));
                                }
                                catch (error) {
                                    console.trace(error);
                                }
                            }
                            auth = token_auth_1.default.Create(ModelResponse.Payload, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.send(ModelResponse.Payload);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(status_1.default.PROCCESS_FAILED).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    FilesController.prototype.Update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, response, auth, auth, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        ModelResponse = void 0;
                        if (!req.body.update) return [3, 2];
                        return [4, files_model_1.default.Update(req.body._id, JSON.parse(req.body.update))];
                    case 1:
                        ModelResponse = _a.sent();
                        return [3, 3];
                    case 2:
                        ModelResponse = {
                            Status: status_1.default.PROCCESS_SUCCESS,
                            Payload: true,
                        };
                        _a.label = 3;
                    case 3:
                        response = {
                            Message: "Success",
                            Status: status_1.default.PROCCESS_SUCCESS
                        };
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS) {
                            if (req.files) {
                                try {
                                    req.files.payload.mv("".concat(__dirname, "/../public/").concat(req.body._id, ".assetbundle"));
                                }
                                catch (error) {
                                    console.trace(error);
                                    response = {
                                        Message: "Failed to Update File",
                                        Status: status_1.default.PROCCESS_FAILED
                                    };
                                }
                            }
                            auth = token_auth_1.default.Create(response, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(response.Status).send(response);
                        }
                        else {
                            response = {
                                Message: "Failed to Update Database",
                                Status: status_1.default.PROCCESS_FAILED
                            };
                            auth = token_auth_1.default.Create(response, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.status(response.Status).send(response);
                        }
                        return [3, 5];
                    case 4:
                        error_2 = _a.sent();
                        res.status(status_1.default.PROCCESS_FAILED).send();
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    FilesController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, files_model_1.default.Get()];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload) {
                            auth = token_auth_1.default.Create(ModelResponse.Payload, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.send(ModelResponse.Payload);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(status_1.default.PROCCESS_FAILED).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    FilesController.prototype.GetByPlatform = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, files_model_1.default.GetByPlatform(req.body.Platform)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload) {
                            auth = token_auth_1.default.Create(ModelResponse.Payload, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.send(ModelResponse.Payload);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(status_1.default.PROCCESS_FAILED).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    FilesController.prototype.GetRequireAssetsByPlatform = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelResponse, auth, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, files_model_1.default.GetRequireAssetsByPlatform(req.body.Platform)];
                    case 1:
                        ModelResponse = _a.sent();
                        if (ModelResponse.Status === status_1.default.PROCCESS_SUCCESS && ModelResponse.Payload) {
                            auth = token_auth_1.default.Create(ModelResponse.Payload, req.headers.authId);
                            res.setHeader("auth", auth);
                            res.send(ModelResponse.Payload);
                        }
                        else {
                            res.status(400).send();
                        }
                        return [3, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(status_1.default.PROCCESS_FAILED).send();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    __decorate([
        (0, router_1.Post)("/create")
    ], FilesController.prototype, "Create", null);
    __decorate([
        (0, router_1.Post)("/update")
    ], FilesController.prototype, "Update", null);
    __decorate([
        (0, router_1.Post)("/get")
    ], FilesController.prototype, "get", null);
    __decorate([
        (0, router_1.Post)("/get/platform")
    ], FilesController.prototype, "GetByPlatform", null);
    __decorate([
        (0, router_1.Post)("/get/require")
    ], FilesController.prototype, "GetRequireAssetsByPlatform", null);
    FilesController = __decorate([
        (0, router_1.RouterModule)("/files", [auth_guard_1.DataAuthentication])
    ], FilesController);
    return FilesController;
}());
exports.FilesController = FilesController;
exports.default = FilesController;
