import {
  Component,
  ViewChild,
  AfterViewInit,
  EventEmitter
} from '@angular/core';
import { ManHoursGridColumn }     from '../../models/man-hours-grid-column';
import { ManHoursGridRow }        from '../../models/man-hours-grid-row';
import { ManHoursGridCell }       from '../../models/man-hours-grid-cell';
import { MonthSelectorComponent } from '../elements/month-selector.component';
import { ManHoursService }        from '../../services/man-hours.service';
import { ProjectService }         from '../../services/project.service';
import { Consts }                 from '../../consts/consts';
import { MaterializeAction }      from 'angular2-materialize';
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'input-hours',
  templateUrl: '../../../templates/pages/input-hours.component.html'
})
export class InputHoursComponent implements AfterViewInit {
  public get Consts() { return Consts; }
  public get totalRowName() { return 'Total'; }

  @ViewChild(MonthSelectorComponent)
  public monthSelector: MonthSelectorComponent;

  /** EventEmitter for materialize dialog. */
  public confirmSaveModalActions    = new EventEmitter<string|MaterializeAction>();
  public confirmDiscardModalActions = new EventEmitter<string|MaterializeAction>();

  public rows: ManHoursGridRow[] = [];
  public columns: ManHoursGridColumn[] = [];
  public totalGridRows: ManHoursGridRow[] = [];
  public totalGridColumns: ManHoursGridColumn[] = [];

  constructor(
    private projectService: ProjectService,
    private manHoursService: ManHoursService
  ) { }

  public ngAfterViewInit() {
    this.load(this.monthSelector);
  }

  public monthChanged() {
    this.load(this.monthSelector);
  }

  /** discard the input data of unsaved. */
  public discard() {
    this.load(this.monthSelector);
  }

  public save() {
    if (this.rows.length === 0) {
      Materialize.toast(Consts.Msgs.noProjectData, Consts.Nums.toastNormal);
      return;
    }
    this.manHoursService.saveMonthManHour(this.rows).then(() => {
      Materialize.toast(Consts.Msgs.saved, Consts.Nums.toastNormal);
    });
  }

  public openModal(emitter: EventEmitter<string|MaterializeAction>) {
    emitter.emit({ action: 'modal', params: ['open'] });
  }

  public outputCsv() {
    const now = moment().format(Consts.Formats.yearToSecond);
    const fileName = [
      now + '_',
      Consts.Pages.app + '_',
      this.monthSelector.moment.format(Consts.Formats.displayYearMonth),
      '.csv'
    ].join('');
    this.manHoursService.outputCsv(this.columns, this.rows, fileName);
  }

  private initRows() {
    this.rows.splice(0, this.rows.length); // delete all
    this.totalGridRows.splice(0, this.totalGridRows.length); // delete all

    // get the registerd projects.
    return this.projectService.getProjects().then(projects => {
      projects.forEach(project => {
        this.rows.push(new ManHoursGridRow(project.name, project.id));
      });
    });
  }

  private initColumns() {
    this.columns.splice(0, this.columns.length); // delete all
  }

  private load(selector: MonthSelectorComponent) {
    this.initRows().then(() => {
      this.loadMonthData(selector);
    });
  }

  private loadMonthData(selector: MonthSelectorComponent) {
    this.initColumns();

    const totalRow = new ManHoursGridRow(this.totalRowName);

    selector.daysInMonth.forEach(yearMonthDay => {
      const m = moment(yearMonthDay, Consts.Formats.yearMonthDay);
      const columnId    = m.format(Consts.Formats.yearMonthDay);
      const columnLabel = m.format(Consts.Formats.monthDay);
      const column = new ManHoursGridColumn(columnId, columnLabel);

      let dayTotalHour = 0;
      this.columns.push(column);
      this.rows.forEach((row, index) => {
        const hour = this.manHoursService.getOneManHour(column.id, row.id);
        const tabindex = index + (Number(m.format('D')) * 100);
        row.cells[column.id] = new ManHoursGridCell(hour, column.id, row.id, true, tabindex);

        // TODO: to utility func.
        const fillGap = 100; // correct digit loss
        dayTotalHour = ((dayTotalHour * fillGap) + (hour * fillGap)) / fillGap;
      });

      totalRow.cells[column.id] = new ManHoursGridCell(dayTotalHour, column.id);
    });

    // recalc immediately.
    setTimeout(() => {
      if (this.rows.length === 0) { return; }
      this.rows.push(totalRow);
      this.calcTotalGrid();
    }, 10);
  }

  public calcTotalGrid() {
    // init totalGridColumns
    const columnId    = 'Total';
    const columnLabel = 'Total';
    const column = this.totalGridColumns[0] || new ManHoursGridColumn(columnId, columnLabel);
    this.totalGridColumns[0] = column;

    // init totalGridRows
    this.rows.forEach((row, index) => {
      const alreadyExists = !!this.totalGridRows[index];
      const totalGridRow = alreadyExists ? this.totalGridRows[index] : new ManHoursGridRow(row.name);
      // calc total of month.
      const hour = Object.keys(row.cells).map(key => {
        return row.cells[key].value;
      }).reduce((a, b) => {
        const fillGap = 100; // correct digit loss
        return ((a * fillGap) + (b * fillGap)) / fillGap;
      });
      // set cell and cell's value
      const cell = totalGridRow.cells[column.id] || new ManHoursGridCell(hour, column.id);
      if (alreadyExists) {
        cell.value = hour;
      } else {
        totalGridRow.cells[column.id] = cell;
        this.totalGridRows.push(totalGridRow);
      }
    });
  }

}
