"use strict";
var ManHoursGridCell = (function () {
    function ManHoursGridCell(value, columnId, rowId, inputable, tabindex) {
        if (rowId === void 0) { rowId = ''; }
        if (inputable === void 0) { inputable = false; }
        if (tabindex === void 0) { tabindex = 1; }
        this.value = value;
        this.columnId = columnId;
        this.rowId = rowId;
        this.inputable = inputable;
        this.tabindex = tabindex;
    }
    return ManHoursGridCell;
}());
exports.ManHoursGridCell = ManHoursGridCell;
//# sourceMappingURL=man-hours-grid-cell.js.map