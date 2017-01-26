"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var paths_1 = require("../consts/paths");
var mst_project_component_1 = require("../components/pages/mst-project.component");
var mst_project_edit_component_1 = require("../components/pages/mst-project-edit.component");
var input_hours_component_1 = require("../components/pages/input-hours.component");
var routes = [
    { path: paths_1.Paths.mstProject, children: [
            { path: '', component: mst_project_component_1.MstProjectComponent },
            { path: paths_1.Paths.edit + "/:id", component: mst_project_edit_component_1.MstProjectEditComponent },
            { path: paths_1.Paths.edit, component: mst_project_edit_component_1.MstProjectEditComponent },
        ] },
    { path: paths_1.Paths.inputHours, component: input_hours_component_1.InputHoursComponent },
    { path: '', redirectTo: paths_1.Paths.inputHours, pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map