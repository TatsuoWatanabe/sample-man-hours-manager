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
var man_hours_local_strage_service_1 = require("./man-hours-local-strage.service");
var ManHoursService = (function () {
    function ManHoursService(impl) {
        this.impl = impl;
    }
    ManHoursService.prototype.getOneManHour = function (columnId, rowId) {
        return this.impl.getOneManHour(columnId, rowId);
    };
    ManHoursService.prototype.saveMonthManHour = function (rows) {
        return this.impl.saveMonthManHour(rows);
    };
    ManHoursService.prototype.outputCsv = function (columns, rows, fileName) {
        var csvString = this.createCsvString(columns, rows);
        var blob = new Blob([csvString], {
            type: 'text/csv;charset=utf-8;'
        });
        // download csv
        if (window.navigator.msSaveOrOpenBlob) {
            // for IE
            navigator.msSaveBlob(blob, fileName);
        }
        else {
            var downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
            downloadLink.setAttribute('download', fileName);
            downloadLink.setAttribute('target', '_blank');
            downloadLink.click();
        }
    };
    ManHoursService.prototype.createCsvString = function (columns, rows) {
        var separator = ',';
        var newLine = '\n';
        var dataHeader = columns.map(function (column) { return "\"" + column.id + "\""; });
        var csvHeader = ['"Name"'].concat(dataHeader);
        var csvHeaderRow = csvHeader.join(separator);
        var csvBodyRows = rows.map(function (row) {
            var dataBody = Object.keys(row.cells).map(function (key) { return "\"" + row.cells[key].value + "\""; });
            var csvBody = ["\"" + row.name + "\""].concat(dataBody);
            return csvBody.join(separator);
        });
        var csvRows = [csvHeaderRow].concat(csvBodyRows);
        return csvRows.join(newLine);
    };
    return ManHoursService;
}());
ManHoursService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [man_hours_local_strage_service_1.ManHoursLocalStrageService])
], ManHoursService);
exports.ManHoursService = ManHoursService;
//# sourceMappingURL=man-hours.service.js.map