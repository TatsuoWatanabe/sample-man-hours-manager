"use strict";
var man_hours_service_1 = require("../../services/man-hours.service");
var man_hours_local_strage_service_1 = require("../../services/man-hours-local-strage.service");
var project_service_1 = require("../../services/project.service");
var project_local_strage_service_1 = require("../../services/project-local-strage.service");
exports.providerDeclarations = [
    man_hours_service_1.ManHoursService,
    man_hours_local_strage_service_1.ManHoursLocalStrageService,
    project_service_1.ProjectService,
    project_local_strage_service_1.ProjectLocalStrageService
];
//# sourceMappingURL=provider.declarations.js.map