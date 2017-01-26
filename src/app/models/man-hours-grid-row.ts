import { ManHoursGridCell } from './man-hours-grid-cell';

export class ManHoursGridRow {

  constructor(
    public name: string,
    public id = '',
    public cells: { [key: string]: ManHoursGridCell; } = {},
  ) { }
}
