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
var man_hours_grid_column_1 = require("../../models/man-hours-grid-column");
var man_hours_grid_row_1 = require("../../models/man-hours-grid-row");
var man_hours_grid_cell_1 = require("../../models/man-hours-grid-cell");
var month_selector_component_1 = require("../elements/month-selector.component");
var man_hours_service_1 = require("../../services/man-hours.service");
var project_service_1 = require("../../services/project.service");
var consts_1 = require("../../consts/consts");
var moment = require("moment/moment");
var InputHoursComponent = (function () {
    function InputHoursComponent(projectService, manHoursService) {
        this.projectService = projectService;
        this.manHoursService = manHoursService;
        /** EventEmitter for materialize dialog. */
        this.confirmSaveModalActions = new core_1.EventEmitter();
        this.confirmDiscardModalActions = new core_1.EventEmitter();
        this.rows = [];
        this.columns = [];
        this.totalGridRows = [];
        this.totalGridColumns = [];
    }
    Object.defineProperty(InputHoursComponent.prototype, "Consts", {
        get: function () { return consts_1.Consts; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHoursComponent.prototype, "totalRowName", {
        get: function () { return 'Total'; },
        enumerable: true,
        configurable: true
    });
    InputHoursComponent.prototype.ngAfterViewInit = function () {
        this.load(this.monthSelector);
    };
    InputHoursComponent.prototype.monthChanged = function () {
        this.load(this.monthSelector);
    };
    /** discard the input data of unsaved. */
    InputHoursComponent.prototype.discard = function () {
        this.load(this.monthSelector);
    };
    InputHoursComponent.prototype.save = function () {
        if (this.rows.length === 0) {
            Materialize.toast(consts_1.Consts.Msgs.noProjectData, consts_1.Consts.Nums.toastNormal);
            return;
        }
        this.manHoursService.saveMonthManHour(this.rows).then(function () {
            Materialize.toast(consts_1.Consts.Msgs.saved, consts_1.Consts.Nums.toastNormal);
        });
    };
    InputHoursComponent.prototype.openModal = function (emitter) {
        emitter.emit({ action: 'modal', params: ['open'] });
    };
    InputHoursComponent.prototype.outputCsv = function () {
        var now = moment().format(consts_1.Consts.Formats.yearToSecond);
        var fileName = [
            now + '_',
            consts_1.Consts.Pages.app + '_',
            this.monthSelector.moment.format(consts_1.Consts.Formats.displayYearMonth),
            '.csv'
        ].join('');
        this.manHoursService.outputCsv(this.columns, this.rows, fileName);
    };
    InputHoursComponent.prototype.initRows = function () {
        var _this = this;
        this.rows.splice(0, this.rows.length); // delete all
        this.totalGridRows.splice(0, this.totalGridRows.length); // delete all
        // get the registerd projects.
        return this.projectService.getProjects().then(function (projects) {
            projects.forEach(function (project) {
                _this.rows.push(new man_hours_grid_row_1.ManHoursGridRow(project.name, project.id));
            });
        });
    };
    InputHoursComponent.prototype.initColumns = function () {
        this.columns.splice(0, this.columns.length); // delete all
    };
    InputHoursComponent.prototype.load = function (selector) {
        var _this = this;
        this.initRows().then(function () {
            _this.loadMonthData(selector);
        });
    };
    InputHoursComponent.prototype.loadMonthData = function (selector) {
        var _this = this;
        this.initColumns();
        var totalRow = new man_hours_grid_row_1.ManHoursGridRow(this.totalRowName);
        selector.daysInMonth.forEach(function (yearMonthDay) {
            var m = moment(yearMonthDay, consts_1.Consts.Formats.yearMonthDay);
            var columnId = m.format(consts_1.Consts.Formats.yearMonthDay);
            var columnLabel = m.format(consts_1.Consts.Formats.monthDay);
            var column = new man_hours_grid_column_1.ManHoursGridColumn(columnId, columnLabel);
            var dayTotalHour = 0;
            _this.columns.push(column);
            _this.rows.forEach(function (row, index) {
                var hour = _this.manHoursService.getOneManHour(column.id, row.id);
                var tabindex = index + (Number(m.format('D')) * 100);
                row.cells[column.id] = new man_hours_grid_cell_1.ManHoursGridCell(hour, column.id, row.id, true, tabindex);
                // TODO: to utility func.
                var fillGap = 100; // correct digit loss
                dayTotalHour = ((dayTotalHour * fillGap) + (hour * fillGap)) / fillGap;
            });
            totalRow.cells[column.id] = new man_hours_grid_cell_1.ManHoursGridCell(dayTotalHour, column.id);
        });
        // recalc immediately.
        setTimeout(function () {
            if (_this.rows.length === 0) {
                return;
            }
            _this.rows.push(totalRow);
            _this.calcTotalGrid();
        }, 10);
    };
    InputHoursComponent.prototype.calcTotalGrid = function () {
        var _this = this;
        // init totalGridColumns
        var columnId = 'Total';
        var columnLabel = 'Total';
        var column = this.totalGridColumns[0] || new man_hours_grid_column_1.ManHoursGridColumn(columnId, columnLabel);
        this.totalGridColumns[0] = column;
        // init totalGridRows
        this.rows.forEach(function (row, index) {
            var alreadyExists = !!_this.totalGridRows[index];
            var totalGridRow = alreadyExists ? _this.totalGridRows[index] : new man_hours_grid_row_1.ManHoursGridRow(row.name);
            // calc total of month.
            var hour = Object.keys(row.cells).map(function (key) {
                return row.cells[key].value;
            }).reduce(function (a, b) {
                var fillGap = 100; // correct digit loss
                return ((a * fillGap) + (b * fillGap)) / fillGap;
            });
            // set cell and cell's value
            var cell = totalGridRow.cells[column.id] || new man_hours_grid_cell_1.ManHoursGridCell(hour, column.id);
            if (alreadyExists) {
                cell.value = hour;
            }
            else {
                totalGridRow.cells[column.id] = cell;
                _this.totalGridRows.push(totalGridRow);
            }
        });
    };
    return InputHoursComponent;
}());
__decorate([
    core_1.ViewChild(month_selector_component_1.MonthSelectorComponent),
    __metadata("design:type", month_selector_component_1.MonthSelectorComponent)
], InputHoursComponent.prototype, "monthSelector", void 0);
InputHoursComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'input-hours',
        templateUrl: '../../../templates/pages/input-hours.component.html'
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        man_hours_service_1.ManHoursService])
], InputHoursComponent);
exports.InputHoursComponent = InputHoursComponent;
//# sourceMappingURL=input-hours.component.js.map