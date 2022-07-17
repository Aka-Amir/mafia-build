"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchMakingRequest = void 0;
var FindAll = function (sorted, tempGp, PartyLimit) {
    while (true) {
        var selected = [];
        var len = tempGp.Members.length;
        for (var _i = 0, sorted_1 = sorted; _i < sorted_1.length; _i++) {
            var item = sorted_1[_i];
            len += item.Members.length;
            if (len > PartyLimit) {
                len -= item.Members.length;
                continue;
            }
            selected.push(item);
            if (len === PartyLimit) {
                break;
            }
        }
        if (len !== PartyLimit) {
            sorted.shift();
            if (sorted.length === 0)
                break;
            continue;
        }
        return selected;
    }
    return null;
};
var MatchMakingRequest = function (Database, Input, PartyLimit, MatchedGroupsId, State, Gender, Mode, Scenario) {
    if (MatchedGroupsId === void 0) { MatchedGroupsId = [Input._id]; }
    if (State === void 0) { State = Input.State; }
    if (Gender === void 0) { Gender = Input.Gender; }
    if (Mode === void 0) { Mode = Input.Mode; }
    if (Scenario === void 0) { Scenario = Input.Scenario; }
    return __awaiter(void 0, void 0, void 0, function () {
        var tempGp, emptySpace, firstMatchingItem, newDb, sorted, selected, all, ids;
        return __generator(this, function (_a) {
            if (Database.length == 1)
                return [2, null];
            tempGp = Input;
            emptySpace = PartyLimit - tempGp.Members.length;
            firstMatchingItem = Database.find(function (row) { return row.Members.length == emptySpace && row._id !== tempGp._id; });
            if (!!firstMatchingItem) {
                MatchedGroupsId.push(firstMatchingItem._id);
                tempGp.Members = __spreadArray(__spreadArray([], tempGp.Members, true), firstMatchingItem.Members, true);
                return [2, { MatchedGroupsId: MatchedGroupsId, TempGroup: tempGp }];
            }
            newDb = Database.filter(function (item) {
                return item.Mode == Mode && item.Scenario == Scenario && item._id !== Input._id;
            });
            sorted = Input.Members.length <= (PartyLimit / 2) ?
                newDb.sort(function (a, b) {
                    return b.Members.length - a.Members.length;
                }) :
                newDb.sort(function (a, b) { return a.Members.length - b.Members.length; });
            selected = FindAll(sorted, tempGp, PartyLimit);
            if (selected != null) {
                all = selected.map(function (item) { return item.Members; })
                    .flat();
                tempGp.Members = __spreadArray(__spreadArray([], Input.Members, true), all, true);
                ids = selected.map(function (_a) {
                    var _id = _a._id;
                    return _id;
                });
                return [2, { MatchedGroupsId: __spreadArray(__spreadArray([], MatchedGroupsId, true), ids, true), TempGroup: tempGp }];
            }
            return [2, null];
        });
    });
};
exports.MatchMakingRequest = MatchMakingRequest;
exports.default = exports.MatchMakingRequest;
