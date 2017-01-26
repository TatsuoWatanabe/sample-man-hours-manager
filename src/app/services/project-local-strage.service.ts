import { Injectable }                 from '@angular/core';
import { LocalStorageService }        from 'angular-2-local-storage';
import { Project }                    from '../models/project';
import { ManHoursLocalStrageService } from './man-hours-local-strage.service';

@Injectable()
export class ProjectLocalStrageService {
  private localStrorageKey = 'project';

  constructor(
    private localStorageService: LocalStorageService,
    private manHoursLocalStrageService: ManHoursLocalStrageService
  ) {}

  public getProject(id: string): Promise<Project> {
    const data = this.localStorageService.get(this.localStrorageKey) || {};
    const found = data[id] || {};
    const project = Project.fromObject(found);
    return new Promise<Project>(resolve => {
      resolve(project);
    });
  }

  public getProjects(): Promise<Project[]> {
    const data = this.localStorageService.get(this.localStrorageKey) || {};
    const projects: Project[] = Object.keys(data).map(key => {
      return Project.fromObject(data[key]);
    });

    return new Promise<Project[]>(resolve => {
      resolve(projects);
    });
  }

  public save(project: Project) {
    const data = this.localStorageService.get(this.localStrorageKey) || {};
    const isNew = !project.id;
    if (isNew) {
      project.id = this.getNewId(data);
    }
    data[project.id] = project;
    this.localStorageService.set(this.localStrorageKey, data);

    return new Promise<Project>(resolve => {
      resolve(project);
    });
  }

  public delete(project: Project) {
    const data = this.localStorageService.get(this.localStrorageKey) || {};

    // delete relationalData.
    this.manHoursLocalStrageService.deleteByProjectId(project.id);

    delete data[project.id];
    this.localStorageService.set(this.localStrorageKey, data);

    return new Promise<Project>(resolve => {
      resolve(project);
    });
  }

  private getNewId(data: Object) {
    let dataCount = Object.keys(data).length;
    let newId = dataCount + 1;
    let valid = false;
    while (!valid) {
      const isExists = !!data[newId];
      if (isExists) {
        newId += 1;
      } else {
        valid = true;
      }
    }
    return String(newId);
  }
}
