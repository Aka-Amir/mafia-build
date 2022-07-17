var Roles = {
    GodFather: 2000,
    Mafia: 2003,
    Detective: 1000,
    Doctor: 1001,
    Sniper: 1002,
    Immortal: 1004,
    Citizen: 1007,
};
var RolesName = {
    2000: "GodFather",
    2003: "Mafia",
    1000: "Detective",
    1001: "Doctor",
    1004: "Immortal",
    1002: "Sniper",
    1007: "Citizen",
};
var MafiaRoles = [Roles.GodFather, Roles.Mafia];
var CitizenRoles = [Roles.Citizen, Roles.Immortal, Roles.Detective, Roles.Doctor, Roles.Sniper];
var MembersLimit = 10;
var EnvStates = {
    Night: 0,
    Day: 1
};
var GameMode = {
    Voice: 1,
    Video: 2,
    Text: 3,
    VR: 4
};
var Opinions = {
    Like: 1,
    DisLike: 2,
    SuperLike: 3,
    SuperDisLike: 4,
    Connect: 5,
    Disconnect: 6,
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
var Times = {
    PassTurn: 8,
    Challenge: 5,
    Vote: 5,
    IntroductionNight: 10,
    CourtSpeak: 5,
    Mayor: 0,
    WillingSpeak: 8,
    Night: 16,
    ConcludeTheNight: 2,
    LastChance: 0,
    LastChanceUseAbility: 0,
    NoneMayor: 0,
    SituationVote: 10,
    SituationConclude: 4,
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
    Quit: Array(),
    Members: Array(),
    IsGameEnded: false,
    UsersData: Array(),
    Alive: Array(),
    Kills: Array(),
    ShotRightQueue: Array(),
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
    ChallengeList: [],
    Challenge: "",
    MafiaChoice: String(),
    DetectiveChoice: String(),
    DoctorChoice: String(),
    SniperChoice: String(),
    DoctorSaveItself: 2,
    SniperShotCount: 1,
    ImmortalShield: 1,
    StartTime: [],
    EndTime: [],
    Scores: [],
    SituationRequestStatus: false,
    SituationRequest: 2,
    SituationRequestCount: 0,
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
var EnvironmentSetting = {
    MaxSize: Number(),
    EnvironmentID: "default",
    PartyID: String(),
    PartyState: Number(EnvStates.Day),
    InGameRoles: [
        Roles.GodFather,
        Roles.Mafia,
        Roles.Mafia,
        Roles.Citizen,
        Roles.Citizen,
        Roles.Citizen,
        Roles.Immortal,
        Roles.Detective,
        Roles.Doctor,
        Roles.Sniper
    ],
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
exports.Opinions = Opinions;
exports.PartyState = PartyState;
exports.Times = Times;
exports.EnvironmentSetting = EnvironmentSetting;
exports.MembersLimit = MembersLimit;
exports.PlayerModel = PlayerModel;
exports.GameMode = GameMode;
exports.Sides = Sides;
exports.Roles = Roles;
exports.GameStates = GameStates;
exports.MafiaRoles = MafiaRoles;
exports.CitizenRoles = CitizenRoles;
exports.RolesName = RolesName;
exports.GameStatus = GameStatus;
exports.SendMessageToRoleInterface = SendMessageToRoleInterface;
