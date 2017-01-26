import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  Input
} from '@angular/core';
import { Consts } from '../../consts/consts';
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'month-selector',
  templateUrl: '../../../templates/elements/month-selector.component.html'
})
export class MonthSelectorComponent implements OnInit {
  public get Consts() { return Consts; }

  @Input()
  public format = Consts.Formats.yearMonth;

  @Input()
  public selectOptions: { name: string, value: string }[] = [];

  @Input()
  public selectValue = '';

  @Input()
  public monthAgoFrom = 6;

  @Input()
  public monthRange = 12;

  public get moment() {
    return moment(this.selectValue, Consts.Formats.yearMonth);
  }

  public get daysInMonth() {
    if (!this.selectValue) { return []; }

    const daysInMonthCount = this.moment.daysInMonth();
    return Array.from({length: daysInMonthCount}, (v, k) =>
      moment(this.selectValue, Consts.Formats.yearMonth).add(k, 'day').format(Consts.Formats.yearMonthDay)
    );
  }

  @Output()
  public monthChanged = new EventEmitter();

  constructor(
    // write here dependency injection declaration.
  ) {  }

  ngOnInit(): void {
    const month = 'month';
    const format = Consts.Formats.yearMonth;
    const m = moment();
    if (!this.selectValue) {
      this.selectValue = m.format(format);
    }

    m.subtract(this.monthAgoFrom, month);
    for (let i = 0; i <= this.monthRange; i += 1) {
      const name = m.format(this.format);
      const value = m.format(Consts.Formats.yearMonth);
      this.selectOptions.push({ name, value });
      m.add(1, month);
    }
  }

  onChange($event: any) {
    this.monthChanged.emit(this);
  }

}
