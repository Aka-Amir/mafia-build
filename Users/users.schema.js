"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCollectionName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var authentication_schema_1 = require("../Authentication/authentication.schema");
exports.usersCollectionName = "colUsers";
var Schema = new mongoose_1.default.Schema({
    UserName: {
        type: String,
        unique: true,
    },
    InvitationCode: {
        type: String,
        unique: true,
    },
    InviteCount: {
        type: Number,
        default: 0,
    },
    Nickname: String,
    EmailConfirmStatus: {
        type: Boolean,
        default: false,
    },
    AvatarId: {
        type: String,
        default: "0"
    },
    Character: {
        type: String,
        default: "0"
    },
    Xp: {
        type: Number,
        default: 1
    },
    IsOnline: Boolean,
    PrimaryCoin: {
        type: Number,
        default: 500
    },
    SecondaryCoin: {
        type: Number,
        default: 0
    },
    GameId: {
        type: String,
        default: ""
    },
    GameHistory: [
        {
            type: String,
        },
    ],
    AuthenticationRef: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: authentication_schema_1.authCollectionName,
    },
    Friends: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: exports.usersCollectionName,
        },
    ],
    BehaviorScore: {
        type: Number,
        default: 1000
    },
    ReportCount: {
        type: Number,
        default: 10
    },
    CommandCount: {
        type: Number,
        default: 20
    },
    AdvertisHistory: [{
            type: Date,
        }],
    VipExpireTime: {
        type: Date,
        default: Date.now
    },
    BanTime: {
        type: Number,
        default: 0,
    },
    SignupDate: {
        type: Date,
        default: Date.now
    }
});
Schema.set('toObject', { virtuals: true });
Schema.set('toJSON', { virtuals: true });
Schema.virtual('Vip').get(function () {
    if (!this.VipExpireTime)
        return false;
    return this.VipExpireTime > Date.now();
});
Schema.virtual('Advertise').get(function () {
    if (!this.AdvertisHistory)
        return 0;
    var AllTodaySeen = this.AdvertisHistory.map(function (item) {
        var date = new Date(item);
        return "".concat(date.getFullYear(), "/").concat(date.getMonth(), "/").concat(date.getDate());
    });
    var date = new Date();
    var now = "".concat(date.getFullYear(), "/").concat(date.getMonth(), "/").concat(date.getDate());
    return AllTodaySeen.filter(function (i) { return i === now; }).length;
});
Schema.virtual('AdvertiseStatus').get(function () {
    if (!this.AdvertisHistory)
        return true;
    if (this.AdvertisHistory.length === 0)
        return true;
    var AllTodaySeen = this.AdvertisHistory.map(function (item) {
        var date = new Date(item);
        return "".concat(date.getFullYear(), "/").concat(date.getMonth(), "/").concat(date.getDate());
    });
    var date = new Date();
    var now = "".concat(date.getFullYear(), "/").concat(date.getMonth(), "/").concat(date.getDate());
    var AllTodaySeenCount = AllTodaySeen.filter(function (i) { return i === now; }).length;
    var LastSeen = new Date(this.AdvertisHistory[this.AdvertisHistory.length - 1]);
    var Now = new Date();
    var MillisecondInFourHours = 1000 * 60 * 60 * 4;
    return AllTodaySeenCount < 3 && Now.getTime() - LastSeen.getTime() > MillisecondInFourHours;
});
Schema.virtual('VipExpireDay').get(function () {
    if (!this.VipExpireTime)
        return 0;
    var expire = (new Date(this.VipExpireTime)).getTime();
    var millisecondLeft = expire - Date.now();
    if (millisecondLeft <= 0)
        return 0;
    var millisecondInDay = 86400000;
    return ~~(millisecondLeft / millisecondInDay);
});
Schema.virtual('Level').get(function () {
    var xp = this.Xp;
    if (!xp)
        return 0;
    var NextLevelXp = 500;
    var Level = 1;
    var currentXp = xp;
    while (NextLevelXp <= xp) {
        if (NextLevelXp > currentXp)
            break;
        Level++;
        currentXp -= NextLevelXp;
        NextLevelXp = ~~(NextLevelXp * 1.035);
    }
    return Level;
});
Schema.virtual("Score").get(function () {
    var xp = this.Xp;
    if (!xp)
        return 0;
    var NextLevelXp = 500;
    var Level = 1;
    var currentXp = xp;
    while (NextLevelXp <= xp) {
        if (NextLevelXp > currentXp)
            break;
        Level++;
        currentXp -= NextLevelXp;
        NextLevelXp = ~~(NextLevelXp * 1.035);
    }
    return ~~((currentXp * 100) / NextLevelXp);
});
var model = mongoose_1.default.model(exports.usersCollectionName, Schema);
exports.default = model;
