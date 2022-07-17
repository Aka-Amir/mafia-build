"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateGenerator = exports.ETemplateModel = void 0;
var email_verification_template_1 = require("../assets/templates/email-verification.template");
var ETemplateModel;
(function (ETemplateModel) {
    ETemplateModel[ETemplateModel["emailVerification"] = 0] = "emailVerification";
})(ETemplateModel = exports.ETemplateModel || (exports.ETemplateModel = {}));
var TemplateGenerator = (function () {
    function TemplateGenerator(templateModel, pathToAsset) {
        this.pathToAsset = pathToAsset;
        this.fields = {
            Title: "%TITLE%",
            Content: "%CNT%",
            ButtonURL: "%URL%",
            ButtonText: "%BTN-TXT%",
            CopyRightText: "%COPY_RIGHT_TEXT%",
        };
        switch (templateModel) {
            case ETemplateModel.emailVerification:
                this.data = email_verification_template_1.template;
                break;
            default:
                break;
        }
    }
    TemplateGenerator.prototype.SetTitle = function (content, value) {
        return content.replace(this.fields.Title, value);
    };
    TemplateGenerator.prototype.SetContent = function (content, value) {
        return content.replace(this.fields.Content, value);
    };
    TemplateGenerator.prototype.SetButtonUrl = function (content, value) {
        return content.replace(this.fields.ButtonURL, value);
    };
    TemplateGenerator.prototype.SetButtonText = function (content, value) {
        return content.replace(this.fields.ButtonText, value);
    };
    TemplateGenerator.prototype.SetCopyRightText = function (content, value) {
        return content.replace(this.fields.CopyRightText, value);
    };
    TemplateGenerator.prototype.EmailVerification = function (inp, direction) {
        if (direction === void 0) { direction = "ltr"; }
        if (!this.data)
            throw new Error("File Not Found");
        var content = this.data.toString();
        content = this.SetTitle(content, inp.title);
        content = this.SetContent(content, inp.content);
        content = this.SetButtonUrl(content, inp.buttonUrl);
        content = this.SetButtonText(content, inp.buttonText);
        content = this.SetCopyRightText(content, inp.copyRightText);
        return content;
    };
    return TemplateGenerator;
}());
exports.TemplateGenerator = TemplateGenerator;
exports.default = TemplateGenerator;
