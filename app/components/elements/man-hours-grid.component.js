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
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var consts_1 = require("../../consts/consts");
var ManHoursGridComponent = (function () {
    function ManHoursGridComponent() {
        this.totalRowName = '';
        this.rows = [];
        this.columns = [];
        this.emptyMessage = consts_1.Consts.Msgs.dataGridEmpty;
        this.nameColumnWidth = 300;
        this.dataColumnWidth = 80;
        this.scrollbarH = false;
        this.valueChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(ManHoursGridComponent.prototype, "Consts", {
        get: function () { return consts_1.Consts; },
        enumerable: true,
        configurable: true
    });
    ManHoursGridComponent.prototype.cellInputHandler = function ($event, column, row, cell) {
        var _this = this;
        var parsed = parseFloat($event.target.value);
        if (!cell) {
            $event.preventDefault();
            return;
        }
        if (isNaN(parsed)) {
            $event.preventDefault();
            return;
        }
        // bind the input value.
        cell.value = $event.target.value;
        // collect target day values.
        var cellValues = this.rows.filter(function (oneRow) {
            // exclude total row.
            if (oneRow.name === _this.totalRowName) {
                return false;
            }
            return true;
        }).map(function (oneRow) {
            var cellValue = oneRow.cells[column.id].value;
            return cellValue;
        });
        // calc total
        var dayTotalHour = cellValues.reduce(function (a, b) {
            var fillGap = 100; // correct digit loss
            return ((a * fillGap) + (b * fillGap)) / fillGap;
        });
        // find total row.
        var totalRow = this.rows.filter(function (oneRow) {
            return oneRow.name === _this.totalRowName;
        })[0];
        // bind the totalRow value.
        totalRow.cells[column.id].value = dayTotalHour;
        // emit valueChanged event.
        this.valueChanged.emit(this);
    };
    return ManHoursGridComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ManHoursGridComponent.prototype, "totalRowName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ManHoursGridComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ManHoursGridComponent.prototype, "columns", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ManHoursGridComponent.prototype, "emptyMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ManHoursGridComponent.prototype, "nameColumnWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ManHoursGridComponent.prototype, "dataColumnWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ManHoursGridComponent.prototype, "scrollbarH", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ManHoursGridComponent.prototype, "valueChanged", void 0);
__decorate([
    core_1.ViewChild(ngx_datatable_1.DatatableComponent),
    __metadata("design:type", ngx_datatable_1.DatatableComponent)
], ManHoursGridComponent.prototype, "ngxDataTable", void 0);
ManHoursGridComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'man-hours-grid',
        templateUrl: '../../../templates/elements/man-hours-grid.component.html',
        styleUrls: ['../../../styles/man-hours-grid.component.css']
    }),
    __metadata("design:paramtypes", [])
], ManHoursGridComponent);
exports.ManHoursGridComponent = ManHoursGridComponent;
//# sourceMappingURL=man-hours-grid.component.js.map