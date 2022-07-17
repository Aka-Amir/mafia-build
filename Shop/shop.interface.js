"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.StorePlatforms = exports.EnabledFor = exports.Rarity = exports.PaymentType = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["Coin"] = 0] = "Coin";
    Type[Type["Booster"] = 1] = "Booster";
    Type[Type["Vip"] = 2] = "Vip";
    Type[Type["Character"] = 3] = "Character";
    Type[Type["Avatar"] = 4] = "Avatar";
})(Type = exports.Type || (exports.Type = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["PrimaryCoin"] = 1] = "PrimaryCoin";
    PaymentType[PaymentType["SecondaryCoin"] = 2] = "SecondaryCoin";
    PaymentType[PaymentType["InAppBilling"] = 3] = "InAppBilling";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
var Rarity;
(function (Rarity) {
    Rarity[Rarity["SuperLegend"] = 1] = "SuperLegend";
    Rarity[Rarity["Legend"] = 2] = "Legend";
    Rarity[Rarity["SuperRare"] = 3] = "SuperRare";
    Rarity[Rarity["Rare"] = 4] = "Rare";
    Rarity[Rarity["Common"] = 5] = "Common";
})(Rarity = exports.Rarity || (exports.Rarity = {}));
var EnabledFor;
(function (EnabledFor) {
    EnabledFor[EnabledFor["All"] = 0] = "All";
    EnabledFor[EnabledFor["VIP"] = 1] = "VIP";
    EnabledFor[EnabledFor["Disabled"] = 2] = "Disabled";
})(EnabledFor = exports.EnabledFor || (exports.EnabledFor = {}));
exports.StorePlatforms = {
    Bazaar: "Bazaar",
    Myket: "Myket",
    Zarinpal: "Zarinpal",
};
var Category;
(function (Category) {
    Category[Category["Coin"] = 0] = "Coin";
    Category[Category["Booster"] = 1] = "Booster";
    Category[Category["Vip"] = 2] = "Vip";
    Category[Category["Character"] = 3] = "Character";
    Category[Category["Avatar"] = 4] = "Avatar";
})(Category = exports.Category || (exports.Category = {}));
