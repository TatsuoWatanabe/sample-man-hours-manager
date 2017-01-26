import {
  Component
} from '@angular/core';
import { Consts } from '../consts/consts';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: '../../templates/app.component.html'
})
export class AppComponent {
  public get Consts() { return Consts; }

  constructor(
  ) {}

}
