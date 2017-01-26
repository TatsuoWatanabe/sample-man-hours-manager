"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var OkCancelDialogComponent = (function () {
    function OkCancelDialogComponent() {
        this.message = '';
        this.classAttr = '';
        this.btnClassAttrOk = 'modal-action modal-close waves-effect btn-flat';
        this.btnClassAttrCancel = 'modal-action modal-close waves-effect btn-flat';
        this.btnLabelOk = 'OK';
        this.btnLabelCancel = 'Cancel';
        this.materializeParams = [{ dismissible: true }];
        this.onOk = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
    }
    OkCancelDialogComponent.prototype.onOkClicked = function () {
        this.onOk.emit(this.materializeActions);
    };
    OkCancelDialogComponent.prototype.onCancelClicked = function () {
        this.onCancel.emit(this.materializeActions);
    };
    return OkCancelDialogComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "message", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "classAttr", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "btnClassAttrOk", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "btnClassAttrCancel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "btnLabelOk", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "btnLabelCancel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "materializeParams", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], OkCancelDialogComponent.prototype, "materializeActions", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "onOk", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], OkCancelDialogComponent.prototype, "onCancel", void 0);
OkCancelDialogComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ok-cancel-dialog',
        template: "\n    <div\n      class=\"modal {{classAttr}}\"\n      materialize=\"modal\"\n      [materializeParams]=\"materializeParams\"\n      [materializeActions]=\"materializeActions\"\n    >\n      <div class=\"modal-content\">\n        <p>{{message}}</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button class=\"{{btnClassAttrOk}}\" (click)=\"onOkClicked()\">{{btnLabelOk}}</button>\n        <button class=\"{{btnClassAttrCancel}}\" (click)=\"onCancelClicked()\">{{btnLabelCancel}}</button>\n      </div>\n    </div>\n  "
    })
], OkCancelDialogComponent);
exports.OkCancelDialogComponent = OkCancelDialogComponent;
//# sourceMappingURL=ok-cancel-dialog.component.js.map