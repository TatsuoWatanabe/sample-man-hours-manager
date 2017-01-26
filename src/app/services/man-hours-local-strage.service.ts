import { Injectable }          from '@angular/core';
import { ManHoursGridRow }     from '../models/man-hours-grid-row';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class ManHoursLocalStrageService {
  private localStrorageKey = 'manHours';

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  public generateKey(columnId: string, rowId: string) {
    return `${columnId}_${rowId}`;
  }

  public getOneManHour(columnId: string, rowId: string) {
    const data    = this.localStorageService.get(this.localStrorageKey) || {};
    const dataKey = this.generateKey(columnId, rowId);
    const value   = data[dataKey] || 0;

    return Number(value);
  }

  public saveMonthManHour(rows: ManHoursGridRow[]) {
    const data = this.localStorageService.get(this.localStrorageKey) || {};

    rows.forEach(row => {
      if (!row.id) { return; }

      Object.keys(row.cells).forEach(key => {
        const cell = row.cells[key];
        const dataKey = this.generateKey(cell.columnId, cell.rowId);
        data[dataKey] = cell.value;
      });
    });

    this.localStorageService.set(this.localStrorageKey, data);

    return new Promise<ManHoursGridRow[]>(resolve => {
      resolve(rows);
    });
  }

  public deleteByProjectId(projectId: string) {
    const data = this.localStorageService.get(this.localStrorageKey) || {};
    const reg = new RegExp('\\d{4}/\\d{2}/\\d{2}_' + projectId);

    Object.keys(data).forEach(key => {
      if (!reg.test(key)) { return; }
      delete data[key];
    });

    this.localStorageService.set(this.localStrorageKey, data);
  }

}
