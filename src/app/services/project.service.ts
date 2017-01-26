import { Injectable }                from '@angular/core';
import { Project }                   from '../models/project';
import { ProjectLocalStrageService } from './project-local-strage.service';

@Injectable()
export class ProjectService {

  constructor(
    private impl: ProjectLocalStrageService
  ) { }

  public getProject(id: string): Promise<Project> {
    return this.impl.getProject(id);
  }

  public getProjects(): Promise<Project[]> {
    return this.impl.getProjects();
  }

  public save(project: Project) {
    return this.impl.save(project);
  }

  public delete(project: Project) {
    return this.impl.delete(project);
  }

}
