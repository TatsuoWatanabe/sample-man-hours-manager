import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Project }           from '../../models/project';
import { ProjectService }    from '../../services/project.service';
import { Consts }            from '../../consts/consts';

@Component({
  moduleId: module.id,
  selector: 'mst-project',
  templateUrl: '../../../templates/pages/mst-project.component.html'
})
export class MstProjectComponent implements OnInit {
  public get Consts() { return Consts; }
  public projects: Project[];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  public ngOnInit() {
    this.loadProjects();
  }

  public gotoEdit(project: Project) {
    this.router.navigate([`${Consts.Paths.mstProject}/${Consts.Paths.edit}`, project.id]);
  }

  private loadProjects() {
    this.projectService.getProjects().then(projects => {
      this.projects = projects;
    });
  }

}
