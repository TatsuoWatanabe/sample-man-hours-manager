import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { ManHoursGridColumn } from '../../models/man-hours-grid-column';
import { ManHoursGridRow }    from '../../models/man-hours-grid-row';
import { ManHoursGridCell }   from '../../models/man-hours-grid-cell';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Consts }             from '../../consts/consts';

@Component({
  moduleId: module.id,
  selector: 'man-hours-grid',
  templateUrl: '../../../templates/elements/man-hours-grid.component.html',
  styleUrls: [ '../../../styles/man-hours-grid.component.css' ]
})
export class ManHoursGridComponent {
  public get Consts() { return Consts; }

  @Input()
  public totalRowName: string = '';

  @Input()
  public rows: ManHoursGridRow[] = [];

  @Input()
  public columns: ManHoursGridColumn[] = [];

  @Input()
  public emptyMessage = Consts.Msgs.dataGridEmpty;

  @Input()
  public nameColumnWidth = 300;

  @Input()
  public dataColumnWidth = 80;

  @Input()
  public scrollbarH = false;

  @Output()
  public valueChanged = new EventEmitter();

  @ViewChild(DatatableComponent)
  public ngxDataTable: DatatableComponent;

  constructor(
    // write here dependency injection declaration.
  ) { }

  public cellInputHandler($event: any, column: ManHoursGridColumn, row: ManHoursGridRow, cell: ManHoursGridCell) {
    const parsed = parseFloat($event.target.value);
    if (!cell)         { $event.preventDefault(); return; }
    if (isNaN(parsed)) { $event.preventDefault(); return; }

    // bind the input value.
    cell.value = $event.target.value;
    // collect target day values.
    const cellValues = this.rows.filter((oneRow) => {
       // exclude total row.
       if (oneRow.name === this.totalRowName) { return false; }
       return true;
    }).map((oneRow) => {
      const cellValue = oneRow.cells[column.id].value;
      return cellValue;
    });
    // calc total
    const dayTotalHour = cellValues.reduce((a, b) => {
      const fillGap = 100; // correct digit loss
      return ((a * fillGap) + (b * fillGap)) / fillGap;
    });
    // find total row.
    const totalRow = this.rows.filter((oneRow) =>
      oneRow.name === this.totalRowName
    )[0];
    // bind the totalRow value.
    totalRow.cells[column.id].value = dayTotalHour;

    // emit valueChanged event.
    this.valueChanged.emit(this);
  }

}
