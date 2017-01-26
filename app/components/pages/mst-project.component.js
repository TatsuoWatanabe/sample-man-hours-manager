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
var router_1 = require("@angular/router");
var project_service_1 = require("../../services/project.service");
var consts_1 = require("../../consts/consts");
var MstProjectComponent = (function () {
    function MstProjectComponent(router, projectService) {
        this.router = router;
        this.projectService = projectService;
    }
    Object.defineProperty(MstProjectComponent.prototype, "Consts", {
        get: function () { return consts_1.Consts; },
        enumerable: true,
        configurable: true
    });
    MstProjectComponent.prototype.ngOnInit = function () {
        this.loadProjects();
    };
    MstProjectComponent.prototype.gotoEdit = function (project) {
        this.router.navigate([consts_1.Consts.Paths.mstProject + "/" + consts_1.Consts.Paths.edit, project.id]);
    };
    MstProjectComponent.prototype.loadProjects = function () {
        var _this = this;
        this.projectService.getProjects().then(function (projects) {
            _this.projects = projects;
        });
    };
    return MstProjectComponent;
}());
MstProjectComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mst-project',
        templateUrl: '../../../templates/pages/mst-project.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        project_service_1.ProjectService])
], MstProjectComponent);
exports.MstProjectComponent = MstProjectComponent;
//# sourceMappingURL=mst-project.component.js.map