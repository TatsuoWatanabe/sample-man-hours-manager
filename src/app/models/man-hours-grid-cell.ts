export class ManHoursGridCell {

  constructor(
    public value: number,
    public columnId: string,
    public rowId = '',
    public inputable = false,
    public tabindex = 1
  ) { }
}
