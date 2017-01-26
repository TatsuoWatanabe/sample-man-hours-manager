import { Injectable }                 from '@angular/core';
import { ManHoursGridRow }            from '../models/man-hours-grid-row';
import { ManHoursGridColumn }         from '../models/man-hours-grid-column';
import { ManHoursLocalStrageService } from './man-hours-local-strage.service';

@Injectable()
export class ManHoursService {

  constructor(
    private impl: ManHoursLocalStrageService
  ) {}

  public getOneManHour(columnId: string, rowId: string) {
    return this.impl.getOneManHour(columnId, rowId);
  }

  public saveMonthManHour(rows: ManHoursGridRow[]) {
    return this.impl.saveMonthManHour(rows);
  }

  public outputCsv(columns: ManHoursGridColumn[], rows: ManHoursGridRow[], fileName: string) {
    const csvString = this.createCsvString(columns, rows);
    const blob = new Blob([csvString], {
      type: 'text/csv;charset=utf-8;'
    });

    // download csv
    if (window.navigator.msSaveOrOpenBlob) {
      // for IE
      navigator.msSaveBlob(blob, fileName);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
      downloadLink.setAttribute('download', fileName);
      downloadLink.setAttribute('target', '_blank');
      downloadLink.click();
    }
  }

  public createCsvString(columns: ManHoursGridColumn[], rows: ManHoursGridRow[]) {
    const separator = ',';
    const newLine = '\n';
    const dataHeader = columns.map((column) => `"${column.id}"`);
    const csvHeader  = ['"Name"'].concat(dataHeader);
    const csvHeaderRow = csvHeader.join(separator);
    const csvBodyRows = rows.map(row => {
      const dataBody = Object.keys(row.cells).map(key => `"${row.cells[key].value}"`);
      const csvBody  = [`"${row.name}"`].concat(dataBody);
      return csvBody.join(separator);
    });
    const csvRows = [csvHeaderRow].concat(csvBodyRows);
    return csvRows.join(newLine);
  }

}
