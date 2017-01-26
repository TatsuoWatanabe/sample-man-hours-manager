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
var angular_2_local_storage_1 = require("angular-2-local-storage");
var ManHoursLocalStrageService = (function () {
    function ManHoursLocalStrageService(localStorageService) {
        this.localStorageService = localStorageService;
        this.localStrorageKey = 'manHours';
    }
    ManHoursLocalStrageService.prototype.generateKey = function (columnId, rowId) {
        return columnId + "_" + rowId;
    };
    ManHoursLocalStrageService.prototype.getOneManHour = function (columnId, rowId) {
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        var dataKey = this.generateKey(columnId, rowId);
        var value = data[dataKey] || 0;
        return Number(value);
    };
    ManHoursLocalStrageService.prototype.saveMonthManHour = function (rows) {
        var _this = this;
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        rows.forEach(function (row) {
            if (!row.id) {
                return;
            }
            Object.keys(row.cells).forEach(function (key) {
                var cell = row.cells[key];
                var dataKey = _this.generateKey(cell.columnId, cell.rowId);
                data[dataKey] = cell.value;
            });
        });
        this.localStorageService.set(this.localStrorageKey, data);
        return new Promise(function (resolve) {
            resolve(rows);
        });
    };
    ManHoursLocalStrageService.prototype.deleteByProjectId = function (projectId) {
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        var reg = new RegExp('\\d{4}/\\d{2}/\\d{2}_' + projectId);
        Object.keys(data).forEach(function (key) {
            if (!reg.test(key)) {
                return;
            }
            delete data[key];
        });
        this.localStorageService.set(this.localStrorageKey, data);
    };
    return ManHoursLocalStrageService;
}());
ManHoursLocalStrageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular_2_local_storage_1.LocalStorageService])
], ManHoursLocalStrageService);
exports.ManHoursLocalStrageService = ManHoursLocalStrageService;
//# sourceMappingURL=man-hours-local-strage.service.js.map