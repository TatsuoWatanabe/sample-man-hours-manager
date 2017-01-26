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
var angular_2_local_storage_1 = require("angular-2-local-storage");
var project_1 = require("../models/project");
var man_hours_local_strage_service_1 = require("./man-hours-local-strage.service");
var ProjectLocalStrageService = (function () {
    function ProjectLocalStrageService(localStorageService, manHoursLocalStrageService) {
        this.localStorageService = localStorageService;
        this.manHoursLocalStrageService = manHoursLocalStrageService;
        this.localStrorageKey = 'project';
    }
    ProjectLocalStrageService.prototype.getProject = function (id) {
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        var found = data[id] || {};
        var project = project_1.Project.fromObject(found);
        return new Promise(function (resolve) {
            resolve(project);
        });
    };
    ProjectLocalStrageService.prototype.getProjects = function () {
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        var projects = Object.keys(data).map(function (key) {
            return project_1.Project.fromObject(data[key]);
        });
        return new Promise(function (resolve) {
            resolve(projects);
        });
    };
    ProjectLocalStrageService.prototype.save = function (project) {
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        var isNew = !project.id;
        if (isNew) {
            project.id = this.getNewId(data);
        }
        data[project.id] = project;
        this.localStorageService.set(this.localStrorageKey, data);
        return new Promise(function (resolve) {
            resolve(project);
        });
    };
    ProjectLocalStrageService.prototype.delete = function (project) {
        var data = this.localStorageService.get(this.localStrorageKey) || {};
        // delete relationalData.
        this.manHoursLocalStrageService.deleteByProjectId(project.id);
        delete data[project.id];
        this.localStorageService.set(this.localStrorageKey, data);
        return new Promise(function (resolve) {
            resolve(project);
        });
    };
    ProjectLocalStrageService.prototype.getNewId = function (data) {
        var dataCount = Object.keys(data).length;
        var newId = dataCount + 1;
        var valid = false;
        while (!valid) {
            var isExists = !!data[newId];
            if (isExists) {
                newId += 1;
            }
            else {
                valid = true;
            }
        }
        return String(newId);
    };
    return ProjectLocalStrageService;
}());
ProjectLocalStrageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular_2_local_storage_1.LocalStorageService,
        man_hours_local_strage_service_1.ManHoursLocalStrageService])
], ProjectLocalStrageService);
exports.ProjectLocalStrageService = ProjectLocalStrageService;
//# sourceMappingURL=project-local-strage.service.js.map