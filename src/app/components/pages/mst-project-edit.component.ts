import {
  Component,
  OnInit,
  AfterViewChecked,
  EventEmitter
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import { ProjectService }    from '../../services/project.service';
import { Project }           from '../../models/project';
import { Consts }            from '../../consts/consts';
import { MaterializeAction } from 'angular2-materialize';
import '../../modules/rxjs-extensions';

@Component({
  moduleId: module.id,
  selector: 'mst-project-edit',
  templateUrl: '../../../templates/pages/mst-project-edit.component.html'
})
export class MstProjectEditComponent implements OnInit, AfterViewChecked {
  public get Consts() { return Consts; }

  public isNew = true;

  public project: Project;

  /** EventEmitter for materialize dialog. */
  public confirmSaveModalActions   = new EventEmitter<string|MaterializeAction>();
  public confirmDeleteModalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    const routeParams = this.route.params['value'];
    this.isNew = !routeParams.id;

    if (this.isNew) {
      this.project = Project.create();
      return;
    }

    this.route.params.switchMap((params: Params) => {
      return this.projectService.getProject(params['id']);
    }).subscribe(project => {
      if (!project.id) {
        Materialize.toast(Consts.Msgs.noData, Consts.Nums.toastNormal);
        return this.goBack();
      }
      this.project = project;
    });
  }

  public ngAfterViewChecked() {
    if (this.isNew) { return; }
    Materialize.updateTextFields();
  }

  public confirmSave(emitter: EventEmitter<string|MaterializeAction>) {
    if (!this.project.name) { Materialize.toast(Consts.Msgs.promptInput(Consts.Labels.projectName), Consts.Nums.toastNormal); return; }

    this.openModal(emitter);
  }

  public save() {
    this.projectService.save(this.project).then(() => {
      Materialize.toast(Consts.Msgs.saved, Consts.Nums.toastNormal);
      this.goBack();
    });
  }

  public delete() {
    this.projectService.delete(this.project).then(() => {
      Materialize.toast(Consts.Msgs.deleted, Consts.Nums.toastNormal);
      this.goBack();
    });
  }

  public goBack(): void {
    this.router.navigate([Consts.Paths.mstProject]);
  }

  private openModal(emitter: EventEmitter<string|MaterializeAction>) {
    emitter.emit({ action: 'modal', params: ['open'] });
  }

}
