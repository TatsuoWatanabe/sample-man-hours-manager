import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { Paths }                   from '../consts/paths';
import { MstProjectComponent }     from '../components/pages/mst-project.component';
import { MstProjectEditComponent } from '../components/pages/mst-project-edit.component';
import { InputHoursComponent }     from '../components/pages/input-hours.component';

const routes: Routes = [
  { path: Paths.mstProject, children: [
    { path: ''                 , component: MstProjectComponent },
    { path: `${Paths.edit}/:id`, component: MstProjectEditComponent },
    { path: Paths.edit         , component: MstProjectEditComponent },
  ]},
  { path: Paths.inputHours, component: InputHoursComponent },
  { path: '', redirectTo: Paths.inputHours, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
