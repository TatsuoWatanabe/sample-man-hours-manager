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
var project_1 = require("../../models/project");
var consts_1 = require("../../consts/consts");
require("../../modules/rxjs-extensions");
var MstProjectEditComponent = (function () {
    function MstProjectEditComponent(projectService, route, router) {
        this.projectService = projectService;
        this.route = route;
        this.router = router;
        this.isNew = true;
        /** EventEmitter for materialize dialog. */
        this.confirmSaveModalActions = new core_1.EventEmitter();
        this.confirmDeleteModalActions = new core_1.EventEmitter();
    }
    Object.defineProperty(MstProjectEditComponent.prototype, "Consts", {
        get: function () { return consts_1.Consts; },
        enumerable: true,
        configurable: true
    });
    MstProjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var routeParams = this.route.params['value'];
        this.isNew = !routeParams.id;
        if (this.isNew) {
            this.project = project_1.Project.create();
            return;
        }
        this.route.params.switchMap(function (params) {
            return _this.projectService.getProject(params['id']);
        }).subscribe(function (project) {
            if (!project.id) {
                Materialize.toast(consts_1.Consts.Msgs.noData, consts_1.Consts.Nums.toastNormal);
                return _this.goBack();
            }
            _this.project = project;
        });
    };
    MstProjectEditComponent.prototype.ngAfterViewChecked = function () {
        if (this.isNew) {
            return;
        }
        Materialize.updateTextFields();
    };
    MstProjectEditComponent.prototype.confirmSave = function (emitter) {
        if (!this.project.name) {
            Materialize.toast(consts_1.Consts.Msgs.promptInput(consts_1.Consts.Labels.projectName), consts_1.Consts.Nums.toastNormal);
            return;
        }
        this.openModal(emitter);
    };
    MstProjectEditComponent.prototype.save = function () {
        var _this = this;
        this.projectService.save(this.project).then(function () {
            Materialize.toast(consts_1.Consts.Msgs.saved, consts_1.Consts.Nums.toastNormal);
            _this.goBack();
        });
    };
    MstProjectEditComponent.prototype.delete = function () {
        var _this = this;
        this.projectService.delete(this.project).then(function () {
            Materialize.toast(consts_1.Consts.Msgs.deleted, consts_1.Consts.Nums.toastNormal);
            _this.goBack();
        });
    };
    MstProjectEditComponent.prototype.goBack = function () {
        this.router.navigate([consts_1.Consts.Paths.mstProject]);
    };
    MstProjectEditComponent.prototype.openModal = function (emitter) {
        emitter.emit({ action: 'modal', params: ['open'] });
    };
    return MstProjectEditComponent;
}());
MstProjectEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mst-project-edit',
        templateUrl: '../../../templates/pages/mst-project-edit.component.html'
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        router_1.ActivatedRoute,
        router_1.Router])
], MstProjectEditComponent);
exports.MstProjectEditComponent = MstProjectEditComponent;
//# sourceMappingURL=mst-project-edit.component.js.map