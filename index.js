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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
var html_template_generator_1 = __importStar(require("./utils/html-template.generator"));
var connection_service_1 = __importDefault(require("./Core/mongo/connection.service"));
var module_service_1 = __importDefault(require("./Core/modules/module.service"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var authentication_controller_1 = require("./Authentication/authentication.controller");
var inventory_controller_1 = require("./Inventory/inventory.controller");
var files_controller_1 = require("./FileManager/files.controller");
var user_controller_1 = require("./Users/user.controller");
var admin_controller_1 = require("./Admin/admin.controller");
var shop_controller_1 = require("./Shop/shop.controller");
var settings_controller_1 = require("./Settings/settings.controller");
var report_controller_1 = require("./Report/report.controller");
var user_ws_1 = __importDefault(require("./Users/user.ws"));
var groups_ws_1 = require("./Groups/groups.ws");
var filimo_data_layer_1 = __importDefault(require("./Scenarios/data/filimo.data.layer"));
var classic_data_layer_1 = __importDefault(require("./Scenarios/data/classic.data.layer"));
dotenv_1.default.config();
var print = console.log;
var trace = console.trace;
console.log = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    print.apply(void 0, text);
};
console.trace = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    trace.apply(void 0, text);
};
exports.generator = new html_template_generator_1.default(html_template_generator_1.ETemplateModel.emailVerification, "".concat(__dirname, "/assets"));
var _app = (0, module_service_1.default)({
    Modules: [
        authentication_controller_1.AuthenticationController,
        user_controller_1.UsersController,
        shop_controller_1.ShopController,
        inventory_controller_1.InventoryController,
        files_controller_1.FilesController,
        report_controller_1.ReportController,
        admin_controller_1.AdminController,
        settings_controller_1.GameSettingController
    ],
    Middlewares: [
        (0, cors_1.default)(),
        express_1.default.json(),
        express_1.default.static("".concat(__dirname, "/public")),
        (0, express_fileupload_1.default)({
            createParentPath: true,
        }),
    ],
    DatabaseConnection: connection_service_1.default,
    stopOnError: false,
    SocketModules: [user_ws_1.default, groups_ws_1.GroupsWs, classic_data_layer_1.default, filimo_data_layer_1.default],
    UseRedis: true,
}).catch(console.trace);
exports.default = _app;
