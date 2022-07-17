var mongoose = require("../../common/services/mongoose.service");
var GameModel = require("../models/game.model");
describe("Game Model", function () {
    var PartyId;
    test("Create Party", function () {
        return GameModel.CreateParty()
            .then(function (res) {
            PartyId = res;
            expect(res).toBeTruthy();
        });
    });
    test("Save Result", function () {
        return GameModel.SaveResult({
            _id: PartyId,
            GameResult: { NightCount: 7, DayCount: 8 }
        })
            .then(function (res) {
            expect(res).toBeTruthy();
        });
    });
});
