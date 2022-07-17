"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    https: 'https://www.zarinpal.com/pg/rest/WebGate/',
    sandbox: 'https://sandbox.zarinpal.com/pg/rest/WebGate/',
    merchantIDLength: 36,
    API: {
        PR: 'PaymentRequest.json',
        PRX: 'PaymentRequestWithExtra.json',
        PV: 'PaymentVerification.json',
        PVX: 'PaymentVerificationWithExtra.json',
        RA: 'RefreshAuthority.json',
        UT: 'UnverifiedTransactions.json'
    },
    PG: function (sandbox) {
        if (sandbox) {
            return 'https://sandbox.zarinpal.com/pg/StartPay/';
        }
        return 'https://www.zarinpal.com/pg/StartPay/';
    },
    devMode: false,
    merchantID: "10bacf6e-1b17-41ec-abf2-4c039de24c8e",
    CallbackUrl: "http://192.168.1.62:1010/payment/gateway/zarinpal/verify",
    SuccessPage: "https://mafia-nights.ir/Payment-report.php?ErrCode=100",
    FaildPage: "https://mafia-nights.ir/Payment-report.php?ErrCode="
};
exports.default = config;
