"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var project_local_strage_service_1 = require("./project-local-strage.service");
var ProjectService = (function () {
    function ProjectService(impl) {
        this.impl = impl;
    }
    ProjectService.prototype.getProject = function (id) {
        return this.impl.getProject(id);
    };
    ProjectService.prototype.getProjects = function () {
        return this.impl.getProjects();
    };
    ProjectService.prototype.save = function (project) {
        return this.impl.save(project);
    };
    ProjectService.prototype.delete = function (project) {
        return this.impl.delete(project);
    };
    return ProjectService;
}());
ProjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [project_local_strage_service_1.ProjectLocalStrageService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map