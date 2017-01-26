import { ManHoursService }            from '../../services/man-hours.service';
import { ManHoursLocalStrageService } from '../../services/man-hours-local-strage.service';
import { ProjectService }             from '../../services/project.service';
import { ProjectLocalStrageService }  from '../../services/project-local-strage.service';

export const providerDeclarations = [
  ManHoursService,
  ManHoursLocalStrageService,
  ProjectService,
  ProjectLocalStrageService
];
