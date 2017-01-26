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
var consts_1 = require("../../consts/consts");
var moment = require("moment/moment");
var MonthSelectorComponent = (function () {
    function MonthSelectorComponent() {
        this.format = consts_1.Consts.Formats.yearMonth;
        this.selectOptions = [];
        this.selectValue = '';
        this.monthAgoFrom = 6;
        this.monthRange = 12;
        this.monthChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(MonthSelectorComponent.prototype, "Consts", {
        get: function () { return consts_1.Consts; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSelectorComponent.prototype, "moment", {
        get: function () {
            return moment(this.selectValue, consts_1.Consts.Formats.yearMonth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSelectorComponent.prototype, "daysInMonth", {
        get: function () {
            var _this = this;
            if (!this.selectValue) {
                return [];
            }
            var daysInMonthCount = this.moment.daysInMonth();
            return Array.from({ length: daysInMonthCount }, function (v, k) {
                return moment(_this.selectValue, consts_1.Consts.Formats.yearMonth).add(k, 'day').format(consts_1.Consts.Formats.yearMonthDay);
            });
        },
        enumerable: true,
        configurable: true
    });
    MonthSelectorComponent.prototype.ngOnInit = function () {
        var month = 'month';
        var format = consts_1.Consts.Formats.yearMonth;
        var m = moment();
        if (!this.selectValue) {
            this.selectValue = m.format(format);
        }
        m.subtract(this.monthAgoFrom, month);
        for (var i = 0; i <= this.monthRange; i += 1) {
            var name_1 = m.format(this.format);
            var value = m.format(consts_1.Consts.Formats.yearMonth);
            this.selectOptions.push({ name: name_1, value: value });
            m.add(1, month);
        }
    };
    MonthSelectorComponent.prototype.onChange = function ($event) {
        this.monthChanged.emit(this);
    };
    return MonthSelectorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthSelectorComponent.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MonthSelectorComponent.prototype, "selectOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthSelectorComponent.prototype, "selectValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthSelectorComponent.prototype, "monthAgoFrom", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthSelectorComponent.prototype, "monthRange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthSelectorComponent.prototype, "monthChanged", void 0);
MonthSelectorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'month-selector',
        templateUrl: '../../../templates/elements/month-selector.component.html'
    }),
    __metadata("design:paramtypes", [])
], MonthSelectorComponent);
exports.MonthSelectorComponent = MonthSelectorComponent;
//# sourceMappingURL=month-selector.component.js.map