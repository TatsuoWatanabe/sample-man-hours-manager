import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  moduleId: module.id,
  selector: 'ok-cancel-dialog',
  template: `
    <div
      class="modal {{classAttr}}"
      materialize="modal"
      [materializeParams]="materializeParams"
      [materializeActions]="materializeActions"
    >
      <div class="modal-content">
        <p>{{message}}</p>
      </div>
      <div class="modal-footer">
        <button class="{{btnClassAttrOk}}" (click)="onOkClicked()">{{btnLabelOk}}</button>
        <button class="{{btnClassAttrCancel}}" (click)="onCancelClicked()">{{btnLabelCancel}}</button>
      </div>
    </div>
  `
})
export class OkCancelDialogComponent {

  @Input()
  public message = '';

  @Input()
  public classAttr = '';

  @Input()
  public btnClassAttrOk = 'modal-action modal-close waves-effect btn-flat';

  @Input()
  public btnClassAttrCancel = 'modal-action modal-close waves-effect btn-flat';

  @Input()
  public btnLabelOk = 'OK';

  @Input()
  public btnLabelCancel = 'Cancel';

  @Input()
  public materializeParams = [{dismissible: true}];

  @Input()
  public materializeActions: EventEmitter<string | MaterializeAction>;

  @Output()
  public onOk = new EventEmitter();

  @Output()
  public onCancel = new EventEmitter();

  public onOkClicked() {
    this.onOk.emit(this.materializeActions);
  }

  public onCancelClicked() {
    this.onCancel.emit(this.materializeActions);
  }

}
