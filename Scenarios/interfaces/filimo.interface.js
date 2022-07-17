"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groups_enums_1 = require("../../Groups/groups.enums");
var Roles = {
    GodFather: 2000,
    DoctorLecture: 2001,
    Joker: 2002,
    Mafia: 2003,
    Detective: 1000,
    Doctor: 1001,
    Professional: 1002,
    Seller: 1003,
    Immortal: 1004,
    Mayor: 1005,
    Psychiatrist: 1006,
    Citizen: 1007,
};
var RolesName = {
    2000: "GodFather",
    2001: "DoctorLecture",
    2002: "Joker",
    2003: "Mafia",
    1000: "Detective",
    1001: "Doctor",
    1002: "Professional",
    1003: "Seller",
    1004: "Immortal",
    1005: "Mayor",
    1006: "Psychiatrist",
    1007: "Citizen",
};
var MafiaRoles = [Roles.GodFather, Roles.DoctorLecture, Roles.Joker, Roles.Mafia];
var EnvStates = {
    Night: 0,
    Day: 1
};
var Opinions = {
    Like: 1,
    DisLike: 2,
    SuperLike: 3,
    SuperDisLike: 4,
    Connect: 5,
    Disconnect: 6,
};
var GameMode = {
    Voice: 1,
    Video: 2,
    Text: 3,
    VR: 4
};
var Sides = {
    Hidden: 0,
    Mafia: 1,
    Citizen: 2
};
var GameStatus = {
    CitizenWin: Sides.Citizen,
    MafiaWin: Sides.Mafia,
    Continue: Sides.Hidden
};
var MayorAction = {
    NotUsed: 0,
    Execute: 1,
    CancelSecondVote: 2
};
var LastChanceEnum = {
    "GreenPath": 0,
    "Insomnia": 1,
    "RedCarpet": 2,
    "FinalShot": 3,
};
var LastChance = {
    GreenPath: "GreenPath",
    Insomnia: "Insomnia",
    RedCarpet: "RedCarpet",
    FinalShot: "FinalShot",
};
var Times = {
    PassTurn: 10,
    Challenge: 5,
    Vote: 6,
    IntroductionNight: 10,
    CourtSpeak: 5,
    Mayor: 10,
    Night: 20,
    ConcludeTheNight: 2,
    LastChance: 5,
    LastChanceUseAbility: 10,
    NoneMayor: 15,
    LastChanceResult: 15,
};
var PartyState = {
    Night: 1,
    Day: 2
};
var PartyBasicModel = {
    _id: String(),
    NightCount: Number(),
    DayCount: Number(),
    PartyState: Number(),
    AnimationsNextStep: String(),
    Scenario: groups_enums_1.scenario.Filimo,
    Quit: Array(),
    Members: Array(),
    IsGameEnded: false,
    GameState: "",
    ExecutionAnimationUserId: null,
    ExecutionAnimationNextStep: null,
    OnlineTime: {},
    OfflineTime: {},
    OfflineLimit: 15 * 1000,
    Win: Number(),
    UsersData: Array(),
    Alive: Array(),
    Kills: Array(),
    DisconnectedUsers: Array(),
    MemberLimit: 12,
    GameTitle: "در حال انتظار",
    Starter: String(),
    EnvironmentID: String(),
    IsStarted: false,
    GameMode: Number(),
    CurrentTurnUser: String(),
    SpeakList: Array(),
    OrderedSpeakList: Array(),
    Court: Array(),
    CourtQueue: Array(),
    NoonSleepStatus: Number(),
    VoteList: Array(),
    Votes: Array(),
    MayorAbilityStatus: 0,
    ChallengeList: [],
    Challenge: "",
    MafiaShotIsDisable: false,
    RightToChooseCard: String(),
    RedCarpet: String(),
    GreenPath: String(),
    FinalShot: String(),
    ImmortalChoice: String(),
    JokerChoice: String(),
    DoctorLectureChoice: String(),
    MafiaChoice: String(),
    DetectiveChoice: String(),
    DoctorChoice: String(),
    ProfessionalChoice: String(),
    SellerChoice: String(),
    PsychiatristChoice: String(),
    DoctorLectureSaveItself: 1,
    DoctorSaveItself: 1,
    AllJokerChoices: [],
    Seller: 1,
    SituationRequest: 2,
    Psychiatrist: 2,
    ImmortalShield: 1,
    StartTime: [],
    EndTime: [],
    Scores: [],
    ScoreBoard: [],
    UsefulSituationRequest: false,
};
var PlayerModel = {
    UserId: String(),
    Index: Number(),
    UserName: String(),
    Character: Number(),
    UserRole: Number(),
    UserSide: Number()
};
var SendMessageToRoleInterface = {
    GameId: String(),
    Event: String(),
    UserRole: Number(),
    Message: Object(),
    asObject: Boolean()
};
var GameStates = {
    PassTurn: "PassTurn",
    CourtSpeak: "CourtSpeak",
    FirstVote: "FirstVote",
    SecondVote: "SecondVote",
    Night: "Night",
    Day: "Day",
    Mayor: "Mayor",
    LastChanceCard: "LastChanceCard",
};
var EnvironmentSetting = {
    MaxSize: Number(),
    EnvironmentID: "default",
    PartyID: String(),
    PartyState: Number(EnvStates.Day),
    InGameRoles: Object.keys(Roles),
    Users: Array(),
    SpeakList: Array(),
    AliveUsers: Array(),
    DeadUsers: Array(),
    DisconnectedUsers: Array(),
    GameTitle: String(),
    StandingUser: String(),
    GameMode: Number(GameMode.Voice)
};
exports.PartyBasicModel = PartyBasicModel;
exports.LastChanceEnum = LastChanceEnum;
exports.PartyState = PartyState;
exports.Times = Times;
exports.LastChance = LastChance;
exports.MayorAction = MayorAction;
exports.EnvironmentSetting = EnvironmentSetting;
exports.PlayerModel = PlayerModel;
exports.GameMode = GameMode;
exports.Sides = Sides;
exports.Roles = Roles;
exports.Opinions = Opinions;
exports.MafiaRoles = MafiaRoles;
exports.RolesName = RolesName;
exports.GameStates = GameStates;
exports.GameStatus = GameStatus;
exports.SendMessageToRoleInterface = SendMessageToRoleInterface;
