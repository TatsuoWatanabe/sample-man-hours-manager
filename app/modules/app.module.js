"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var app_component_1 = require("../components/app.component");
var page_declarations_1 = require("./declarations/page.declarations");
var element_declarations_1 = require("./declarations/element.declarations");
var provider_declarations_1 = require("./declarations/provider.declarations");
var app_routing_module_1 = require("./app-routing.module");
var angular2_materialize_1 = require("angular2-materialize");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var hours_format_pipe_1 = require("../pipes/hours-format.pipe");
require("./rxjs-extensions");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            ngx_datatable_1.NgxDatatableModule,
            angular_2_local_storage_1.LocalStorageModule.withConfig({
                prefix: 'man-hour-manager',
                storageType: 'localStorage'
            })
        ],
        declarations: [
            app_component_1.AppComponent
        ].concat(page_declarations_1.pageDeclarations, element_declarations_1.elementDeclarations, [
            angular2_materialize_1.MaterializeDirective,
            hours_format_pipe_1.HoursFormatPipe
        ]),
        bootstrap: [app_component_1.AppComponent],
        providers: provider_declarations_1.providerDeclarations.slice()
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map