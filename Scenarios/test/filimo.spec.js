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
var _this = this;
var Filimo = require('../core/filimo.scenario');
var RedisDB = require("redioose");
var PartyId = "61a219076584882618a6ab8c";
var GameId = "619b56bead2ff443d081b9f7";
var Client = new RedisDB();
var Users = [
    "619c8a01d1f0b837a81206d3",
    "619c8a03d1f0b837a81206d6",
    "619c8a04d1f0b837a81206d9",
    "619c8a0dd1f0b837a81206dc",
    "619c8a0fd1f0b837a81206df",
    "619c8a17d1f0b837a81206e2",
    "619c8a19d1f0b837a81206e5",
    "619c8a1ad1f0b837a81206e8",
    "619c8a1bd1f0b837a81206eb",
    "619c8a1cd1f0b837a81206ee",
    "619c8a1ed1f0b837a81206f1",
    "619c8a1fd1f0b837a81206f4",
];
beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, require("../../common/services/mongoose.service")];
            case 1: return [2, _a.sent()];
        }
    });
}); });
describe('Basic process', function () {
    test("Init Party", function () {
        return Filimo.InitParty(PartyId, Users)
            .then(function (res) { return [
            expect(res).toBeTruthy()
        ]; });
    });
    test("Execute", function () {
        return Filimo.Execute(PartyId)
            .then(function (res) { return [
            expect(res).toBeTruthy()
        ]; });
    });
    test("EndSecondVoteProcess", function () {
        return Filimo.EndSecondVoteProcess({ GameId: GameId })
            .then(function (res) { return [
            expect(res).toBeTruthy()
        ]; });
    });
    test("Add Index", function () {
        return Filimo.SetIndexToUsers(PartyId)
            .then(function (res) { return [
            expect(res).toBeTruthy()
        ]; });
    });
    test("Add Role", function () {
        return Filimo.SetRoleToUsers(PartyId)
            .then(function (res) { return [
            expect(res).toBeTruthy()
        ]; });
    });
    test("Increase Day Count", function () { return __awaiter(_this, void 0, void 0, function () {
        var BeforePartyInfo;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Client.FindOne({ _id: PartyId })];
                case 1:
                    BeforePartyInfo = _a.sent();
                    return [2, Filimo.IncreaseDayCount(PartyId)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var AfterPartyInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Client.FindOne({ _id: PartyId })];
                                    case 1:
                                        AfterPartyInfo = _a.sent();
                                        expect(AfterPartyInfo.DayCount - BeforePartyInfo.DayCount).toBe(1);
                                        return [2];
                                }
                            });
                        }); })];
            }
        });
    }); });
    test("Increase Night Count", function () { return __awaiter(_this, void 0, void 0, function () {
        var BeforePartyInfo;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Client.FindOne({ _id: PartyId })];
                case 1:
                    BeforePartyInfo = _a.sent();
                    return [2, Filimo.IncreaseNightCount(PartyId)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var AfterPartyInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Client.FindOne({ _id: PartyId })];
                                    case 1:
                                        AfterPartyInfo = _a.sent();
                                        expect(AfterPartyInfo.NightCount - BeforePartyInfo.NightCount).toBe(1);
                                        return [2];
                                }
                            });
                        }); })];
            }
        });
    }); });
    test("Speak", function () { return __awaiter(_this, void 0, void 0, function () {
        var BeforePartyInfo, AfterPartyInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Filimo.Speak(PartyId, Users[~~Math.random() * Users.length])];
                case 1:
                    _a.sent();
                    return [4, Client.FindOne({ _id: PartyId })];
                case 2:
                    BeforePartyInfo = _a.sent();
                    return [4, Filimo.Speak(PartyId, Users[~~Math.random() * Users.length])];
                case 3:
                    _a.sent();
                    return [4, Client.FindOne({ _id: PartyId })];
                case 4:
                    AfterPartyInfo = _a.sent();
                    expect(BeforePartyInfo.CurrentTurnUser !== AfterPartyInfo.CurrentTurnUser).toBe(false);
                    return [2];
            }
        });
    }); });
    test("EnvSetting", function () {
        Filimo.EnvSetting({
            Users: "",
            GameId: "619b56bead2ff443d081b9f7"
        });
    });
    test("EndGame", function () {
        return Filimo.InitParty({ _id: PartyId, Members: Users, GameMode: 1 }).then(function (res) {
            var CheckIsGameGoingOn = Filimo.CheckIsGameGoingOn({ GameId: PartyId });
            expect(CheckIsGameGoingOn).toBe(0);
        });
    });
    test("ConcludeFirstVote", function () {
        Filimo.PartiesInfo["619b56bead2ff443d081b9f7"] = {};
        Filimo.PartiesInfo["619b56bead2ff443d081b9f7"].Alive = Users;
        Filimo.PartiesInfo["619b56bead2ff443d081b9f7"].Votes = [
            {
                UserId: "619c8a04d1f0b837a81206d9",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a0dd1f0b837a81206dc",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a0fd1f0b837a81206df",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a17d1f0b837a81206e2",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a19d1f0b837a81206e5",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a1ad1f0b837a81206e8",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a1bd1f0b837a81206eb",
                VictimId: "619c8a03d1f0b837a81206d6",
                IsVoted: true,
                NoonSleep: false,
                IsCourt: false,
            }, {
                UserId: "619c8a04d1f0b837a81206d9",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a0dd1f0b837a81206dc",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a0fd1f0b837a81206df",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a17d1f0b837a81206e2",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a19d1f0b837a81206e5",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a1ad1f0b837a81206e8",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
            {
                UserId: "619c8a1bd1f0b837a81206eb",
                VictimId: "619c8a1fd1f0b837a81206f4",
                IsVoted: false,
                NoonSleep: false,
                IsCourt: false,
            },
        ];
        var result = Filimo.ConcludeFirstVote({ GameId: GameId });
        expect(result.length).toBe(1);
    });
    test("SpeakList", function () {
        return Promise.all([
            Filimo.IncreaseDayCount(GameId)
                .then(function (res) {
                expect(res).toBeTruthy();
            }),
            Filimo.SpeakList({ PartyId: GameId })
                .then(function (res) {
                expect(res).toBeTruthy();
            })
        ]);
    });
});
